import {
  Directive,
  ElementRef,
  OnInit,
  Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as scannerActions from '@state/scanner.actions';

declare const Module: any;

@Directive({
  selector: '[appCameraDecoder]'
})
export class CameraDecoderDirective implements OnInit {
  private api: any;
  private domCanvas!: HTMLCanvasElement;
  private domVideo!: HTMLVideoElement;
  private mediaConstraints: any;
  private mediaAvailableDevices: any;
  private currentMediaDevice: any;
  private currentMediaStream: any;
  private currentMediaTrack: any;
  private currentCanvasContext: any;
  private currentDecodeStatus: boolean;
  private loopDecoder: any;

  constructor(
    private element: ElementRef<HTMLElement>,
    private store: Store
  ) {
    this.mediaConstraints = {
      width: 320,
      height: 320
    };
    this.mediaAvailableDevices = [];
    this.currentDecodeStatus = false;
  }

  ngOnInit(): void {
    Module.onRuntimeInitialized = async () => {
      this.api = {
        scan_image: Module.cwrap('scan_image', '', ['number', 'number', 'number']),
        create_buffer: Module.cwrap('create_buffer', 'number', ['number', 'number']),
        destroy_buffer: Module.cwrap('destroy_buffer', '', ['number'])
      };

      // set the function that should be called whenever a barcode is detected
      Module['processResult'] = (symbol: string, data: string, polygon: any) => {
        if (data !== '0') {
          this.stopDecoder();
          this.store.dispatch(scannerActions.dataDetected({ data: { symbol, data } }));
        }
      }

      if (this.getDeviceSupported()) {
        this.createMedia();
      } else {
        this.setMessage('No Camera Supported!');
      }
    };
  }

  private getDeviceSupported(): boolean {
    if (typeof navigator.mediaDevices === 'undefined' ||
        typeof navigator.mediaDevices.enumerateDevices === 'undefined' ||
        typeof navigator.mediaDevices.getUserMedia === 'undefined') {
        return false;
    }

    navigator.mediaDevices.enumerateDevices()
      .then(async (detectedDevices) => {
        for (var device of detectedDevices) {
          if (device.kind === 'videoinput') {
            this.mediaAvailableDevices.push(device)
          }
        }

        const selectedDevice = window.localStorage.getItem('selected_device');

        if (selectedDevice !== null) {
          this.changeDevice(selectedDevice);
        } else {
          this.startStream();
        }
      })

    return true;
  }

  private createMedia(): void {
    this.domCanvas = document.createElement('canvas');
    this.domVideo = document.createElement('video');

    this.domCanvas.setAttribute('width', `${this.mediaConstraints.width}`);
    this.domCanvas.setAttribute('height', `${this.mediaConstraints.height}`);
    this.domVideo.setAttribute('autoplay', 'true');
    this.element.nativeElement.appendChild(this.domVideo);
  }

  private startStream(): void {
    if (this.currentMediaStream) {
      this.stopCurrentStream();
    }

    const initConstraints = {
      video: {
        deviceId: this.currentMediaDevice ? this.currentMediaDevice.deviceId : null,
        width: this.mediaConstraints.width,
        height: this.mediaConstraints.height
      }
    };

    navigator.mediaDevices.getUserMedia(initConstraints)
      .then(mediaStream => {
        this.domVideo.srcObject = mediaStream;
        this.currentMediaStream = mediaStream;
        this.currentMediaTrack = mediaStream.getVideoTracks()[0]

        this.currentMediaTrack.applyConstraints(initConstraints);
        this.startDecoder();
      })
      .catch(err => {
        this.setMessage('Please Allow Camera Permission!');
      });
  }

  private stopCurrentStream(): void {
    if (!this.currentMediaDevice) {
      return;
    }

    this.currentMediaStream.getTracks()
      .forEach(function (track: any) {
        track.stop();
      });
  }

  private setMessage(message: string): void {
    const domMessage = document.createElement('p');

    domMessage.setAttribute('style', `
      position: absoulte;
      top: 0; right: 0; bottom: 0; left: 0;
      margin: auto; font-size: 1rem; color: #FF0000;
      text-align: center;
    `);

    domMessage.innerHTML = message;

    this.element.nativeElement.appendChild(domMessage);
  }

  private startDecoder(): void {
    this.loopDecoder = window.setInterval(() => {
      this.detectBarcodeFromStream();
    }, 250);
  }

  private stopDecoder(): void {
    window.clearInterval(this.loopDecoder);
  }

  private detectBarcodeFromStream(): void {
    if (this.currentDecodeStatus) {
      return;
    } else {
      this.currentDecodeStatus = true;
    }

    if (!this.currentCanvasContext) {
      this.currentCanvasContext = this.domCanvas.getContext('2d')
    }

    this.currentCanvasContext
      .drawImage(this.domVideo, 0, 0, this.mediaConstraints.width, this.mediaConstraints.height);

    const barcodeImage = this.currentCanvasContext.getImageData(0, 0, this.mediaConstraints.width, this.mediaConstraints.height);

    // convert the image data to grayscale
    const grayData = [];

    for (var i = 0, j = 0; i < barcodeImage.data.length; i += 4, j++) {
      grayData[j] = (barcodeImage.data[i] * 66 + barcodeImage.data[i + 1] * 129 + barcodeImage.data[i + 2] * 25 + 4096) >> 8;
    }

    // put the data into the allocated buffer on the wasm heap.
    const p = this.api.create_buffer(barcodeImage.width, barcodeImage.height);

    Module.HEAP8.set(grayData, p);

    // call the scanner function
    this.api.scan_image(p, barcodeImage.width, barcodeImage.height)

    // clean up
    // (this is not really necessary in this example as we could reuse the buffer, but is used to demonstrate how you can manage Wasm heap memory from the js environment)
    this.api.destroy_buffer(p);

    this.currentDecodeStatus = false;
  }

  private changeDevice(indexDevice: string): void {
    if (typeof this.mediaAvailableDevices[indexDevice] !== 'undefined') {
      this.currentMediaDevice = this.mediaAvailableDevices[indexDevice];

      this.startStream();
    }
  }
}

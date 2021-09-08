import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  async getVideoDevices(): Promise<any> {
    if (typeof navigator.mediaDevices === 'undefined' ||
        typeof navigator.mediaDevices.enumerateDevices === 'undefined' ||
        typeof navigator.mediaDevices.getUserMedia === 'undefined') {
        return false;
    }

    const availableDevices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices: any[] = [];

    for (var device of availableDevices) {
      if (device.kind === 'videoinput') {
        videoDevices.push(device)
      }
    }

    return videoDevices;
  }
}

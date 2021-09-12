import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit
} from '@angular/core';

declare const bwipjs: any;

@Directive({
  selector: '[appBarcodeGenerator]'
})
export class BarcodeGeneratorDirective implements AfterViewInit {
  @Input() symbol!: string;
  @Input() data!: string;

  constructor(
    private element: ElementRef
  ) { }

  ngAfterViewInit(): void {
    const domCanvas = document.createElement('canvas');

    try {
      bwipjs.toCanvas(domCanvas, {
        bcid: this.getBarcodeType(this.symbol),
        text: this.data,
        scale: 3,
        height: 10
      });

      this.element.nativeElement.src = domCanvas.toDataURL('image/png');
    } catch (err: any) {
      console.error(err.message)
    }
  }

  private getBarcodeType(type: string) {
    if (type == 'EAN-13') {
      return 'ean13';
    } else if (type == 'CODE-128') {
      return 'code128';
    } else {
      return 'qrcode';
    }
  }
}

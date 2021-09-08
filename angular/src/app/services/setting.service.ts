import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor() { }

  setCurrentDevice(index: string) {
    window.localStorage.setItem('device', index);
  }

  getCurrentDevice() {
    return window.localStorage.getItem('device');
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'environments/environment';

import * as exceptionReducer from '@state/exception.reducer';
import * as scannerReducer from '@state/scanner.reducer';
import { ScannerEffects } from '@state/scanner.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenusComponent } from './components/menus/menus.component';
import { ScanComponent } from './components/scan/scan.component';
import { CameraDecoderDirective } from './directives/camera-decoder.directive';

declare const ENV: any;

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    MenusComponent,
    ScanComponent,
    CameraDecoderDirective
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      loading: exceptionReducer.reducer,
      scanner: scannerReducer.reducer
    }),
    EffectsModule.forRoot([
      ScannerEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: ENV.pageUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

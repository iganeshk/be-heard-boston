import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  __IMPORTS,
  __DECLARATIONS,
  __PROVIDERS,
} from './components.barrel';

@NgModule({
  declarations: [AppComponent, __DECLARATIONS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    __IMPORTS
  ],
  providers: [__PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }

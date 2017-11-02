import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SelectModule } from './ng-select/ng-select.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

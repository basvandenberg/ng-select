import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {SelectModule} from 'ng-select';

import {appRoutes} from './app.router';
import {AppComponent} from './app.component';

import {Basic} from './components/examples/basic.component';
import {LoadOptions} from './components/examples/load-options.component';

import {OptionService} from './services/option.service';

@NgModule({
    declarations: [
        AppComponent,
        Basic,
        LoadOptions
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        SelectModule
    ],
    providers: [
        OptionService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

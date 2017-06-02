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
import {ReactiveForm} from './components/examples/reactive-form.component';
import {Focus} from './components/examples/focus.component';
import {LoadOptions} from './components/examples/load-options.component';
import {LoadOptionsAsyncPipe} from './components/examples/load-options-async-pipe.component';

import {OptionService} from './services/option.service';

@NgModule({
    declarations: [
        AppComponent,
        Basic,
        ReactiveForm,
        Focus,
        LoadOptions,
        LoadOptionsAsyncPipe
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

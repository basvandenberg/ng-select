import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import 'hammerjs';

import {SelectModule} from 'ng-select';
import {appRoutes} from './app.router';
import {AppComponent} from './app.component';

import {Footer} from './components/footer.component';

import {Home} from './components/home.component';
import {GettingStarted} from './components/getting-started.component';
import {Documentation} from './components/documentation.component';

import {Basic} from './components/examples/basic.component';
import {ReactiveForm} from './components/examples/reactive-form.component';
import {TemplateDrivenForm} from './components/examples/template-driven-form.component';
import {NoFilter} from './components/examples/no-filter.component';
import {CloseOnSelect} from './components/examples/close-on-select.component';
import {Focus} from './components/examples/focus.component';
import {LoadOptions} from './components/examples/load-options.component';
import {LoadOptionsAsyncPipe} from './components/examples/load-options-async-pipe.component';
import {DisabledOptions} from './components/examples/disabled-options.component';
import {OptionTemplate} from './components/examples/option-template.component';
import {Placeholder} from './components/examples/placeholder.component';

import {OptionService} from './services/option.service';

@NgModule({
    declarations: [
        AppComponent,

        Footer,

        Home,
        GettingStarted,
        Documentation,

        Basic,
        ReactiveForm,
        TemplateDrivenForm,
        NoFilter,
        CloseOnSelect,
        Focus,
        LoadOptions,
        LoadOptionsAsyncPipe,
        DisabledOptions,
        OptionTemplate,
        Placeholder
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
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

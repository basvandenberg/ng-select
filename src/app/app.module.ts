import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule
} from '@angular/material';
import {RouterModule} from '@angular/router';

import 'hammerjs';

import {SelectModule} from 'ng-select';
import {appRoutes} from './app.router';
import {AppComponent} from './app.component';

import {Footer} from './components/footer.component';

import {Home} from './components/home.component';
import {GettingStarted} from './components/getting-started.component';
import {Documentation} from './components/documentation.component';
import {Faq} from './components/faq.component';

import {Intro} from './components/examples/intro.component';
import {NgModel} from './components/examples/ng-model.component';
import {LoadOptions} from './components/examples/load-options.component';
import {ReactiveForm} from './components/examples/reactive-form.component';
import {FormValidation} from './components/examples/form-validation.component';
import {AllowClear} from './components/examples/allow-clear.component';
import {Disabled} from './components/examples/disabled.component';
import {DisabledOptions} from './components/examples/disabled-options.component';
import {NoFilter} from './components/examples/no-filter.component';
import {Placeholder} from './components/examples/placeholder.component';
import {FilterPlaceholder} from './components/examples/filter-placeholder.component';
import {NotFoundMsg} from './components/examples/not-found-msg.component';
import {OptionTemplate} from './components/examples/option-template.component';
import {HighlightColor} from './components/examples/highlight-color.component';
import {Label} from './components/examples/label.component';
import {Focus} from './components/examples/focus.component';
import {Opened} from './components/examples/opened.component';
import {Selected} from './components/examples/selected.component';
import {FilterInputChanged} from './components/examples/filter-input-changed.component';
import {NoOptionsFound} from './components/examples/no-options-found.component';
import {SelectMethod} from './components/examples/select-method.component';
import {ClearMethod} from './components/examples/clear-method.component';

import {OptionService} from './services/option.service';

@NgModule({
    declarations: [
        AppComponent,

        Footer,

        Home,
        GettingStarted,
        Documentation,
        Faq,

        Intro,
        NgModel,
        LoadOptions,
        ReactiveForm,
        FormValidation,
        AllowClear,
        Disabled,
        DisabledOptions,
        NoFilter,
        Placeholder,
        FilterPlaceholder,
        NotFoundMsg,
        OptionTemplate,
        HighlightColor,
        Label,
        Focus,
        Opened,
        Selected,
        FilterInputChanged,
        NoOptionsFound,
        SelectMethod,
        ClearMethod
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatSidenavModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatIconModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, {useHash: true}),
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

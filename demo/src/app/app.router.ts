import {Routes} from '@angular/router';

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


export const appRoutes: Routes = [{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
}, {
    path: 'home',
    component: Home
}, {
    path: 'getting-started',
    component: GettingStarted
}, {
    path: 'documentation',
    component: Documentation
}, {
    path: 'faq',
    component: Faq
}, {
    path: 'examples',
    redirectTo: '/examples/intro',
    pathMatch: 'full'
}, {
    path: 'examples/intro',
    component: Intro
}, {
    path: 'examples/ng-model',
    component: NgModel
}, {
    path: 'examples/load-options',
    component: LoadOptions
}, {
    path: 'examples/reactive-form',
    component: ReactiveForm
}, {
    path: 'examples/form-validation',
    component: FormValidation
}, {
    path: 'examples/allow-clear',
    component: AllowClear
}, {
    path: 'examples/disabled',
    component: Disabled
}, {
    path: 'examples/disabled-options',
    component: DisabledOptions
}, {
    path: 'examples/no-filter',
    component: NoFilter
}, {
    path: 'examples/placeholder',
    component: Placeholder
}, {
    path: 'examples/filter-placeholder',
    component: FilterPlaceholder
}, {
    path: 'examples/not-found-msg',
    component: NotFoundMsg
}, {
    path: 'examples/option-template',
    component: OptionTemplate
}, {
    path: 'examples/highlight-color',
    component: HighlightColor
}, {
    path: 'examples/label',
    component: Label
}, {
    path: 'examples/focus',
    component: Focus
}, {
    path: 'examples/opened',
    component: Opened
}, {
    path: 'examples/selected',
    component: Selected
}, {
    path: 'examples/filter-input-changed',
    component: FilterInputChanged
}, {
    path: 'examples/no-options-found',
    component: NoOptionsFound
}, {
    path: 'examples/select-method',
    component: SelectMethod
}, {
    path: 'examples/clear-method',
    component: ClearMethod
}, {
    path: '**',
    redirectTo: '/home'
}];

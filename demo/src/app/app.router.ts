import {Routes} from '@angular/router';

import {Home} from './components/home.component';
import {GettingStarted} from './components/getting-started.component';

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
    component: Basic
}, {
    path: 'examples/reactive-form',
    component: ReactiveForm
}, {
    path: 'examples/template-driven-form',
    component: TemplateDrivenForm
}, {
    path: 'examples/no-filter',
    component: NoFilter
}, {
    path: 'examples/close-on-select',
    component: CloseOnSelect
}, {
    path: 'examples/disabled-options',
    component: DisabledOptions
}, {
    path: 'examples/placeholder',
    component: Placeholder
}, {
    path: 'examples/option-template',
    component: OptionTemplate
}, {
    path: 'examples/focus',
    component: Focus
}, {
    path: 'examples/load-options',
    component: LoadOptions
},{
    path: 'examples/load-options-async-pipe',
    component: LoadOptionsAsyncPipe
}];

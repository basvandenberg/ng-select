import {Routes} from '@angular/router';

import {Basic} from './components/examples/basic.component';
import {ReactiveForm} from './components/examples/reactive-form.component';
import {TemplateDrivenForm} from './components/examples/template-driven-form.component';
import {NoFilter} from './components/examples/no-filter.component';
import {Focus} from './components/examples/focus.component';
import {LoadOptions} from './components/examples/load-options.component';
import {LoadOptionsAsyncPipe} from './components/examples/load-options-async-pipe.component';
import {DisabledOptions} from './components/examples/disabled-options.component';

export const appRoutes: Routes = [{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
}, {
    path: 'home',
    component: Basic
}, {
    path: 'examples/getting-started',
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
    path: 'examples/disabled-options',
    component: DisabledOptions
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

import {Routes} from '@angular/router';

import {Basic} from './components/examples/basic.component';
import {Focus} from './components/examples/focus.component';
import {LoadOptions} from './components/examples/load-options.component';
import {LoadOptionsAsyncPipe} from './components/examples/load-options-async-pipe.component';

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
    path: 'examples/focus',
    component: Focus
}, {
    path: 'examples/load-options',
    component: LoadOptions
},{
    path: 'examples/load-options-async-pipe',
    component: LoadOptionsAsyncPipe
}];

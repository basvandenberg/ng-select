import { Routes } from '@angular/router';

import { Basic } from './components/examples/basic.component';

export const appRoutes: Routes = [{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
}, {
    path: 'home',
    component: Basic
}];

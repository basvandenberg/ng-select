import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SelectComponent} from './src/select.component';
import {SelectDropdownComponent} from './src/select-dropdown.component';

import {DiacriticsService} from './src/diacritics.service';

@NgModule({
    declarations: [
        SelectComponent,
        SelectDropdownComponent
    ],
    exports: [
        SelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        DiacriticsService
    ]
})
export class SelectModule {}

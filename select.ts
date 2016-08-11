import {NgModule} from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SelectComponent, SELECT_VALUE_ACCESSOR} from './src/select.component';
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
        FormsModule,
        NgStyle
    ],
    providers: [
        DiacriticsService,
        SELECT_VALUE_ACCESSOR
    ]
})
export class SelectModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SelectComponent} from './select.component';
import {SelectDropdownComponent} from './select-dropdown.component';
import {SelectOptionTemplate} from './select-option-template';
import {SelectionTemplate} from './selection-template';

@NgModule({
    declarations: [
        SelectComponent,
        SelectDropdownComponent,
        SelectOptionTemplate,
        SelectionTemplate
    ],
    exports: [
        SelectComponent,
        SelectOptionTemplate,
        SelectionTemplate
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class SelectModule {}

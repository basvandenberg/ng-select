"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var select_component_1 = require('./dist/select.component');
var select_dropdown_component_1 = require('./dist/select-dropdown.component');
__export(require('./dist/select.component'));
var SelectModule = (function () {
    function SelectModule() {
    }
    SelectModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        select_component_1.SelectComponent,
                        select_dropdown_component_1.SelectDropdownComponent
                    ],
                    exports: [
                        select_component_1.SelectComponent
                    ],
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule
                    ]
                },] },
    ];
    /** @nocollapse */
    SelectModule.ctorParameters = function () { return []; };
    return SelectModule;
}());
exports.SelectModule = SelectModule;

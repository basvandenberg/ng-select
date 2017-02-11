"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var select_component_1 = require("./select.component");
var select_dropdown_component_1 = require("./select-dropdown.component");
var SelectModule = (function () {
    function SelectModule() {
    }
    return SelectModule;
}());
SelectModule = __decorate([
    core_1.NgModule({
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
    })
], SelectModule);
exports.SelectModule = SelectModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var select_dropdown_component_css_1 = require("./select-dropdown.component.css");
var select_dropdown_component_html_1 = require("./select-dropdown.component.html");
var option_list_1 = require("./option-list");
var SelectDropdownComponent = (function () {
    function SelectDropdownComponent() {
        this.close = new core_1.EventEmitter();
        this.optionClicked = new core_1.EventEmitter();
        this.singleFilterClick = new core_1.EventEmitter();
        this.singleFilterInput = new core_1.EventEmitter();
        this.singleFilterKeydown = new core_1.EventEmitter();
        this.disabledColor = '#fff';
        this.disabledTextColor = '9e9e9e';
    }
    /** Event handlers. **/
    // Angular life cycle hooks.
    SelectDropdownComponent.prototype.ngOnInit = function () {
        this.optionsReset();
    };
    SelectDropdownComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    };
    SelectDropdownComponent.prototype.ngAfterViewInit = function () {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    };
    // Filter input (single select).
    SelectDropdownComponent.prototype.onSingleFilterClick = function (event) {
        this.singleFilterClick.emit(null);
    };
    SelectDropdownComponent.prototype.onSingleFilterInput = function (event) {
        this.singleFilterInput.emit(event.target.value);
    };
    SelectDropdownComponent.prototype.onSingleFilterKeydown = function (event) {
        this.singleFilterKeydown.emit(event);
    };
    // Options list.
    SelectDropdownComponent.prototype.onOptionsWheel = function (event) {
        this.handleOptionsWheel(event);
    };
    SelectDropdownComponent.prototype.onOptionMouseover = function (option) {
        this.optionList.highlightOption(option);
    };
    SelectDropdownComponent.prototype.onOptionClick = function (option) {
        this.optionClicked.emit(option);
    };
    /** Initialization. **/
    SelectDropdownComponent.prototype.optionsReset = function () {
        this.optionList.filter('');
        this.optionList.highlight();
    };
    /** View. **/
    SelectDropdownComponent.prototype.getOptionStyle = function (option) {
        if (option.highlighted) {
            var style = {};
            if (typeof this.highlightColor !== 'undefined') {
                style['background-color'] = this.highlightColor;
            }
            if (typeof this.highlightTextColor !== 'undefined') {
                style['color'] = this.highlightTextColor;
            }
            return style;
        }
        else {
            return {};
        }
    };
    SelectDropdownComponent.prototype.clearFilterInput = function () {
        if (this.filterEnabled) {
            this.filterInput.nativeElement.value = '';
        }
    };
    SelectDropdownComponent.prototype.moveHighlightedIntoView = function () {
        var list = this.optionsList.nativeElement;
        var listHeight = list.offsetHeight;
        var itemIndex = this.optionList.getHighlightedIndex();
        if (itemIndex > -1) {
            var item = list.children[0].children[itemIndex];
            var itemHeight = item.offsetHeight;
            var itemTop = itemIndex * itemHeight;
            var itemBottom = itemTop + itemHeight;
            var viewTop = list.scrollTop;
            var viewBottom = viewTop + listHeight;
            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    };
    SelectDropdownComponent.prototype.handleOptionsWheel = function (e) {
        var div = this.optionsList.nativeElement;
        var atTop = div.scrollTop === 0;
        var atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;
        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        }
        else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    };
    return SelectDropdownComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectDropdownComponent.prototype, "filterEnabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectDropdownComponent.prototype, "highlightColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectDropdownComponent.prototype, "highlightTextColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SelectDropdownComponent.prototype, "left", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SelectDropdownComponent.prototype, "multiple", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectDropdownComponent.prototype, "notFoundMsg", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", option_list_1.OptionList)
], SelectDropdownComponent.prototype, "optionList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SelectDropdownComponent.prototype, "top", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SelectDropdownComponent.prototype, "width", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "close", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "optionClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "singleFilterClick", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "singleFilterInput", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "singleFilterKeydown", void 0);
__decorate([
    core_1.ViewChild('filterInput'),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "filterInput", void 0);
__decorate([
    core_1.ViewChild('optionsList'),
    __metadata("design:type", Object)
], SelectDropdownComponent.prototype, "optionsList", void 0);
SelectDropdownComponent = __decorate([
    core_1.Component({
        selector: 'select-dropdown',
        template: select_dropdown_component_html_1.TEMPLATE,
        styles: [select_dropdown_component_css_1.STYLE],
        encapsulation: core_1.ViewEncapsulation.None
    })
], SelectDropdownComponent);
exports.SelectDropdownComponent = SelectDropdownComponent;

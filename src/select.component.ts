import {Component, Input, OnInit, Provider, ViewChild, forwardRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {DEFAULT_STYLES} from './style';
import {SelectDropdownComponent} from './select-dropdown.component';

const SELECT_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => SelectComponent),
    multi: true
});

@Component({
    selector: 'ng-select',
    template: `
<div style="width:100%;position:relative;">
    <span style="width:100%"
        #container
        [ngClass]="getContainerClass()"
        (window:resize)="onWindowResize()"
        (window:click)="onWindowClick()">
        <span class="selection">
            <span tabindex=0
                #selectionSpan
                [ngClass]="getSelectionClass()"
                (click)="onSelectionClick($event)"
                (keydown)="onKeydown($event)">

                <span class="select2-selection__rendered"
                    *ngIf="isSingle && showPlaceholder()">
                    <span class="select2-selection__placeholder">
                        {{placeholder}}
                    </span>
                </span>
                
                <span class="select2-selection__rendered"
                    *ngIf="isSingle && selection.length > 0">
                    <span class="select2-selection__clear"
                        *ngIf="allowClear"
                        (click)="onClearClick($event)">
                        x
                    </span>
                    {{selection[0].label}}
                </span>

                <ul class="select2-selection__rendered"
                    *ngIf="!isSingle">
                    <li class="select2-selection__choice" title="{{option.label}}"
                        *ngFor="let option of selection">
                        <span class="select2-selection__choice__remove">×</span>
                        {{option.label}}
                    </li>
                    <li class="select2-search select2-search--inline">
                        <input class="select2-search__field" />
                    </li>
                </ul>

                <span class="select2-selection__arrow">
                    <b></b>
                </span>
            </span>
        </span>
    </span>
    <select-dropdown
        *ngIf="isOpen"
        #dropdown
        [isSingle]="isSingle"
        [optionValues]="optionValues"
        [optionsDict]="optionsDict"
        [selection]="selection"
        [width]="width"
        [top]="top"
        [left]="left"
        (toggleSelect)="onToggleSelect($event)"
        (close)="onClose($event)">
    </select-dropdown>
</div>
`,
    styles: [
        DEFAULT_STYLES
    ],
    directives: [
        CORE_DIRECTIVES,
        SelectDropdownComponent
    ],
    providers: [
        SELECT_VALUE_ACCESSOR
    ]
})

export class SelectComponent implements ControlValueAccessor, OnInit {

    // Class names.
    private S2: string = 'select2';
    private S2_CONTAINER: string = this.S2 + '-container';
    private S2_SELECTION: string = this.S2 + '-selection';

    // Input settings.
    @Input() options: Array<any>;
    @Input() theme: string;
    @Input() isSingle: boolean;
    @Input() placeholder: string;
    @Input() allowClear: boolean;

    @ViewChild('container') container;
    @ViewChild('selectionSpan') selectionSpan;

    // Dropdown component.
    private dropdown;

    // State variables.
    private isDisabled: boolean = false;
    private isBelow: boolean = true;
    private isOpen: boolean = false;
    private hasFocus: boolean = false;

    private width: number;
    private top: number;
    private left: number;

    // Select options.
    private optionValues: Array<string> = [];
    private optionsDict: any = {};

    private selection: Array<any> = [];
    value: Array<string> = [];

    onChange = (_: any) => {};
    onTouched = () => {};

    /***************************************************************************
     * Event handlers.
     **************************************************************************/

    ngOnInit() {
        this.init();
    }

    onSelectionClick(event) {
        this.toggleDropdown();
        event.stopPropagation();
    }

    onClearClick(event) {
        this.clearSelected();
        event.stopPropagation();
    }

    onToggleSelect(optionValue) {
        this.toggleSelect(optionValue);
    }

    onClose(focus) {
        this.close(focus);
    }

    onWindowClick() {
        this.close(false);
    }

    onWindowResize() {
        this.updateWidth();
    }

    onKeydown(event) {
        this.handleKeyDown(event);
    }

    /***************************************************************************
     * Initialization.
     **************************************************************************/

    init() {
        this.initOptions();
        this.initDefaults();
    }

    initOptions() {
        let values = [];
        let opts = {};

        for (let option of this.options) {
            opts[option.value] = {
                value: option.value,
                label: option.label,
                selected: false
            };
            values.push(option.value);
        }

        this.optionValues = values;
        this.optionsDict = opts;
    }

    initDefaults() {
        if (typeof this.isSingle === 'undefined') {
            this.isSingle = true;
        }
        if (typeof this.theme === 'undefined') {
            this.theme = 'default';
        }
        if (typeof this.allowClear === 'undefined') {
            this.allowClear = false;
        }
    }

    /***************************************************************************
     * Dropdown toggle.
     **************************************************************************/

    toggleDropdown() {
        if (!this.isDisabled) {
            this.isOpen ? this.close(true) : this.open();
        }
    }

    open() {
        this.updateWidth();
        this.updatePosition();
        this.isOpen = true;
    }

    close(focus: boolean) {
        this.isOpen = false;
        if (focus) {
            this.focus();
        }
    }

    /***************************************************************************
     * Select.
     **************************************************************************/

    toggleSelect(value: string) {
        if (this.isSingle && this.selection.length > 0) {
            this.selection[0].selected = false;
        }
        this.optionsDict[value].selected = !this.optionsDict[value].selected;
        this.updateSelection();
        this.focus();
    }

    updateSelection() {
        let s = [];
        let v = [];
        for (let optionValue of this.optionValues) {
            if (this.optionsDict[optionValue].selected) {
                let opt = this.optionsDict[optionValue];
                s.push(opt);
                v.push(opt.value);
            }
        }
        this.selection = s;
        this.value = v;
        // TODO first check if value has changed?
        this.onChange(this.value);
    }

    clearSelected() {
        for (let item in this.optionsDict) {
            this.optionsDict[item].selected = false;
        }
        this.selection = [];
        this.value = [];
        // TODO first check if value has changed?
        this.onChange(this.value);
    }

    /***************************************************************************
     * ControlValueAccessor interface methods.
     **************************************************************************/

    writeValue(value: any) {

        if (typeof value === 'undefined' || value === null) {
            value = [];
        }

        this.value = value;

        // Populate `selection` and `value` arrays.
        for (let optionValue of value) {
            let option = this.optionsDict[optionValue];
            option.selected = true;
            this.selection.push(option);
        }
    }

    registerOnChange(fn: (_: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    /***************************************************************************
     * Keys.
     **************************************************************************/

    private KEYS: any = {
        ENTER: 13,
        SPACE: 32,
        DOWN: 40
    };

    handleKeyDown(event) {

        let key = event.which;

        if (key === this.KEYS.ENTER || key === this.KEYS.SPACE ||
            (key === this.KEYS.DOWN && event.altKey)) {

            this.open();
            event.preventDefault();
        }
    }

    /***************************************************************************
     * Layout/Style/Classes/Focus.
     **************************************************************************/

    focus() {
        this.hasFocus = true;
        this.selectionSpan.nativeElement.focus();
    }

    blur() {
        this.hasFocus = false;
        this.selectionSpan.nativeElement.blur();
    }

    updateWidth() {
        this.width = this.container.nativeElement.offsetWidth;
    }

    updatePosition() {
        let e = this.container.nativeElement;
        this.left = e.offsetLeft;
        this.top = e.offsetTop + e.offsetHeight;
    }

    getContainerClass(): any {
        let result = {};

        result[this.S2] = true;

        let c = this.S2_CONTAINER;
        result[c] = true;
        result[c + '--open'] = this.isOpen;
        result[c + '--focus'] = this.hasFocus;
        result[c + '--' + this.theme] = true;
        result[c + '--' + (this.isBelow ? 'below' : 'above')] = true;

        return result;
    }

    getSelectionClass(): any {
        let result = {};

        let s = this.S2_SELECTION;
        result[s] = true;
        result[s + '--' + (this.isSingle ? 'single' : 'multiple')] = true;

        return result;
    }

    showPlaceholder(): boolean {
        return typeof this.placeholder !== 'undefined' &&
            this.selection.length === 0;
    }
}


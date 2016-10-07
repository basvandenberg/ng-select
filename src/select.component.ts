import {Component, Input, OnChanges, OnInit, Output, EventEmitter, ExistingProvider, ViewChild, ViewEncapsulation, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {DEFAULT_STYLES} from './style';
import {SelectDropdownComponent} from './select-dropdown.component';

export const SELECT_VALUE_ACCESSOR: ExistingProvider = { provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};

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
                    *ngIf="!multiple">
                    <span class="select2-selection__placeholder">
                        {{getPlaceholder()}}
                    </span>
                </span>

                <span class="select2-selection__rendered"
                    *ngIf="!multiple && selection.length > 0">
                    <span class="select2-selection__clear"
                        *ngIf="allowClear"
                        (click)="onClearAllClick($event)">
                        x
                    </span>
                    {{selection[0].label}}
                </span>

                <ul class="select2-selection__rendered"
                    *ngIf="multiple">
                    <li class="select2-selection__choice" title="{{option.label}}"
                        *ngFor="let option of selection">
                        <span class="select2-selection__choice__remove"
                            [attr.data-value]="option.value"
                            (click)=onClearItemClick($event)>
                            ×</span>
                        {{option.label}}
                    </li>
                    <li class="select2-search select2-search--inline">
                        <input class="select2-search__field"
                            #searchInput
                            placeholder="{{getPlaceholder()}}"
                            [ngStyle]="getInputStyle()"
                            (input)="onInput($event)"
                            (keydown)="onSearchKeydown($event)"/>
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
        [multiple]="multiple"
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
    encapsulation: ViewEncapsulation.None,
    providers: [
        SELECT_VALUE_ACCESSOR
    ]
})

export class SelectComponent implements ControlValueAccessor, OnInit, OnChanges {

    // Class names.
    private S2: string = 'select2';
    private S2_CONTAINER: string = this.S2 + '-container';
    private S2_SELECTION: string = this.S2 + '-selection';

    @Input() options: Array<any>;
    @Input() theme: string;
    @Input() multiple: boolean;
    @Input() placeholder: string;
    @Input() allowClear: boolean;

    @Output() opened: EventEmitter<null> = new EventEmitter<null>();
    @Output() closed: EventEmitter<null> = new EventEmitter<null>();
    @Output() selected: EventEmitter<any> = new EventEmitter<any>();
    @Output() deselected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('container') container: any;
    @ViewChild('selectionSpan') selectionSpan: any;
    @ViewChild('dropdown') dropdown: SelectDropdownComponent;
    @ViewChild('searchInput') searchInput: any;

    // State variables.
    isDisabled: boolean = false;
    isBelow: boolean = true;
    isOpen: boolean = false;
    hasFocus: boolean = false;

    width: number;
    top: number;
    left: number;

    // Select options.
    optionValues: Array<string> = [];
    optionsDict: any = {};

    selection: Array<any> = [];
    value: Array<string> = [];

    onChange = (_: any) => {};
    onTouched = () => {};

    /***************************************************************************
     * Event handlers.
     **************************************************************************/

    ngOnInit() {
        this.init();
    }

    ngOnChanges(changes: any) {
        this.init();
    }

    onSelectionClick(event: any) {
        this.toggleDropdown();

        if (this.multiple) {
            this.searchInput.nativeElement.focus();
        }
        event.stopPropagation();
    }

    onClearAllClick(event: any) {
        this.clearSelected();
        event.stopPropagation();
    }

    onClearItemClick(event: any) {
        this.deselect(event.target.dataset.value);
        event.stopPropagation();
    }

    onToggleSelect(optionValue: any) {
        this.toggleSelect(optionValue);
    }

    onClose(focus: any) {
        this.close(focus);
    }

    onWindowClick() {
        this.close(false);
    }

    onWindowResize() {
        this.updateWidth();
    }

    onKeydown(event: any) {
        this.handleKeyDown(event);
    }

    onInput(event: any) {

        // Open dropdown, if it is currently closed.
        if (!this.isOpen) {
            this.open();
            // HACK
            setTimeout(() => {
                this.handleInput(event);
            }, 100);
        }
        else {
            this.handleInput(event);
        }
    }

    onSearchKeydown(event: any) {
        this.handleSearchKeyDown(event);
    }

    /***************************************************************************
     * Initialization.
     **************************************************************************/

    init() {
        this.initOptions();
        this.initDefaults();
    }

    initOptions() {
        let values: any[] = [];
        let opts = {};

        for (let option of this.options) {

            let selected = false;
            let existingOption = this.optionsDict[option.value];
            if (typeof existingOption !== 'undefined') {
                selected = existingOption.selected;
            }

            opts[option.value] = {
                value: option.value,
                label: option.label,
                selected: selected
            };
            values.push(option.value);
        }

        this.optionValues = values;
        this.optionsDict = opts;

        this.updateSelection();
    }

    initDefaults() {
        if (typeof this.multiple === 'undefined') {
            this.multiple = false;
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
        if (!this.isOpen) {
            this.updateWidth();
            this.updatePosition();
            this.isOpen = true;
            this.opened.emit(null);
        }
    }

    close(focus: boolean) {
        if (this.isOpen) {
            this.isOpen = false;
            if (focus) {
                this.focus();
            }
            this.closed.emit(null);
        }
    }

    /***************************************************************************
     * Select.
     **************************************************************************/

    toggleSelect(value: string) {

        if (!this.multiple && this.selection.length > 0) {
            this.selection[0].selected = false;
        }

        this.optionsDict[value].selected ?
            this.deselect(value) : this.select(value);

        if (this.multiple) {
            this.searchInput.nativeElement.value = '';
            this.searchInput.nativeElement.focus();
        }
        else {
            this.focus();
        }
    }

    select(value: string) {
        this.optionsDict[value].selected = true;
        this.updateSelection();
        this.selected.emit(this.optionsDict[value]);
    }

    deselect(value: string) {
        this.optionsDict[value].selected = false;
        this.updateSelection();
        this.deselected.emit(this.optionsDict[value]);
    }

    updateSelection() {
        let s: Array<any> = [];
        let v: Array<string> = [];
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
        this.onChange(this.getOutputValue());
    }

    popSelect() {
        if (this.selection.length > 0) {
            this.selection[this.selection.length - 1].selected = false;
            this.updateSelection();
            this.onChange(this.getOutputValue());
        }
    }

    clearSelected() {
        for (let item in this.optionsDict) {
            this.optionsDict[item].selected = false;
        }
        this.selection = [];
        this.value = [];

        // TODO first check if value has changed?
        this.onChange(this.getOutputValue());
    }

    getOutputValue(): any {
        if (this.multiple) {
            return this.value.slice(0);
        }
        else {
            return this.value.length === 0 ? '' : this.value[0];
        }
    }

    /***************************************************************************
     * ControlValueAccessor interface methods.
     **************************************************************************/

    writeValue(value: any) {

        if (typeof value === 'undefined' || value === null) {
            value = [];
        }

        this.value = value;

        for (let item in this.optionsDict) {
            if (value.indexOf(item) > -1) {
                this.optionsDict[item].selected = true;
            }
            else {
                this.optionsDict[item].selected = false;
            }
        }
        this.updateSelection();
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
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        UP: 38,
        DOWN: 40
    };

    handleKeyDown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ENTER || key === this.KEYS.SPACE ||
            (key === this.KEYS.DOWN && event.altKey)) {

            this.open();
            event.preventDefault();
        }
    }

    handleInput(event: any) {
        this.dropdown.filter(event.target.value);
    }

    handleSearchKeyDown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ENTER) {
            if (typeof this.dropdown !== 'undefined') {
                let hl = this.dropdown.highlighted;

                if (hl !== null) {
                    this.onToggleSelect(hl.value);
                }
            }
        }
        else if (key === this.KEYS.BACKSPACE) {
            if (this.searchInput.nativeElement.value === '') {
                this.popSelect();
            }
        }
        else if (key === this.KEYS.UP) {
            if (typeof this.dropdown === 'undefined') {
                this.open();
            }
            else {
                this.dropdown.highlightPrevious();
            }
        }
        else if (key === this.KEYS.DOWN) {
            if (typeof this.dropdown === 'undefined') {
                this.open();
            }
            else {
                this.dropdown.highlightNext();
            }
        }
        else if (key === this.KEYS.ESC) {
            this.close(true);
        }
    }

    /***************************************************************************
     * Layout/Style/Classes/Focus.
     **************************************************************************/

    focus() {
        this.hasFocus = true;
        if (this.multiple) {
            this.searchInput.nativeElement.focus();
        }
        else {
            this.selectionSpan.nativeElement.focus();
        }
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
        result[s + '--' + (this.multiple ? 'multiple' : 'single')] = true;

        return result;
    }

    showPlaceholder(): boolean {
        return typeof this.placeholder !== 'undefined' &&
            this.selection.length === 0;
    }

    getPlaceholder(): string {
        return this.showPlaceholder() ? this.placeholder : '';
    }

    getInputStyle(): any {

        let width: number;

        if (typeof this.searchInput === 'undefined') {
            width = 200;
        }
        else if (this.showPlaceholder() &&
                 this.searchInput.nativeElement.value.length === 0 ) {

            width = 10 + 10 * this.placeholder.length;
        }
        else {
            width = 10 + 10 * this.searchInput.nativeElement.value.length;
        }

        return {
            'width': width + 'px'
        };
    }
}

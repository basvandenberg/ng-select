import {
    Component,
    Input,
    OnChanges,
    OnInit,
    Output,
    EventEmitter,
    ExistingProvider,
    ViewChild,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import {SelectDropdownComponent} from './select-dropdown.component';
import {OptionList} from './option-list';

export const SELECT_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};

@Component({
    selector: 'ng-select',
    templateUrl: 'select.component.html',
    styleUrls: ['select.component.scss'],
    providers: [SELECT_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})

export class SelectComponent
        implements ControlValueAccessor, OnInit, OnChanges {

    @Input() options: Array<{ value: string; label: string; }>;

    @Input() multiple: boolean;
    @Input() placeholder: string;
    @Input() allowClear: boolean;

    @Output() opened: EventEmitter<null> = new EventEmitter<null>();
    @Output() closed: EventEmitter<null> = new EventEmitter<null>();
    @Output() selected: EventEmitter<any> = new EventEmitter<any>();
    @Output() deselected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('selection') selectionSpan: any;
    @ViewChild('dropdown') dropdown: SelectDropdownComponent;
    @ViewChild('searchInput') searchInput: any;

    // Select options.
    private _optionList: OptionList;
    get optionList(): OptionList { return this._optionList; }

    // State variables.
    isDisabled: boolean = false;
    isBelow: boolean = true;
    isOpen: boolean = false;
    hasFocus: boolean = false;

    renderedValue: string = '';

    width: number;
    top: number;
    left: number;

    onChange = (_: any) => {};
    onTouched = () => {};

    /**************************************************************************
     * Event handlers.
     *************************************************************************/

    ngOnInit() {
        this.initDefaults();
    }

    ngOnChanges(changes: any) {
        if (changes.hasOwnProperty('options')) {
            this.updateOptionsList(changes['options'].isFirstChange());
        }
    }

    onSelectionClick(event: any) {
        this.toggleDropdown();

        if (this.multiple) {
            this.searchInput.nativeElement.focus();
        }
        event.stopPropagation();
    }

    /**
     * Event handler of the single select clear (x) button click. It is assumed
     * that there is exactly one item selected.
     *
     * The `deselect` method is used instead of `clear`, to have the deselected
     * event emitted.
     */
    onClearSingleClick(event: any) {
        console.log('Clear single.');

        // Prevent open/close dropdown.
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
        this.closeDropdown(focus);
    }

    onWindowClick() {
        this.closeDropdown();
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

    /**************************************************************************
     * Initialization.
     *************************************************************************/

    private initDefaults() {
        if (typeof this.multiple === 'undefined') {
            this.multiple = false;
        }
        if (typeof this.allowClear === 'undefined') {
            this.allowClear = false;
        }
    }

    private updateOptionsList(firstTime: boolean) {
        let v: Array<string>;

        if (!firstTime) {
            v = this.optionList.value;
        }

        this._optionList = new OptionList(this.options);

        if (!firstTime) {
            this._optionList.value = v;
        }
    }

    /**************************************************************************
     * API.
     *************************************************************************/

    open() {
        this.openDropdown();
    }

    close() {
        this.closeDropdown();
    }

    clear() {
        this.clearSelection();
    }

    /***************************************************************************
     * ControlValueAccessor interface methods.
     **************************************************************************/

    writeValue(value: any) {

        if (typeof value === 'undefined' || value === null || value === '') {
            value = [];
        }
        else if (typeof value === 'string') {
            value = [value];
        }

        this.optionList.value = value;
    }

    registerOnChange(fn: (_: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    /**************************************************************************
     * Dropdown.
     *************************************************************************/

    private toggleDropdown() {
        if (!this.isDisabled) {
            this.isOpen ? this.closeDropdown(true) : this.openDropdown();
        }
    }

    private openDropdown() {
        if (!this.isOpen) {
            this.updateWidth();
            this.updatePosition();
            this.isOpen = true;
            this.opened.emit(null);
        }
    }

    private closeDropdown(focus: boolean = false) {
        if (this.isOpen) {
            this.isOpen = false;
            if (focus) {
                this.focus();
            }
            this.closed.emit(null);
        }
    }

    /**************************************************************************
     * Select.
     *************************************************************************/

    select(index: number) {
        this.optionList[index].selected = true;
        this.onChange(this.getOutputValue());
        this.selected.emit(this.optionList[index].undecoratedCopy());
    }

    deselect(index: number) {
        let option = this.optionList[index];
        option.selected = false;

        this.onChange(this.getOutputValue());

        this.deselected.emit({
            value: option.value,
            label: option.label
        });
    }

    toggleSelect(index: number) {
    }

    popSelect() {
    }

    private clearSelection() {
        if (this.optionList.hasSelected()) {
            this.optionList.clearSelection();
            this.onChange(this.getOutputValue());
        }
    }

    getOutputValue(): any {
        let v = this.optionList.value.slice(0);
        return v.length === 0 ? '' : this.multiple ? v : v[0];
    }

    /**************************************************************************
     * Keys.
     *************************************************************************/

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
        // this.dropdown.filter(event.target.value);
    }

    handleSearchKeyDown(event: any) {

        /*let key = event.which;

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
        }*/
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
        this.width = this.selectionSpan.nativeElement.offsetWidth;
    }

    updatePosition() {
        let e = this.selectionSpan.nativeElement;
        this.left = e.offsetLeft;
        this.top = e.offsetTop + e.offsetHeight;
    }
}

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
import {Option} from './option';
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

    @Input() allowClear: boolean = false;
    @Input() disabled: boolean = false;
    @Input() multiple: boolean = false;
    @Input() placeholder: string = '';
    @Input() notFoundMsg: string = 'No results found';

    @Output() opened: EventEmitter<null> = new EventEmitter<null>();
    @Output() closed: EventEmitter<null> = new EventEmitter<null>();
    @Output() selected: EventEmitter<any> = new EventEmitter<any>();
    @Output() deselected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('selection') selectionSpan: any;
    @ViewChild('dropdown') dropdown: SelectDropdownComponent;
    @ViewChild('searchInput') searchInput: any;

    private _value: '';

    optionList: OptionList;

    // State variables.
    hasFocus: boolean = false;
    hasSelected: boolean = false;
    isBelow: boolean = true;
    isDisabled: boolean = false;
    isOpen: boolean = false;

    // Width and position for the dropdown container.
    width: number;
    top: number;
    left: number;

    filterInputWidth: number = 20;

    private _onChange = (_: any) => {};
    private onTouched = () => {};

    /**************************************************************************
     * Event handlers.
     *************************************************************************/

    ngOnInit() {
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

    onOptionClicked(option: Option) {
        this.multiple ?
            this.toggleSelectOption(option) : this.selectOption(option);
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

    onFilterInput(event: any) {
        if (!this.isOpen) {
            this.openDropdown();
        }
        setTimeout(() => {
            this.onFilterInputChanged(event.target.value);
        }, 0);
    }

    onFilterInputChanged(term: string) {
        this.optionList.filter(term);
    }

    onClearSelectionClick(event: any) {
        this.clearSelection();
        event.stopPropagation();
    }

    onDeselectOptionClick(option: Option) {
        this.deselectOption(option);
        event.stopPropagation();
    }

    onFilterInputKeydown(event: any) {
        this.handleFilterInputKeydown(event);
    }

    onKeydown(event: any) {
        this.handleKeydown(event);
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

    select(value: string) {
        this.optionList.getOptionsByValue(value).forEach((option) => {
            this.selectOption(option);
        });
    }

    /**************************************************************************
     * ControlValueAccessor interface methods.
     *************************************************************************/

    writeValue(value: any) {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    /**************************************************************************
     * Getters/setters.
     *************************************************************************/

    get value(): any {
        if (this._value.length === 0) {
            return '';
        }
        else {
            return this.multiple ? this._value : this._value[0];
        }
    }

    set value(v: any) {
        if (typeof v === 'undefined' || v === null || v === '') {
            v = [];
        }
        else if (typeof v === 'string') {
            v = [v];
        }

        if (v !== this._value) {
            this._value = v;
            this.optionList.value = v;
            this.hasSelected = v.length > 0;

            this._onChange(v);
        }
    }

    /**************************************************************************
     * Initialization.
     *************************************************************************/

    private updateOptionsList(firstTime: boolean) {
        let v: Array<string>;

        if (!firstTime) {
            v = this.optionList.value;
        }

        this.optionList = new OptionList(this.options);

        if (!firstTime) {
            this.optionList.value = v;
        }
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

    private selectOption(option: Option) {
        if (!option.selected) {
            this.optionList.select(option, this.multiple);
            this.value = this.optionList.value;
            this.selected.emit(option.undecoratedCopy());
        }
    }

    private deselectOption(option: Option) {
        if (option.selected) {
            this.optionList.deselect(option);
            this.value = this.optionList.value;
            this.deselected.emit(option.undecoratedCopy());
        }
    }

    private clearSelection() {
        let selection: Array<Option> = this.optionList.selection;
        if (selection.length > 0) {
            this.optionList.clearSelection();
            this.value = this.optionList.value;

            if (selection.length === 1) {
                this.deselected.emit(selection[0].undecoratedCopy());
            }
            else {
                this.deselected.emit(selection.map((option) => {
                    return option.undecoratedCopy();
                }));
            }
        }
    }

    private toggleSelectOption(option: Option) {
        option.selected ?
            this.deselectOption(option) : this.selectOption(option);
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

    handleKeydown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ENTER || key === this.KEYS.SPACE ||
            (key === this.KEYS.DOWN && event.altKey)) {

            this.open();
            event.preventDefault();
        }
    }

    handleFilterInputKeydown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ENTER) {
            if (typeof this.dropdown !== 'undefined') {
                // let hl = this.dropdown.highlighted;

                // if (hl !== null) {
                    // this.onToggleSelect(hl.value);
                // }
            }
        }
        else if (key === this.KEYS.BACKSPACE) {
            if (this.searchInput.nativeElement.value === '') {
                // this.popSelect();
            }
        }
        else if (key === this.KEYS.UP) {
            if (typeof this.dropdown === 'undefined') {
                this.openDropdown();
            }
            else {
                // this.dropdown.highlightPrevious();
            }
        }
        else if (key === this.KEYS.DOWN) {
            if (typeof this.dropdown === 'undefined') {
                this.openDropdown();
            }
            else {
                // this.dropdown.highlightNext();
            }
        }
        else if (key === this.KEYS.ESC) {
            this.closeDropdown(true);
        }
    }

    /***************************************************************************
     * Layout.
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

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
    @ViewChild('filterInput') filterInput: any;

    private _value: '';

    optionList: OptionList;

    // Selection state variables.
    hasSelected: boolean = false;

    // View state variables.
    filterInputWidth: number = 1;
    hasFocus: boolean = false;
    isBelow: boolean = true;
    isDisabled: boolean = false;
    isOpen: boolean = false;
    placeholderView: string = '';

    // Width and position for the dropdown container.
    width: number;
    top: number;
    left: number;

    private _onChange = (_: any) => {};
    private onTouched = () => {};

    /**************************************************************************
     * Event handlers.
     *************************************************************************/

    // Angular lifecycle hooks.

    ngOnInit() {
    }

    ngOnChanges(changes: any) {
        if (changes.hasOwnProperty('options')) {
            this.updateOptionsList(changes['options'].isFirstChange());
        }
    }

    // Window.

    onWindowClick() {
        this.closeDropdown();
    }

    onWindowResize() {
        this.updateWidth();
    }

    // Select container.

    onSelectContainerClick(event: any) {
        this.toggleDropdown();
        if (this.multiple) {
            this.filterInput.nativeElement.focus();
        }
        event.stopPropagation();
    }

    onSelectContainerKeydown(event: any) {
        console.log('Select container keydown');
        this.handleKeydown(event);
    }

    // Dropdown container.

    onDropdownOptionClicked(option: Option) {
        this.multiple ?
            this.toggleSelectOption(option) : this.selectOption(option);
    }

    onDropdownClose(focus: any) {
        this.closeDropdown(focus);
    }

    // Single filter input.

    onSingleFilterInput(term: string) {
        console.log('single filter input');
        this.optionList.filter(term);
    }

    onSingleFilterKeydown(event: any) {
        console.log('single filter keydown');
        this.handleSingleFilterKeydown(event);
    }

    // Multiple filter input.

    onMultipleFilterInput(event: any) {
        console.log('multiple filter input');
        if (!this.isOpen) {
            this.openDropdown();
        }
        this.updateFilterWidth();
        setTimeout(() => {
            this.optionList.filter(event.target.value);
        });
    }

    onMultipleFilterKeydown(event: any) {
        console.log('multiple filter keydown');
        this.handleMultipleFilterKeydown(event);
    }

    // Single clear select.

    onClearSelectionClick(event: any) {
        this.clearSelection();
        this.closeDropdown(true);
        event.stopPropagation();
    }

    // Multiple deselect option.

    onDeselectOptionClick(option: Option) {
        this.deselectOption(option);
        event.stopPropagation();
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
            this.placeholderView = this.hasSelected ? '' : this.placeholder;

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
            this.clearFilterInput();
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
            setTimeout(() => {
                this.updateFilterWidth();
            });
        }
    }

    private deselectOption(option: Option) {
        if (option.selected) {
            this.optionList.deselect(option);
            this.value = this.optionList.value;
            this.deselected.emit(option.undecoratedCopy());
            // Reposition dropdown if heigh select container changes.
            setTimeout(() => {
                this.updateFilterWidth();
                this.updatePosition();
            });
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

    private selectHighlightedOption() {
        this.selectOption(this.optionList.highlightedOption);
        this.closeDropdown(true);
    }

    private deselectLast() {
        let sel: Array<Option> = this.optionList.selection;

        if (sel.length > 0) {
            let option: Option = sel[sel.length - 1];
            this.deselectOption(option);
            this.setMultipleFilterInput(option.label + ' ');
        }
    }

    /**************************************************************************
     * Filter.
     *************************************************************************/

    private clearFilterInput() {
        if (this.multiple) {
            this.filterInput.nativeElement.value = '';
        }
        else {
            this.dropdown.clearFilterInput();
        }
    }

    private setMultipleFilterInput(value: string) {
        this.filterInput.nativeElement.value = value;
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

    private handleKeydown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ESC || (key === this.KEYS.UP && event.altKey)) {

            this.closeDropdown(true);
        }
        else if (key === this.KEYS.ENTER || key === this.KEYS.SPACE ||
            (key === this.KEYS.DOWN && event.altKey)) {

            this.openDropdown();
        }
    }

    private handleMultipleFilterKeydown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ENTER) {
            this.isOpen ? this.selectHighlightedOption() : this.openDropdown();
            event.stopPropagation();
        }
        else if (key === this.KEYS.BACKSPACE) {
            if (this.hasSelected &&
                    this.filterInput.nativeElement.value === '') {
                this.deselectLast();
                event.stopPropagation();
            }
        }
        else if (key === this.KEYS.UP) {
            if (this.isOpen) {
                this.optionList.highlightPreviousOption();
                this.dropdown.moveHighlightedIntoView();
            }
        }
        else if (key === this.KEYS.DOWN) {
            if (this.isOpen) {
                this.optionList.highlightNextOption();
                this.dropdown.moveHighlightedIntoView();
            }
        }
        else if (key === this.KEYS.ESC) {
            this.closeDropdown(true);
        }
    }

    private handleSingleFilterKeydown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ENTER) {
            this.selectHighlightedOption();
            event.preventDefault();
        }
        else if (key === this.KEYS.UP) {
            this.optionList.highlightPreviousOption();
            this.dropdown.moveHighlightedIntoView();
            event.preventDefault();
        }
        else if (key === this.KEYS.DOWN) {
            this.optionList.highlightNextOption();
            this.dropdown.moveHighlightedIntoView();
            event.preventDefault();
        }

    }

    /***************************************************************************
     * Layout.
     **************************************************************************/

    focus() {
        this.hasFocus = true;
        if (this.multiple) {
            this.filterInput.nativeElement.focus();
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

    updateFilterWidth() {
        let value: string = this.filterInput.nativeElement.value;
        this.filterInputWidth = value.length === 0 ?
            this.placeholderView.length * 10 : 1 + value.length * 10;
    }

}

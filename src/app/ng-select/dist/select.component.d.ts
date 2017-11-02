import { OnChanges, OnInit, EventEmitter, ExistingProvider, ElementRef, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SelectDropdownComponent } from './select-dropdown.component';
import { IOption } from './option.interface';
import { Option } from './option';
export declare const SELECT_VALUE_ACCESSOR: ExistingProvider;
export declare class SelectComponent implements ControlValueAccessor, OnChanges, OnInit {
    private hostElement;
    options: Array<IOption>;
    allowClear: boolean;
    disabled: boolean;
    multiple: boolean;
    noFilter: number;
    highlightColor: string;
    highlightTextColor: string;
    notFoundMsg: string;
    placeholder: string;
    filterPlaceholder: string;
    label: string;
    opened: EventEmitter<null>;
    closed: EventEmitter<null>;
    selected: EventEmitter<IOption>;
    deselected: EventEmitter<IOption | IOption[]>;
    focus: EventEmitter<null>;
    blur: EventEmitter<null>;
    noOptionsFound: EventEmitter<string>;
    selectionSpan: ElementRef;
    dropdown: SelectDropdownComponent;
    filterInput: ElementRef;
    optionTemplate: TemplateRef<any>;
    private _value;
    private optionList;
    hasFocus: boolean;
    isOpen: boolean;
    isBelow: boolean;
    private filterEnabled;
    private filterInputWidth;
    private isDisabled;
    private placeholderView;
    private clearClicked;
    private selectContainerClicked;
    private optionListClicked;
    private optionClicked;
    private width;
    private top;
    private left;
    private onChange;
    private onTouched;
    constructor(hostElement: ElementRef);
    /** Event handlers. **/
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    onWindowBlur(): void;
    onWindowClick(): void;
    onWindowResize(): void;
    onSelectContainerClick(event: any): void;
    onSelectContainerFocus(): void;
    onSelectContainerKeydown(event: any): void;
    onOptionsListClick(): void;
    onDropdownOptionClicked(option: Option): void;
    onSingleFilterClick(): void;
    onSingleFilterFocus(): void;
    onFilterInput(term: string): void;
    onSingleFilterKeydown(event: any): void;
    onMultipleFilterKeydown(event: any): void;
    onMultipleFilterFocus(): void;
    onClearSelectionClick(event: any): void;
    onDeselectOptionClick(option: Option): void;
    /** API. **/
    open(): void;
    close(): void;
    clear(): void;
    select(value: string | Array<string>): void;
    /** ControlValueAccessor interface methods. **/
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    /** Input change handling. **/
    private handleInputChanges(changes);
    private updateOptionList(options);
    private updateFilterEnabled();
    /** Value. **/
    value: string | string[];
    private valueChanged();
    private updateState();
    /** Select. **/
    private selectOption(option);
    private deselectOption(option);
    private clearSelection();
    private toggleSelectOption(option);
    private selectHighlightedOption();
    private deselectLast();
    /** Dropdown. **/
    private toggleDropdown();
    private openDropdown();
    private closeDropdown(focus);
    /** Filter. **/
    private filter(term);
    private clearFilterInput();
    private setMultipleFilterInput(value);
    /** Keys. **/
    private KEYS;
    private handleSelectContainerKeydown(event);
    private handleMultipleFilterKeydown(event);
    private handleSingleFilterKeydown(event);
    /** View. **/
    _blur(): void;
    _focus(): void;
    _focusSelectContainer(): void;
    private updateWidth();
    private updatePosition();
    private updateFilterWidth();
}

import { AfterViewInit, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Option } from './option';
import { OptionList } from './option-list';
export declare class SelectDropdownComponent<T> implements AfterViewInit, OnChanges, OnInit {
    filterEnabled: boolean;
    highlightColor: string;
    highlightTextColor: string;
    left: number;
    multiple: boolean;
    notFoundMsg: string;
    optionList: OptionList<T>;
    top: number;
    width: number;
    close: EventEmitter<boolean>;
    optionClicked: EventEmitter<Option<T>>;
    singleFilterClick: EventEmitter<null>;
    singleFilterInput: EventEmitter<string>;
    singleFilterKeydown: EventEmitter<any>;
    filterInput: any;
    optionsList: any;
    disabledColor: string;
    disabledTextColor: string;
    /** Event handlers. **/
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
    onSingleFilterClick(event: any): void;
    onSingleFilterInput(event: any): void;
    onSingleFilterKeydown(event: any): void;
    onOptionsWheel(event: any): void;
    onOptionMouseover(option: Option<T>): void;
    onOptionClick(option: Option<T>): void;
    /** Initialization. **/
    private optionsReset();
    /** View. **/
    getOptionStyle(option: Option<T>): any;
    clearFilterInput(): void;
    moveHighlightedIntoView(): void;
    private handleOptionsWheel(e);
}

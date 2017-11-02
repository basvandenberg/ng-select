import { AfterViewInit, EventEmitter, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { Option } from './option';
import { OptionList } from './option-list';
export declare class SelectDropdownComponent implements AfterViewInit, OnChanges, OnInit {
    filterEnabled: boolean;
    highlightColor: string;
    highlightTextColor: string;
    left: number;
    multiple: boolean;
    notFoundMsg: string;
    optionList: OptionList;
    top: number;
    width: number;
    placeholder: string;
    optionTemplate: TemplateRef<any>;
    optionClicked: EventEmitter<Option>;
    optionsListClick: EventEmitter<null>;
    singleFilterClick: EventEmitter<null>;
    singleFilterFocus: EventEmitter<null>;
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
    onOptionsListClick(): void;
    onSingleFilterClick(): void;
    onSingleFilterInput(event: any): void;
    onSingleFilterKeydown(event: any): void;
    onSingleFilterFocus(): void;
    onOptionsWheel(event: any): void;
    onOptionMouseover(option: Option): void;
    onOptionClick(option: Option): void;
    /** Initialization. **/
    private optionsReset();
    /** View. **/
    getOptionStyle(option: Option): any;
    moveHighlightedIntoView(): void;
    private handleOptionsWheel(e);
}

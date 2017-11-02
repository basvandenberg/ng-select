import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Option} from './option';
import {OptionList} from './option-list';

@Component({
    selector: 'select-dropdown',
    templateUrl: 'select-dropdown.component.html',
    styleUrls: ['select-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SelectDropdownComponent
        implements AfterViewInit, OnChanges, OnInit {

    @Input() filterEnabled: boolean;
    @Input() highlightColor: string;
    @Input() highlightTextColor: string;
    @Input() left: number;
    @Input() multiple: boolean;
    @Input() notFoundMsg: string;
    @Input() optionList: OptionList;
    @Input() top: number;
    @Input() width: number;
    @Input() placeholder: string;
    @Input() optionTemplate: TemplateRef<any>;

    @Output() optionClicked = new EventEmitter<Option>();
    @Output() optionsListClick = new EventEmitter<null>();
    @Output() singleFilterClick = new EventEmitter<null>();
    @Output() singleFilterFocus = new EventEmitter<null>();
    @Output() singleFilterInput = new EventEmitter<string>();
    @Output() singleFilterKeydown = new EventEmitter<any>();

    @ViewChild('filterInput') filterInput: any;
    @ViewChild('optionsList') optionsList: any;

    disabledColor: string = '#fff';
    disabledTextColor: string = '9e9e9e';

    /** Event handlers. **/

    ngOnInit() {
        this.optionsReset();
    }

    ngOnChanges(changes: any) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    }

    ngAfterViewInit() {
        this.moveHighlightedIntoView();
        if (!this.multiple && this.filterEnabled) {
            this.filterInput.nativeElement.focus();
        }
    }

    onOptionsListClick() {
        this.optionsListClick.emit(null);
    }

    onSingleFilterClick() {
        this.singleFilterClick.emit(null);
    }

    onSingleFilterInput(event: any) {
        this.singleFilterInput.emit(event.target.value);
    }

    onSingleFilterKeydown(event: any) {
        this.singleFilterKeydown.emit(event);
    }

    onSingleFilterFocus() {
        this.singleFilterFocus.emit(null);
    }

    onOptionsWheel(event: any) {
        this.handleOptionsWheel(event);
    }

    onOptionMouseover(option: Option) {
        this.optionList.highlightOption(option);
    }

    onOptionClick(option: Option) {
        this.optionClicked.emit(option);
    }

    /** Initialization. **/

    private optionsReset() {
        this.optionList.filter('');
        this.optionList.highlight();
    }

    /** View. **/

    getOptionStyle(option: Option): any {
        if (option.highlighted) {
            let style: any = {};

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
    }

    moveHighlightedIntoView() {

        let list = this.optionsList.nativeElement;
        let listHeight = list.offsetHeight;

        let itemIndex = this.optionList.getHighlightedIndex();

        if (itemIndex > -1) {
            let item = list.children[0].children[itemIndex];
            let itemHeight = item.offsetHeight;

            let itemTop = itemIndex * itemHeight;
            let itemBottom = itemTop + itemHeight;

            let viewTop = list.scrollTop;
            let viewBottom = viewTop + listHeight;

            if (itemBottom > viewBottom) {
                list.scrollTop = itemBottom - listHeight;
            }
            else if (itemTop < viewTop) {
                list.scrollTop = itemTop;
            }
        }
    }

    private handleOptionsWheel(e: any) {
        let div = this.optionsList.nativeElement;
        let atTop = div.scrollTop === 0;
        let atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;

        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        }
        else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    }
}

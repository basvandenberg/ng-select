import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
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

    @Input() optionList: OptionList;
    @Input() multiple: boolean;
    @Input() notFoundMsg: string;
    @Input() width: number;
    @Input() top: number;
    @Input() left: number;

    @Output() close = new EventEmitter<boolean>();
    @Output() filterEnterPressed = new EventEmitter<null>();
    @Output() filterInputChanged = new EventEmitter<string>();
    @Output() optionClicked = new EventEmitter<Option>();

    @ViewChild('filterInput') filterInput: any;
    @ViewChild('optionsList') optionsList: any;

    /**************************************************************************
     * Event handlers.
     *************************************************************************/

    // Life cycle hooks.

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
        if (!this.multiple) {
            this.filterInput.nativeElement.focus();
        }
    }

    // Filter input.

    onFilterInputClick(event: any) {
        event.stopPropagation();
    }

    onFilterInput(event: any) {
        this.filterInputChanged.emit(event.target.value);
    }

    onFilterKeydown(event: any) {
        this.handleFilterKeydown(event);
    }

    // Options list.

    onOptionsWheel(event: any) {
        this.handleOptionsWheel(event);
    }

    // Option.

    onOptionClick(option: Option) {
        this.optionClicked.emit(option);
    }

    onOptionMouseover(option: Option) {
        this.optionList.highlightOption(option);
    }

    /**************************************************************************
     * Initialization.
     *************************************************************************/

    private optionsReset() {
        this.optionList.resetFilter();
        this.optionList.highlight();
    }

    /**************************************************************************
     * Filter.
     *************************************************************************/

    clearFilter() {
        this.filterInput.nativeElement.value = '';
    }

    /**************************************************************************
     * Highlight.
     *************************************************************************/

    moveHighlightedIntoView() {

        let list = this.optionsList.nativeElement;
        let listHeight = list.offsetHeight;

        let itemIndex = this.optionList.getHighlightedIndex();
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


    /**************************************************************************
     * Keys/scroll.
     *************************************************************************/

    private KEYS: any = {
        ENTER: 13,
        ESC: 27,
        UP: 38,
        DOWN: 40
    };

    private handleFilterKeydown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ENTER) {
            this.filterEnterPressed.emit(null);
            event.preventDefault();
        }
        else if (key === this.KEYS.UP) {
            this.optionList.highlightPreviousOption();
            this.moveHighlightedIntoView();
            event.preventDefault();
        }
        else if (key === this.KEYS.DOWN) {
            this.optionList.highlightNextOption();
            this.moveHighlightedIntoView();
            event.preventDefault();
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


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
import {DiacriticsService} from './diacritics.service';
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
    @Output() optionClicked = new EventEmitter<Option>();
    @Output() filterInputChanged = new EventEmitter<string>();

    @ViewChild('input') input: any;
    @ViewChild('optionsList') optionsList: any;

    constructor(
        private diacriticsService: DiacriticsService
    ) {}

    /**************************************************************************
     * Event handlers.
     *************************************************************************/

    ngOnInit() {
        this.optionsReset();
    }

    ngOnChanges(changes: any) {
        if (changes.hasOwnProperty('optionList')) {
            this.optionsReset();
        }
    }

    ngAfterViewInit() {
        if (!this.multiple) {
            this.input.nativeElement.focus();
        }
    }

    onInputClick(event: any) {
        event.stopPropagation();
    }

    onOptionsMouseMove(event: any) {
        // console.log(event);
        /*let index: number = event.target.dataset['optionIndex'];
        if (typeof index !== 'undefined') {
            // console.log(index);
        }*/
    }

    onOptionsWheel(event: any) {
        this.handleOptionsWheel(event);
    }

    onOptionClick(option: Option) {
        this.optionClicked.emit(option);
    }

    onKeydown(event: any) {
        this.handleKeydown(event);
    }

    onFilterInput(event: any) {
        this.filterInputChanged.emit(event.target.value);
    }

    /***************************************************************************
     * Initialization.
     **************************************************************************/

    private optionsReset() {
        this.optionList.resetFilter();
        this.optionList.highlight();
    }

    /***************************************************************************
     * Highlight.
     **************************************************************************/

    /*get highlighted(): any {
        return this._highlighted;
    }

    private initHighlight() {
        if (this.optionValues.length > 0) {

            if (this.selection.length > 0) {
                this._highlighted = this.selection[0];
            }
            else {
                this._highlighted = this.optionsDict[this.optionValues[0]];
            }
        }
    }

    private highlight(optionValue: string) {
        if (this.highlighted === null ||
            optionValue !== this.highlighted.value) {
            this._highlighted = this.optionsDict[optionValue];
        }
    }*/

    // TODO
    /*private ensureHighlightedVisible() {

        let list = this.optionsList.nativeElement;
        let listHeight = list.offsetHeight;

        let itemIndex = this.highlightIndex();
        let item = list.children[itemIndex];
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

    private highlightIndex(): number {
        if (this.highlighted === null) {
            return null;
        }
        return this.filteredOptionsIndex(this.highlighted.value);
    }*/

    /**************************************************************************
     * Keys/scroll.
     *************************************************************************/

    private KEYS: any = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        UP: 38,
        DOWN: 40
    };

    private handleKeydown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ESC || key === this.KEYS.TAB ||
            (key === this.KEYS.UP && event.altKey)) {

            this.close.emit(true);
            event.preventDefault();
        }
        else if (key === this.KEYS.ENTER) {
            /*if (this.highlighted !== null) {
                this.toggleSelect.emit(this.highlighted.value);

                this.close.emit(true);
            }*/
            event.preventDefault();
        }
        else if (key === this.KEYS.UP) {
            // this.highlightPrevious();
            event.preventDefault();
        }
        else if (key === this.KEYS.DOWN) {
            // this.highlightNext();
            event.preventDefault();
        }
    }

    private handleOptionsWheel(e: any) {
        let div = this.optionsList.nativeElement.parentElement;
        let atTop = div.scrollTop === 0;
        let atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;

        if (atTop && e.deltaY < 0) {
            e.preventDefault();
        }
        else if (atBottom && e.deltaY > 0) {
            e.preventDefault();
        }
    }

    /*
    highlightPrevious() {
        let i = this.highlightIndex();

        if (i !== null && i > 0) {
            this.highlight(this.optionValuesFiltered[i - 1]);
            this.ensureHighlightedVisible();
        }
    }

    highlightNext() {
        let i = this.highlightIndex();

        if (i !== null && i < this.optionValuesFiltered.length - 1) {
            this.highlight(this.optionValuesFiltered[i + 1]);
            this.ensureHighlightedVisible();
        }
    }*/

    /***************************************************************************
     * Classes.
     **************************************************************************/

    /*private getOptionClass(optionValue: string): any {
        let result = {};
        let hlValue = this.highlighted === null ? '' : this.highlighted.value;

        result[this.S2_OPTION] = true;
        result[this.S2_OPTION_HL] = optionValue === hlValue;
        result[this.S2_MSG] = optionValue === null;

        return result;
    }*/

    /***************************************************************************
     * Util functions.
     **************************************************************************/

    /*private filteredOptionsIndex(optionValue: string) {
        for (let i = 0; i < this.optionValuesFiltered.length; i++) {
            if (this.optionValuesFiltered[i] === optionValue) {
                return i;
            }
        }
        return null;
    }*/
}


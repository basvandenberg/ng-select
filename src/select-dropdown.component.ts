import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {DEFAULT_STYLES} from './style';
import {DiacriticsService} from './diacritics.service';

@Component({
    selector: 'select-dropdown',
    template: `
<span class="select2-container select2-container--default select2-container--open"
    [ngStyle]="{position: 'absolute', top: top + 'px', left: left + 'px'}">
    <span class="select2-dropdown select2-dropdown--below"
        [ngStyle]="{width: width + 'px'}">
        <span class="select2-search select2-search--dropdown"
            *ngIf="!multiple">
            <input class="select2-search__field"
                #input
                (input)="onInput($event)"
                (keydown)="onKeydown($event)"
                (click)="onInputClick($event)">
        </span>
        <span class="select2-results">
            <ul class="select2-results__options"
                #optionsList
                (mousemove)="onOptionsMouseMove($event)"
                (wheel)="onOptionsWheel($event)"
                (click)="onOptionsClick($event)">
                <li
                    *ngFor="let optionValue of optionValuesFiltered;"
                    [attr.aria-selected]="optionsDict[optionValue].selected"
                    [ngClass]="getOptionClass(optionValue)"
                    [attr.data-value]="optionValue">
                    {{optionsDict[optionValue].label}}
                </li>
                <li 
                    *ngIf="optionValuesFiltered.length === 0"
                    [ngClass]="getOptionClass(null)">
                    {{MSG_NOT_FOUND}}
                </li>
            </ul>
        </span>
    </span>
</span>
`,
    styles: [
        DEFAULT_STYLES
    ]
})

export class SelectDropdownComponent implements AfterViewInit, OnChanges, OnInit {

    // Messages.
    private MSG_LOADING = 'Searching...'; // TODO
    private MSG_NOT_FOUND = 'No results found';

    // Class names.
    private S2: string = 'select2';
    private S2_RESULTS: string = this.S2 + '-results';
    private S2_MSG: string = this.S2_RESULTS + '__message';
    private S2_OPTIONS: string = this.S2_RESULTS + '__options';
    private S2_OPTION: string = this.S2_RESULTS + '__option';
    private S2_OPTION_HL: string = this.S2_OPTION + '--highlighted';

    @Input() multiple: boolean;
    @Input() optionValues: Array<string>;
    @Input() optionsDict: any;
    @Input() selection: Array<any>;

    @Input() width: number;
    @Input() top: number;
    @Input() left: number;

    @Output() close = new EventEmitter<boolean>();
    @Output() toggleSelect = new EventEmitter<string>();

    @ViewChild('input') input: any;
    @ViewChild('optionsList') optionsList: any;

    optionValuesFiltered: Array<string> = [];
    _highlighted: any = null;

    constructor(
        private diacriticsService: DiacriticsService
    ) {}

    /***************************************************************************
     * Event handlers.
     **************************************************************************/

    ngOnInit() {
        this.init();
    }

    ngOnChanges(changes: any) {
        this.init();
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
        let v = event.target.dataset.value;
        if (typeof v !== 'undefined') {
            this.highlight(v);
        }
    }

    onOptionsWheel(event: any) {
        this.handleOptionsWheel(event);
    }

    onOptionsClick(event: any) {
        let val = event.target.dataset.value;

        if (typeof val !== 'undefined') {
            this.toggleSelect.emit(val);
        }
        else {
            // Prevent close dropdown.
            event.stopPropagation();
        }
    }

    onKeydown(event: any) {
        this.handleKeyDown(event);
    }

    onInput(event: any) {
        this.filter(event.target.value);
    }

    /***************************************************************************
     * Initialization.
     **************************************************************************/

    private init() {
        // Set filtered list of options to all options.
        this.optionValuesFiltered = this.optionValues;

        // Highlight first option in list (or first option in selection).
        this.initHighlight();
    }

    /***************************************************************************
     * Highlight.
     **************************************************************************/

    get highlighted(): any {
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
    }

    private ensureHighlightedVisible() {

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
    }

    /***************************************************************************
     * Filter.
     **************************************************************************/

    filter(term: string) {

        // Nothing to filter, set all options.
        if (term.trim() === '') {
            this.optionValuesFiltered = this.optionValues;
        }

        // Clone list of option values.
        let filtered = this.optionValues.slice(0);

        // Backwards iterate over list of options (to remove options).
        for (let i = this.optionValues.length - 1; i >= 0; i--) {

            let label = this.optionsDict[this.optionValues[i]].label;

            let a = this.diacriticsService.stripDiacritics(label).toUpperCase();
            let b = this.diacriticsService.stripDiacritics(term).toUpperCase();

            if (a.indexOf(b) === -1) {
                filtered.splice(i, 1);
            }
        }

        // Set filtered option values.
        this.optionValuesFiltered = filtered;

        // Highlight first item in list.
        if (this.optionValuesFiltered.length > 0) {
            this._highlighted = this.optionsDict[this.optionValuesFiltered[0]];
        }
        else {
            this._highlighted = null;
        }
    }

    /***************************************************************************
     * Keys/scroll.
     **************************************************************************/

    private KEYS: any = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        UP: 38,
        DOWN: 40
    };

    private handleKeyDown(event: any) {

        let key = event.which;

        if (key === this.KEYS.ESC || key === this.KEYS.TAB ||
            (key === this.KEYS.UP && event.altKey)) {

            this.close.emit(true);
            event.preventDefault();
        }
        else if (key === this.KEYS.ENTER) {
            if (this.highlighted !== null) {
                this.toggleSelect.emit(this.highlighted.value);

                this.close.emit(true);
            }
            event.preventDefault();
        }
        else if (key === this.KEYS.UP) {
            this.highlightPrevious();
            event.preventDefault();
        }
        else if (key === this.KEYS.DOWN) {
            this.highlightNext();
            event.preventDefault();
        }
    }

    private handleOptionsWheel(event: any) {
        let element = this.optionsList.nativeElement;

        let top = element.scrollTop;
        let bottom = (element.scrollHeight - top) - element.offsetHeight;

        let isAtTop = event.deltaY < 0 && top + event.deltaY <= 0;
        let isAtBottom = event.deltaY > 0 && bottom - event.deltaY <= 0;

        if (isAtTop) {
            element.scrollTop = 0;

            event.preventDefault();
            event.stopPropagation();
        }
        else if (isAtBottom) {
            element.scrollTop = element.scrollHeight - element.offsetHeight;

            event.preventDefault();
            event.stopPropagation();
        }
    }

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
    }

    /***************************************************************************
     * Classes.
     **************************************************************************/

    private getOptionClass(optionValue: string): any {
        let result = {};
        let hlValue = this.highlighted === null ? '' : this.highlighted.value;

        result[this.S2_OPTION] = true;
        result[this.S2_OPTION_HL] = optionValue === hlValue;
        result[this.S2_MSG] = optionValue === null;

        return result;
    }

    /***************************************************************************
     * Util functions.
     **************************************************************************/

    private filteredOptionsIndex(optionValue: string) {
        for (let i = 0; i < this.optionValuesFiltered.length; i++) {
            if (this.optionValuesFiltered[i] === optionValue) {
                return i;
            }
        }
        return null;
    }
}


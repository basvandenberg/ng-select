import {Option} from './option';
import {Diacritics} from './diacritics';

export class OptionList {

    private _options: Array<Option>;

    /* Consider using these for performance improvement. */
    // private _selection: Array<Option>;
    // private _filtered: Array<Option>;
    // private _value: Array<string>;

    private _highlightedOption: Option = null;
    private _hasShown: boolean;

    constructor(options: Array<any>) {

        if (typeof options === 'undefined' || options === null) {
            options = [];
        }

        this._options = options.map((option) => {
            let o: Option = new Option(option.value, option.label);
            if (option.disabled) {
                o.disable();
            }
            return o;
        });

        this._hasShown = this._options.length > 0;
        this.highlight();
    }

    /** Options. **/

    get options(): Array<Option> {
        return this._options;
    }

    getOptionsByValue(value: any): Array<Option> {
        return this.options.filter((option) => {
            return option.value === value;
        });
    }

    /** Value. **/

    get value(): Array<any> {
        return this.selection.map((selectedOption) => {
            return selectedOption.value;
        });
    }

    set value(v: Array<any>) {
        v = typeof v === 'undefined' || v === null ? [] : v;

        this.options.forEach((option) => {
            option.selected = v.indexOf(option.value) > -1;
        });
    }

    /** Selection. **/

    get selection(): Array<Option> {
        return this.options.filter((option) => {
            return option.selected;
        });
    }

    select(option: Option, multiple: boolean) {
        if (!multiple) {
            this.clearSelection();
        }
        option.selected = true;
    }

    deselect(option: Option) {
        option.selected = false;
    }

    clearSelection() {
        this.options.forEach((option) => {
            option.selected = false;
        });
    }

    /** Filter. **/

    get filtered(): Array<Option> {
        return this.options.filter((option) => {
            return option.shown;
        });
    }

    private _defaultTest (term, option): boolean {
        let l: string = Diacritics.strip(option.label).toUpperCase();
        let t: string = Diacritics.strip(term).toUpperCase();
        return l.indexOf(t) > -1;
    }

    private _test = this._defaultTest;

    get test () {
        return this._test;
    }

    set test (v: (term: string, option: any) => boolean) {
        v = typeof v !== 'function' ? this._defaultTest : v;

        this._test = v;
    }

    filter(term: string): boolean {
        let anyShown: boolean = false;

        if (term.trim() === '') {
            this.resetFilter();
            anyShown = this.options.length > 0;
        }
        else {
            this.options.forEach((option) => {
                option.shown = this.test(term, option);

                if (option.shown) {
                    anyShown = true;
                }
            });

        }
        let toEmpty: boolean = this.hasShown && !anyShown;

        this.highlight();
        this._hasShown = anyShown;

        return toEmpty;
    }

    private resetFilter() {
        this.options.forEach((option) => {
            option.shown = true;
        });
    }

    /** Highlight. **/

    get highlightedOption(): Option {
        return this._highlightedOption;
    }

    highlight() {
        let option: Option = this.hasShownSelected() ?
            this.getFirstShownSelected() : this.getFirstShown();
        this.highlightOption(option);
    }

    highlightOption(option: Option) {
        this.clearHighlightedOption();

        if (option !== null) {
            option.highlighted = true;
            this._highlightedOption = option;
        }
    }

    highlightNextOption() {
        let shownOptions = this.filtered;
        let index = this.getHighlightedIndexFromList(shownOptions);

        if (index > -1 && index < shownOptions.length - 1) {
            this.highlightOption(shownOptions[index + 1]);
        }
    }

    highlightPreviousOption() {
        let shownOptions = this.filtered;
        let index = this.getHighlightedIndexFromList(shownOptions);

        if (index > 0) {
            this.highlightOption(shownOptions[index - 1]);
        }
    }

    private clearHighlightedOption() {
        if (this.highlightedOption !== null) {
            this.highlightedOption.highlighted = false;
            this._highlightedOption = null;
        }
    }

    private getHighlightedIndexFromList(options: Array<Option>) {
        for (let i = 0; i < options.length; i++) {
            if (options[i].highlighted) {
                return i;
            }
        }
        return -1;
    }

    getHighlightedIndex() {
        return this.getHighlightedIndexFromList(this.filtered);
    }

    /** Util. **/

    get hasShown(): boolean {
        return this._hasShown;
    }

    hasSelected() {
        return this.options.some((option) => {
            return option.selected;
        });
    }

    hasShownSelected() {
        return this.options.some((option) => {
            return option.shown && option.selected;
        });
    }

    private getFirstShown(): Option {
        for (let option of this.options) {
            if (option.shown) {
                return option;
            }
        }
        return null;
    }

    private getFirstShownSelected(): Option {
        for (let option of this.options) {
            if (option.shown && option.selected) {
                return option;
            }
        }
        return null;
    }

    // v0 and v1 are assumed not to be undefined or null.
    static equalValues(v0: Array<string>, v1: Array<string>): boolean {

        if (v0.length !== v1.length) {
            return false;
        }

        let a: Array<string> = v0.slice().sort();
        let b: Array<string> = v1.slice().sort();

        return a.every((v, i) => {
            return v === b[i];
        });
    }
}

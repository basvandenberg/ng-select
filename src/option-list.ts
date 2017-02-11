import {Option} from './option';
import {Diacritics} from './diacritics';

export class OptionList<T> {

    private _options: Array<Option<T>>;

    /* Consider using these for performance improvement. */
    // private _selection: Array<Option>;
    // private _filtered: Array<Option>;
    // private _value: Array<string>;

    private _highlightedOption: Option<T> = null;
    private _hasShown: boolean;

    constructor(options: Array<any>) {

        if (typeof options === 'undefined' || options === null) {
            options = [];
        }

        this._options = options.map((option) => {
            let o: Option<T> = new Option(option.value, option.label);
            if (option.disabled) {
                o.disable();
            }
            return o;
        });

        this._hasShown = this._options.length > 0;
        this.highlight();
    }

    /** Options. **/

    get options(): Array<Option<T>> {
        return this._options;
    }

    getOptionsByValue(value: T): Array<Option<T>> {
        return this.options.filter((option) => {
            return option.value === value;
        });
    }

    /** Value. **/

    get value(): Array<any> | any {
        return this.selection.map((selectedOption) => {
            return selectedOption.value;
        });
    }

    set value(v: Array<any> | any) {
        v = typeof v === 'undefined' || v === null ? [] : v;

        this.options.forEach((option) => {
            option.selected = v.indexOf(option.value) > -1;
        });
    }

    /** Selection. **/

    get selection(): Array<Option<T>> {
        return this.options.filter((option) => {
            return option.selected;
        });
    }

    select(option: Option<T>, multiple: boolean) {
        if (!multiple) {
            this.clearSelection();
        }
        option.selected = true;
    }

    deselect(option: Option<T>) {
        option.selected = false;
    }

    clearSelection() {
        this.options.forEach((option) => {
            option.selected = false;
        });
    }

    /** Filter. **/

    get filtered(): Array<Option<T>> {
        return this.options.filter((option) => {
            return option.shown;
        });
    }

    filter(term: string): boolean {
        let anyShown: boolean = false;

        if (term.trim() === '') {
            this.resetFilter();
            anyShown = this.options.length > 0;
        }
        else {
            this.options.forEach((option) => {
                let l: string = Diacritics.strip(option.label).toUpperCase();
                let t: string = Diacritics.strip(term).toUpperCase();
                option.shown = l.indexOf(t) > -1;

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

    get highlightedOption(): Option<T> {
        return this._highlightedOption;
    }

    highlight() {
        let option: Option<T> = this.hasShownSelected() ?
            this.getFirstShownSelected() : this.getFirstShown();
        this.highlightOption(option);
    }

    highlightOption(option: Option<T>) {
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

    private getHighlightedIndexFromList(options: Array<Option<T>>) {
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

    private getFirstShown(): Option<T> {
        for (let option of this.options) {
            if (option.shown) {
                return option;
            }
        }
        return null;
    }

    private getFirstShownSelected(): Option<T> {
        for (let option of this.options) {
            if (option.shown && option.selected) {
                return option;
            }
        }
        return null;
    }

    // v0 and v1 are assumed not to be undefined or null.
    static equalValues<T>(v0: Array<T>, v1: Array<T>): boolean {

        if (v0.length !== v1.length) {
            return false;
        }

        let a: Array<T> = v0.slice().sort();
        let b: Array<T> = v1.slice().sort();

        return a.every((v, i) => {
            return v === b[i];
        });
    }
}

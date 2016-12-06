import {ReflectiveInjector} from '@angular/core';

import {Option} from './option';
import {DiacriticsService} from './diacritics.service';

export class OptionList {

    private diacriticsService: DiacriticsService;

    private _options: Array<Option>;
    private _selection: Array<Option>;
    private _filtered: Array<Option>;
    private _value: Array<string>;

    private highlightedOption: Option = null;

    constructor(options: Array<{ value: string; label: string; }>) {

        // Inject diacritics service.
        let inj = ReflectiveInjector.resolveAndCreate([DiacriticsService]);
        this.diacriticsService = inj.get(DiacriticsService);

        // Initialize array of option objects.
        this._options = options.map((option) => {
            return new Option(option.value, option.label);
        });

        this.highlight();
    }

    /**************************************************************************
     * Options.
     *************************************************************************/

    get options(): Array<Option> {
        return this._options;
    }

    getOptionsByValue(value: string): Array<Option> {
        return this.options.filter((option) => {
            return option.value === value;
        });
    }

    /**************************************************************************
     * Value.
     *************************************************************************/

    get value(): Array<string> {
        return this.selection.map((selectedOption) => {
            return selectedOption.value;
        });
    }

    set value(v: Array<string>) {
        v = typeof v === 'undefined' || v === null ? [] : v;

        this.options.forEach((option) => {
            option.selected = v.indexOf(option.value) > -1;
        });
    }

    /**************************************************************************
     * Selection.
     *************************************************************************/

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

    /**************************************************************************
     * Filter.
     *************************************************************************/

    get filtered(): Array<Option> {
        return this.options.filter((option) => {
            return option.shown;
        });
    }

    filter(term: string) {

        if (term.trim() === '') {
            this.resetFilter();
        }
        else {
            this.options.forEach((option) => {
                let strip: any = this.diacriticsService.stripDiacritics;

                let l: string = strip.call(null, option.label).toUpperCase();
                let t: string = strip.call(null, term).toUpperCase();

                option.shown = l.indexOf(t) > -1;
            });
        }

        this.highlight();
    }

    resetFilter() {
        this.options.forEach((option) => {
            option.shown = true;
        });
    }

    hasShown() {
        return this.options.some((option) => {
            return option.shown;
        });
    }

    /**************************************************************************
     * Highlight.
     *************************************************************************/

    highlight() {
        this.hasShownSelected() ?
            this.highlightFirstShownSelected() : this.highlightFirstShown();
    }

    private highlightFirstShownSelected() {
        this.clearHighlightedOption();

        for (let option of this._options) {
            if (option.shown && option.selected) {
                this.highlightOption(option);
                break;
            }
        }
    }

    private highlightFirstShown() {
        this.clearHighlightedOption();

        for (let option of this._options) {
            if (option.shown) {
                this.highlightOption(option);
                break;
            }
        }
    }

    private highlightOption(option: Option) {
        option.highlighted = true;
        this.highlightedOption = option;
    }

    private clearHighlightedOption() {
        if (this.highlightedOption !== null) {
            this.highlightedOption.highlighted = false;
            this.highlightedOption = null;
        }
    }
}

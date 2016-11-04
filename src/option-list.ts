import {ReflectiveInjector} from '@angular/core';

import {Option} from './option';
import {DiacriticsService} from './diacritics.service';

export class OptionList {

    private diacriticsService: DiacriticsService;

    private _options: Array<Option>;
    get options(): Array<Option> { return this._options; }

    // TODO add state variables that are updated upon changes, to avoid calling
    // expensive functions all the time...

    constructor(options: Array<{ value: string; label: string; }>) {

        // Inject diacritics service.
        let inj = ReflectiveInjector.resolveAndCreate([DiacriticsService]);
        this.diacriticsService = inj.get(DiacriticsService);

        // Initialize array of option objects.
        this._options = options.map((option) => {
            return new Option(option.value, option.label);
        });
    }

    /**************************************************************************
     * Select.
     *************************************************************************/

    unselectAll() {
        this._options.forEach((option) => {
            option.selected = false;
        });
    }

    hasSelected() {
        return this._options.some((option) => {
            return option.selected;
        });
    }

    hasShownSelected() {
        return this._options.some((option) => {
            return option.shown && option.selected;
        });
    }

    /**************************************************************************
     * Filter.
     *************************************************************************/

    filter(term: string) {

        if (term.trim() === '') {
            this.resetFilter();
        }
        else {
            this._options.forEach((option) => {
                let strip: any = this.diacriticsService.stripDiacritics;

                let l: string = strip.call(null, option.label).toUpperCase();
                let t: string = strip.call(null, term).toUpperCase();

                option.shown = l.indexOf(t) > -1;
            });
        }

        this.highlightFirst();
    }

    resetFilter() {
        this._options.forEach((option) => {
            option.shown = true;
        });
    }

    hasShown() {
        return this._options.some((option) => {
            return option.shown;
        });
    }

    /**************************************************************************
     * Highlight.
     *************************************************************************/

    highlight() {
        this.resetHighlight();

        if (this.hasShownSelected()) {
            this.highlightFirstShownSelected();
        }
        else {
            this.highlightFirst();
        }
    }

    resetHighlight() {
        this._options.forEach((option) => {
            option.highlighted = false;
        });
    }

    private highlightFirstShownSelected() {
        for (let option of this._options) {
            if (option.shown && option.selected) {
                option.highlighted = true;
                break;
            }
        }
    }

    private highlightFirst() {
        for (let option of this._options) {
            if (option.shown) {
                option.highlighted = true;
                break;
            }
        }
    }
}

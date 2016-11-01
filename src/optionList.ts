import {ReflectiveInjector} from '@angular/core';

import {Option} from './option';
import {DiacriticsService} from './diacritics.service';

export class OptionList {

    private diacriticsService: DiacriticsService;
    private _options: Array<Option>;

    constructor() {
        let inj = ReflectiveInjector.resolveAndCreate([DiacriticsService]);
        this.diacriticsService = inj.get(DiacriticsService);
    }

    set options(options: any) {
        this._options = options.map((option) => {
            return new Option(option.value, option.label);
        });
    }

    unselectAll() {
        this._options.forEach((option) => {
            option.selected = false;
        });
    }

    showAll() {
        this._options.forEach((option) => {
            option.shown = true;
        });
    }

    filter(term: string) {

        // Nothing to filter, show all options.
        if (term.trim() === '') {
            this.showAll();
        }

        this._options.forEach((option) => {

            let strip: any = this.diacriticsService.stripDiacritics;

            let l: string = strip.call(null, option.label).toUpperCase();
            let t: string = strip.call(null, term).toUpperCase();

            option.shown = l.indexOf(t) > -1;
        });

        this.highlightFirst();
    }

    highlightFirst() {
        for (let option of this._options) {
            if (option.shown) {
                option.highlighted = true;
                break;
            }
        }
    }
}

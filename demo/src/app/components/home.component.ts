import {Component} from '@angular/core';
import {IOption} from 'ng-select';
import {OptionService} from '../services/option.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class Home {

    countries: Array<IOption> = this.optionService.getCountries();

    constructor(
        private optionService: OptionService
    ) {}
}

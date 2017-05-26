import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IOption } from 'ng-select';

@Injectable()
export class OptionService {

    getOptions(): Array<IOption> {
        return this.clonedOptions();
    }

    loadOptions(): Observable<Array<IOption>> {
        return new Observable((obs) => {
            setTimeout(() => {
                obs.next(this.clonedOptions());
                obs.complete();
            }, 2000);
        });
    }

    private clonedOptions() {
        return OptionService.PLAYER_ONE.map((option) => {
            return {
                value: option.value,
                label: option.label
            }
        });
    }

    private static readonly PLAYER_ONE: Array<IOption> = [
        {value: '0', label: 'Aech'},
        {value: '1', label: 'Art3mis'},
        {value: '2', label: 'Daito'},
        {value: '3', label: 'Parzival'},
        {value: '4', label: 'Shoto'}
    ];
}

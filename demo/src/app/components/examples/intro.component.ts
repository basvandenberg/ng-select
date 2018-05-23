import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'intro',
    templateUrl: 'intro.component.html'
})
export class Intro implements AfterViewInit {

    optionsId: string = 'characters';
    options: Array<IOption> = this.optionService.getCharacters();

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    ngAfterViewInit() {
        hljs.initHighlighting();
        this.initHighlight();
    }

    onToggleChange() {
        if (this.optionsId === 'characters') {
            this.options = this.optionService.getCharacters();
        }
        else if (this.optionsId === 'countries') {
            this.options = this.optionService.getCountries();
        }
        setTimeout(() => {this.initHighlight();});
        //this.optionsJson = `<pre><code class="json">${this.options | json}</code></pre>`;
    }

    private initHighlight() {
        let nodes: NodeList = this.elementRef
            .nativeElement
            .querySelectorAll('.typescript, .html, .css, .json');

        for (let i = 0; i < nodes.length; i++) {
            hljs.highlightBlock(nodes[i]);
        }
    }

    optionsJson: string = '';

    optionServiceTs: string = `
<pre><code class="typescript">import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IOption} from 'ng-select';

@Injectable()
export class OptionService {

    getCharacters(): Array&lt;IOption&gt; {
        return this.cloneOptions(OptionService.PLAYER_ONE);
    }

    loadCharacters(): Observable&lt;Array&lt;IOption&gt;&gt; {
        return this.loadOptions(OptionService.PLAYER_ONE);
    }

    private loadOptions(options: Array&lt;IOption&gt;): Observable&lt;Array&lt;IOption&gt;&gt; {
        return new Observable((obs) =&gt; {
            setTimeout(() =&gt; {
                obs.next(this.cloneOptions(options));
                obs.complete();
            }, 5000);
        });
    }

    private cloneOptions(options: Array&lt;IOption&gt;): Array&lt;IOption&gt; {
        return options.map(option =&gt; ({
            value: option.value,
            label: option.label
        }));
    }

    private static readonly PLAYER_ONE: Array&lt;IOption&gt; = [
        {value: '0', label: 'Aech'},
        {value: '1', label: 'Art3mis'},
        {value: '2', label: 'Daito'},
        {value: '3', label: 'Parzival'},
        {value: '4', label: 'Shoto'}
    ];
}
</code></pre>`;

}

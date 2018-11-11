import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'no-options-found',
    templateUrl: './no-options-found.component.html'
})
export class NoOptionsFound implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    noResultsTerm0: string = '';
    noResultsTerm1: string = '';

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    onNoOptionsFound0(searchTerm: string) {
        this.noResultsTerm0 = searchTerm;
    }

    onNoOptionsFound1(searchTerm: string) {
        this.noResultsTerm1 = searchTerm;
    }

    ngAfterViewInit() {
        hljs.initHighlighting();
        let nodes: NodeList = this.elementRef
            .nativeElement
            .querySelectorAll('.typescript, .html, .css');

        for (let i = 0; i < nodes.length; i++) {
            hljs.highlightBlock(nodes[i]);
        }
    }

    html0: string = `
<pre><code class="html">&lt;div&gt;No options found for: {{noResultsTerm}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    (noOptionsFound)="onNoOptionsFound($event)"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">export class NoOptionsFoundExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();
    noResultsTerm: string = '';

    constructor(
        private optionService: OptionService
    ) {}

    onNoOptionsFound(searchTerm: string) {
        this.noResultsTerm = searchTerm;
    }
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;div&gt;No options found for: {{noResultsTerm}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    [multiple]="true"
    (noOptionsFound)="onNoOptionsFound($event)"&gt;
&lt;/ng-select&gt;
</code></pre>`;


}

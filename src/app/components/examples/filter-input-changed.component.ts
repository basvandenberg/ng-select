import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'filter-input-changed',
    templateUrl: './filter-input-changed.component.html'
})
export class FilterInputChanged implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    searchTerm0: string = '';
    searchTerm1: string = '';

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    onFilterInputChanged0(searchTerm: string) {
        this.searchTerm0 = searchTerm;
    }

    onFilterInputChanged1(searchTerm: string) {
        this.searchTerm1 = searchTerm;
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
<pre><code class="html">&lt;div&gt;Search term: {{searchTerm}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    (filterInputChanged)="onFilterInputChanged($event)"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">export class FilterInputChangedExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();
    searchTerm: string = '';

    constructor(
        private optionService: OptionService
    ) {}

    onFilterInputChanged(searchTerm: string) {
        this.searchTerm = searchTerm;
    }
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;div&gt;Search term: {{searchTerm}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    [multiple]="true"
    (filterInputChanged)="onFilterInputChanged($event)"&gt;
&lt;/ng-select&gt;
</code></pre>`;


}

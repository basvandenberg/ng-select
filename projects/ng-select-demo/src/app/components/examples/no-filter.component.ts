import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'no-filter',
    templateUrl: 'no-filter.component.html'
})
export class NoFilter implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    noFilterThreshold0: number = 6;
    noFilterThreshold1: number = 6;

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    onNoFilterThresholdChange0(e) {
        this.noFilterThreshold0 = parseInt(e.target.value);
    }

    onNoFilterThresholdChange1(e) {
        this.noFilterThreshold1 = parseInt(e.target.value);
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
<pre><code class="html">&lt;span class="select-value"&gt;Hide filter when there are less then&lt;/span&gt;
&lt;select
    (change)="onNoFilterThresholdChange($event)"&gt;
    &lt;option value="5"&gt;5&lt;/option&gt;
    &lt;option value="6" selected="selected"&gt;6&lt;/option&gt;
    &lt;option value="Infinity"&gt;Infinity&lt;/option&gt;
&lt;/select&gt;
&lt;span class="select-value"&gt;options&lt;/span&gt;

&lt;ng-select
    [options]="characters"
    [noFilter]="noFilterThreshold"&gt;
&lt;/ng-select&gt;
</code></pre>`

    ts0: string = `
<pre><code class="typescript">export class NoFilterExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    noFilterThreshold: number = 6;

    constructor(
        private optionService: OptionService
    ) {}

    onNoFilterThresholdChange(e) {
        this.noFilterThreshold = parseInt(e.target.value);
    }
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;span class="select-value"&gt;Hide filter when there are less then&lt;/span&gt;
&lt;select
    (change)="onNoFilterThresholdChange($event)"&gt;
    &lt;option value="5"&gt;5&lt;/option&gt;
    &lt;option value="6" selected="selected"&gt;6&lt;/option&gt;
    &lt;option value="Infinity"&gt;Infinity&lt;/option&gt;
&lt;/select&gt;
&lt;span class="select-value"&gt;options&lt;/span&gt;

&lt;ng-select
    [options]="characters"
    [multiple]="true"
    [noFilter]="noFilterThreshold"&gt;
&lt;/ng-select&gt;
</code></pre>`

}

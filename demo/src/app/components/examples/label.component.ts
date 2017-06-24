import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'select-label',
    templateUrl: './label.component.html'
})
export class Label implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

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
<pre><code class="html">&lt;ng-select
    label="Favorite character"
    [options]="characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'select-label',
    templateUrl: './select-label.component.html'
})
export class LabelExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;ng-select
    label="Favorite characters"
    [options]="characters"
    [multiple]="true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

}

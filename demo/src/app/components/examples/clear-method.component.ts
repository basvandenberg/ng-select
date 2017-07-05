import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'clear-method',
    templateUrl: './clear-method.component.html'
})
export class ClearMethod implements AfterViewInit {

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
    #mySelect
    [options]="characters"&gt;
&lt;/ng-select&gt;
&lt;button
    (click)="mySelect.clear()"&gt;
    Clear selection
&lt;/button&gt;
</code></pre>`;

    html1: string = `
<pre><code class="html">&lt;ng-select
    #mySelect
    [options]="characters"
    [multiple]="true"&gt;
&lt;/ng-select&gt;
&lt;button
    (click)="mySelect.clear()"&gt;
    Clear selection
&lt;/button&gt;
</code></pre>`;

}

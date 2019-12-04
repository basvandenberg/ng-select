import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'opened',
    templateUrl: './opened.component.html'
})
export class Opened implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    isOpen0: boolean = false;
    isOpen1: boolean = false;

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
<pre><code class="html">Dropdown open: {{isOpen}}
&lt;ng-select
    [options]="characters"
    (closed)="isOpen = false"
    (opened)="isOpen = true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">export class OpenedClosedExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    isOpen: boolean = false;

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    html1: string = `
<pre><code class="html">Dropdown open: {{hasFocus}}
&lt;ng-select
    [options]="characters"
    [multiple]="true";
    (blur)="isOpen = false"
    (focus)="isOpen = true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

}

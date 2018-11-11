import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'focus',
    templateUrl: 'focus.component.html'
})
export class Focus implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    hasFocus0: boolean = false;
    hasFocus1: boolean = false;

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
<pre><code class="html">Focus: {{hasFocus}}
&lt;ng-select
    [options]="characters"
    (blur)="hasFocus = false"
    (focus)="hasFocus = true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">export class FocusExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    hasFocus: boolean = false;

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    html1: string = `
<pre><code class="html">Focus: {{hasFocus}}
&lt;ng-select
    [options]="characters"
    [multiple]="true";
    (blur)="hasFocus = false"
    (focus)="hasFocus = true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

}

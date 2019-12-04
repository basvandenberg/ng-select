import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'placeholder',
    templateUrl: 'placeholder.component.html'
})
export class Placeholder implements AfterViewInit {

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
    placeholder="Choose your favorite character"
    [options]="characters"
    [allowClear]="true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    html1: string = `
<pre><code class="html">&lt;ng-select
    placeholder="Choose your favorite characters"
    [options]="characters"
    [mutliple]="true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

}

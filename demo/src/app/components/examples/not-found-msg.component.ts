import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'not-found-msg',
    templateUrl: './not-found-msg.component.html'
})
export class NotFoundMsg implements AfterViewInit {

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

    html: string = `
<pre><code class="html">&lt;ng-select
    notFoundMsg="No characters found"
    [options]="characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

}

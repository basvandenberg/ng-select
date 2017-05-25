import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { IOption } from 'ng-select';
declare var hljs: any;

@Component({
    selector: 'basic',
    templateUrl: 'basic.component.html'
})
export class Basic implements AfterViewInit {

    html: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    characters: Array<IOption> = [
        {value: '0', label: 'Aech'},
        {value: '1', label: 'Art3mis'},
        {value: '2', label: 'Daito'},
        {value: '3', label: 'Parzival'},
        {value: '4', label: 'Shoto'}
    ];

    constructor(
        private elementRef: ElementRef
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
}

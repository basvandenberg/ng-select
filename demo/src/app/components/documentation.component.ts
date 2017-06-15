import {Component, ElementRef} from '@angular/core';
declare var hljs: any;

@Component({
    selector: 'documentation',
    templateUrl: './documentation.component.html'
})
export class Documentation {

    optionTemplate: string = `
<pre><code class="html">&lt;ng-template
    #optionTemplate
    let-option="option"&gt;
    &lt;span class="{{option?.value}}"&gt;-->&lt;span&gt; {{option?.label}}
&lt;/ng-template&gt;
</code></pre>`;

    constructor(
        private elementRef: ElementRef,
    ) {}

    ngAfterViewInit() {
        hljs.initHighlighting();
        let nodes: NodeList = this.elementRef
            .nativeElement
            .querySelectorAll('.typescript, .html, .css, .shell-session');

        for (let i = 0; i < nodes.length; i++) {
            hljs.highlightBlock(nodes[i]);
        }
    }
}

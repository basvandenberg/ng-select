import {Component, ElementRef} from '@angular/core';
declare var hljs: any;

@Component({
    selector: 'faq',
    templateUrl: './faq.component.html'
})
export class Faq {

    question1ts: string = `<pre><code class="typescript"></code></pre>`;
    question1html: string = `<pre><code class="html"></code></pre>`;

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

import {Component, ElementRef} from '@angular/core';
declare var hljs: any;

@Component({
    selector: 'documentation',
    templateUrl: './documentation.component.html'
})
export class Documentation {

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

    iOptionInterface: string = `
<pre><code class="typescript">interface IOption {
    value: string;
    label: string;
    disabled?: boolean;
}
</code></pre>`;

    optionClass: string = `
<pre><code class="typescript">class MyOption implements IOption {
    value: string;
    label: string;
    state: string;
}
</code></pre>`;

    optionTemplate: string = `
<pre><code class="html">&lt;ng-template
    #optionTemplate
    let-option="option"&gt;
    &lt;span class="{{option.state}}"&gt;{{option.label}}&lt;/span&gt;
&lt;/ng-template&gt;
</code></pre>`;

}

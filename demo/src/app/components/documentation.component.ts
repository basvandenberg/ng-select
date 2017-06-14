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
}

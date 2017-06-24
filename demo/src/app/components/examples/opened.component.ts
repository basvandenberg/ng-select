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

    onClosed0() {
        this.isOpen0 = false;
    }

    onOpened0() {
        this.isOpen0 = true;
    }

    onClosed1() {
        this.isOpen1 = false;
    }

    onOpened1() {
        this.isOpen1 = true;
    }

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
<pre><code class="html">&lt;div&gt;Dropdown open: {{isOpen}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    (closed)="onClosed()"
    (opened)="onOpened()"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'opened-closed',
    templateUrl: './opened-closed.component.html'
})
export class OpenedClosedExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    isOpen: boolean = false;

    constructor(
        private optionService: OptionService
    ) {}

    onClosed() {
        this.isOpen = false;
    }

    onOpened() {
        this.isOpen = true;
    }
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;div&gt;Dropdown open: {{hasFocus}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    [multiple]="true";
    (blur)="onBlur()"
    (focus)="onFocus()"&gt;
&lt;/ng-select&gt;
</code></pre>`;

}

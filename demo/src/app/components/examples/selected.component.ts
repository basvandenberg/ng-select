import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'selected',
    templateUrl: './selected.component.html'
})
export class Selected implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    msg0: string = '...';
    msg1: string = '...';

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    onSelected0(option: IOption) {
        this.msg0 = `Selected ${option.label}`;
    }

    onDeselected0(option: IOption) {
        this.msg0 = `Deselected ${option.label}`;
    }

    onSelected1(option: IOption) {
        this.msg1 = `Selected ${option.label}`;
    }

    onDeselected1(option: IOption) {
        this.msg1 = `Deselected ${option.label}`;
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
<pre><code class="html">&lt;div&gt;{{msg}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    [allowClear]="true"
    (selected)="onSelected($event)"
    (deselected)="onDeselected($event)"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'selected-event',
    templateUrl: './selected-event.component.html'
})
export class SelectedEventExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();
    msg: string = '...';

    onSelected(option: IOption) {
        this.msg = \`Selected \${option.label}\`;
    }

    onDeselected(option: IOption) {
        this.msg = \`Deselected \${option.label}\`;
    }

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;div&gt;{{msg}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    [multiple]="true"
    (selected)="onSelected($event)"
    (deselected)="onDeselected($event)"&gt;
&lt;/ng-select&gt;
</code></pre>`;

}

import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'highlight-color',
    templateUrl: './highlight-color.component.html'
})
export class HighlightColor implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    selectedCharacter: string = '3';
    selectedCharacters: Array<string> = ['1', '3'];

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
    highlightColor="#9575cd"
    highlightTextColor="#fff"
    [options]="characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'highlight-color',
    templateUrl: './highlight-color.component.html'
})
export class HighlightColorExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;ng-select
    highlightColor="#9575cd"
    highlightTextColor="#fff"
    [options]="characters"
    [multiple]="true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts1: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'highlight-color',
    templateUrl: './highlight-color.component.html'
})
export class HighlightColorExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;


}

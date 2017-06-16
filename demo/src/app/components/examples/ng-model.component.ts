import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'ngmodel',
    templateUrl: './ng-model.component.html'
})
export class NgModel implements AfterViewInit {

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

    singleHtml: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [(ngModel)]="selectedCharacter"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    singleTs: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

export class NgModelSingle {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    selectedCharacter: string = '3';

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    multipleHtml: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [multiple]="true"
    [(ngModel)]="selectedCharacters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    multipleTs: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

export class NgModelMultiple {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    selectedCharacter: Array&lt;string&gt; = ['1', '3'];

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;
}

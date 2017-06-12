import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'option-template',
    templateUrl: 'option-template.component.html',
    styleUrls: ['option-template.component.scss']
})
export class OptionTemplate implements AfterViewInit {

    html: string = `
<pre><code class="html">&lt;ng-select&gt;
&lt;/ng-select&gt;
</code></pre>`;
    ts: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

export class DisabledOptionsExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    selectedCharacter: string = '';

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    characters: Array<IOption> = this.optionService.getCountries();
    selectedCharacter: string = 'NL';

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
}

import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'focus',
    templateUrl: 'focus.component.html'
})
export class Focus implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    hasFocus0: boolean = false;
    hasFocus1: boolean = false;

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    onBlur0() {
        this.hasFocus0 = false;
    }

    onFocus0() {
        this.hasFocus0 = true;
    }

    onBlur1() {
        this.hasFocus1 = false;
    }

    onFocus1() {
        this.hasFocus1 = true;
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
<pre><code class="html">&lt;div&gt;Focus: {{hasFocus}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    (blur)="onBlur()"
    (focus)="onFocus()"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'focus',
    templateUrl: './focus.component.html'
})
export class FocusExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    hasFocus: boolean = false;

    constructor(
        private optionService: OptionService
    ) {}

    onBlur() {
        this.hasFocus = false;
    }

    onFocus() {
        this.hasFocus = true;
    }
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;div&gt;Focus: {{hasFocus}}&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    [multiple]="true";
    (blur)="onBlur()"
    (focus)="onFocus()"&gt;
&lt;/ng-select&gt;
</code></pre>`;

}

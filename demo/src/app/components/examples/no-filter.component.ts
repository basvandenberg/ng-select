import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'no-filter',
    templateUrl: 'no-filter.component.html'
})
export class NoFilter implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    noFilterThreshold0: number = 6;
    noFilterThreshold1: number = 6;

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
<pre><code class="html">
&lt;div&gt;Hide filter if the number of options is less than:&lt;/div&gt;
&lt;md-button-toggle-group
    [(ngModel)]="noFilterThreshold"&gt;
    &lt;md-button-toggle value="5"&gt;5&lt;/md-button-toggle&gt;
    &lt;md-button-toggle value="6"&gt;6&lt;/md-button-toggle&gt;
    &lt;md-button-toggle value="Infinity"&gt;Infinity&lt;/md-button-toggle&gt;
&lt;/md-button-toggle-group&gt;
&lt;ng-select
    [options]="characters"
    [noFilter]="noFilterThreshold"&gt;
&lt;/ng-select&gt;
</code></pre>`

    ts0: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'no-filter-example',
    templateUrl: './no-filter-example.component.html'
})
export class NoFilterExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    noFilterThreshold: number = 6;

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    html1: string = `
<pre><code class="html">
&lt;div&gt;Hide filter if the number of options is less than:&lt;/div&gt;
&lt;md-button-toggle-group
    [(ngModel)]="noFilterThreshold"&gt;
    &lt;md-button-toggle value="5"&gt;5&lt;/md-button-toggle&gt;
    &lt;md-button-toggle value="6"&gt;6&lt;/md-button-toggle&gt;
    &lt;md-button-toggle value="Infinity"&gt;Infinity&lt;/md-button-toggle&gt;
&lt;/md-button-toggle-group&gt;
&lt;ng-select
    [options]="characters"
    [multiple]="true"
    [noFilter]="noFilterThreshold"&gt;
&lt;/ng-select&gt;
</code></pre>`

    ts1: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'no-filter-example',
    templateUrl: './no-filter-example.component.html'
})
export class NoFilterExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    noFilterThreshold: number = 6;

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

}

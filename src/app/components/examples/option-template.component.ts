import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'option-template',
    templateUrl: 'option-template.component.html',
    styleUrls: ['option-template.component.scss']
})
export class OptionTemplate implements AfterViewInit {

    countries: Array<IOption> = this.optionService.getCountries();
    selectedCountry: string = 'NL';
    selectedCountries: Array<string> = ['BE', 'LU', 'NL'];

    markedCharacters: Array<IOption> = this.optionService.getCharactersWithMarked();

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
<pre><code class="html">&lt;div&gt;Selected option: {{selectedCountry}}&lt;/div&gt;
&lt;ng-select
    placeholder="Select a country"
    [options]="countries"
    [allowClear]="true"
    [(ngModel)]="selectedCountry"&gt;
    &lt;ng-template
        #optionTemplate
        let-option="option"&gt;
        &lt;div class="famfamfam-flags {{option?.value.toLowerCase()}}"&gt;&lt;/div&gt;
        {{option?.label}}
    &lt;/ng-template&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">export class OptionTemplateExample {

    countries: Array&lt;IOption&gt; = this.optionService.getCountries();
    selectedCountry: string = 'NL';

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;div&gt;Selected options: {{selectedCountries}}&lt;/div&gt;
&lt;ng-select
    placeholder="Select countries"
    [options]="countries"
    [multiple]="true"
    [allowClear]="true"
    [(ngModel)]="selectedCountries"&gt;
    &lt;ng-template
        #optionTemplate
        let-option="option"&gt;
        &lt;div class="famfamfam-flags {{option?.value.toLowerCase()}}"&gt;&lt;/div&gt;
        {{option?.label}}
    &lt;/ng-template&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts1: string = `
<pre><code class="typescript">export class OptionTemplateExample {

    countries: Array&lt;IOption&gt; = this.optionService.getCountries();
    selectedCountries: Array&lt;string&gt; = ['BE', 'LU', 'NL'];

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    css: string = `
<pre><code class="css">.famfamfam-flags {
    display: inline-block;
    margin-right: 6px;
    width: 16px;
}
</pre></code>`;

    ts2: string = `
<pre><code class="typescript">export class OptionTemplateExample {

    markedCharacters: Array&lt;any&gt; = this.optionService.getCharacters();

    constructor(
        private optionService: OptionService
    ) {
        this.markedCharacters[0].marked = true;
        this.markedCharacters[1].marked = false;
        this.markedCharacters[2].marked = true;
        this.markedCharacters[3].marked = true;
        this.markedCharacters[4].marked = false;
    }
}
</pre></code>`;

    html2: string = `
<pre><code class="html">&lt;ng-select
    [options]="markedCharacters"&gt;
    &lt;ng-template
        #optionTemplate
        let-option="option"&gt;
        &lt;span&gt;{{option?.label}}&lt;/span&gt;&lt;span *ngIf="option.marked"&gt; *&lt;/span&gt;
    &lt;/ng-template&gt;
&lt;/ng-select&gt;
</code></pre>`;

}

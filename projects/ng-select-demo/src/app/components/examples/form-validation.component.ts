import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'form-validation',
    templateUrl: './form-validation.component.html'
})
export class FormValidation implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    form0: FormGroup;
    form1: FormGroup;

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    ngOnInit() {
        this.form0 = new FormGroup({
            character: new FormControl('', Validators.required)
        });
        this.form1 = new FormGroup({
            character: new FormControl([], Validators.required)
        });
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
<pre><code class="html">Form valid: {{form.valid}}
&lt;form
    novalidate
    [formGroup]="form"&gt;
    &lt;ng-select
        formControlName="character"
        [allowClear]="true"
        [options]="characters"&gt;
    &lt;/ng-select&gt;
    &lt;button
        [disabled]="!form.valid"&gt;
        Submit
    &lt;/button&gt;
&lt;/form&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">export class FormValidationExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();

    constructor(
        private optionService: OptionService
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            character: new FormControl('', Validators.required)
        });
    }
}
</pre></code>`;

    html1: string = `
<pre><code class="html">Form valid: {{form.valid}}
&lt;form
    novalidate
    [formGroup]="form"&gt;
    &lt;ng-select
        formControlName="character"
        [multiple]="true"
        [options]="characters"&gt;
    &lt;/ng-select&gt;
    &lt;button
        [disabled]="!form.valid"&gt;
        Submit
    &lt;/button&gt;
&lt;/form&gt;
</code></pre>`;

    ts1: string = `
<pre><code class="typescript">export class FormValidationExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();

    constructor(
        private optionService: OptionService
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            character: new FormControl([], Validators.required)
        });
    }
}
</pre></code>`;
}

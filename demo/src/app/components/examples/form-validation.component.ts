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
<pre><code class="html">&lt;div&gt;Form valid: {{form.valid}}&lt;/div&gt;
&lt;form
    novalidate
    [formGroup]="form"&gt;
    &lt;ng-select
        formControlName="character"
        [allowClear]="true"
        [options]="characters"&gt;
    &lt;/ng-select&gt;
&lt;/form&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'reactive-form',
    templateUrl: './reaction-form.component.html'
})
export class ReactiveFormExample {

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
<pre><code class="html">&lt;div&gt;Form valid: {{form.valid}}&lt;/div&gt;
&lt;form
    novalidate
    [formGroup]="form"&gt;
    &lt;ng-select
        formControlName="character"
        [allowClear]="true"
        [options]="characters"&gt;
    &lt;/ng-select&gt;
&lt;/form&gt;
</code></pre>`;

    ts1: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'reactive-form',
    templateUrl: './reaction-form.component.html'
})
export class ReactiveFormExample {

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
}

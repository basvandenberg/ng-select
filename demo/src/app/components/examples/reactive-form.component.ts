import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'reactive-form',
    templateUrl: 'reactive-form.component.html'
})
export class ReactiveForm implements AfterViewInit {

    html: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [(ngModel)]="selectedCharacter"&gt;
&lt;/ng-select&gt;
</code></pre>`;
    ts: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

export class BasicExample {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    selectedCharacter: string = '3';

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    characters: Array<IOption>; // = this.optionService.getOptions();
    defaultCharacter: string = '3';

    form: FormGroup;

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            characterSelect: new FormControl(this.defaultCharacter, Validators.required)
        });
        this.optionService.loadCharacters().subscribe((options: Array<IOption>) => {
            this.characters = options;
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
}

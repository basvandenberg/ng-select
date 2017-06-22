import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'disabled',
    templateUrl: './disabled.component.html'
})
export class Disabled implements AfterViewInit {

    characters: Array<IOption> = this.optionService.getCharacters();
    isDisabled0: boolean = true;
    isDisabled1: boolean = true;
    selectedCharacter0: string = '3';
    selectedCharacter1: Array<string> = ['1', '3'];

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

    onToggle0Click() {
        this.isDisabled0 = !this.isDisabled0;
    }

    onToggle1Click() {
        this.isDisabled1 = !this.isDisabled1;
    }

    html0: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [disabled]="isDisabled"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'ng-model',
    templateUrl: './ng-model.component.html'
})
export class NgModelExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();
    isDisabled: boolean = true;

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    html1: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [multiple]="true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts1: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'ng-model',
    templateUrl: './ng-model.component.html'
})
export class NgModelExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();
    isDisabled: boolean = true;

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

}

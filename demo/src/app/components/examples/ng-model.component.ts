import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'ng-model',
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

    html0: string = `
<pre><code class="html">Selected option: {{selectedCharacter}}
&lt;ng-select
    [options]="characters"
    [(ngModel)]="selectedCharacter"&gt;
&lt;/ng-select&gt;
&lt;button
    (click)="selectedCharacter='1'"&gt;
    Select Art3mis
&lt;/button&gt;
</code></pre>`;

    ts0: string = `
<pre><code class="typescript">export class NgModelExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();
    selectedCharacter: string = '3';

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

    html1: string = `
<pre><code class="html">Selected options: {{selectedCharacter}}
&lt;ng-select
    [options]="characters"
    [multiple]="true"
    [(ngModel)]="selectedCharacters"&gt;
&lt;/ng-select&gt;
&lt;button
    (click)="selectedCharacters = ['2', '4']"&gt;
    Select Daito and Shoto
&lt;/button&gt;
</code></pre>`;

    ts1: string = `
<pre><code class="typescript">export class NgModelExample {

    characters: Array&lt;IOption&gt; = this.optionService.getCharacters();
    selectedCharacters: Array&lt;string&gt; = ['1', '3'];

    constructor(
        private optionService: OptionService
    ) {}
}
</pre></code>`;

}

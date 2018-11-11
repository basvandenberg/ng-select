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
&lt;button
    (click)="isDisabled = !isDisabled"&gt;
    &lt;span *ngIf="!isDisabled"&gt;Dis&lt;/span&gt;
    &lt;span *ngIf="isDisabled"&gt;En&lt;/span&gt;
    &lt;span&gt;able&lt;/span&gt;
&lt;/button&gt;
</code></pre>`;

    html1: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [multiple]="true"
    [disabled]="isDisabled"&gt;
&lt;/ng-select&gt;
&lt;button
    (click)="isDisabled = !isDisabled"&gt;
    &lt;span *ngIf="!isDisabled"&gt;Dis&lt;/span&gt;
    &lt;span *ngIf="isDisabled"&gt;En&lt;/span&gt;
    &lt;span&gt;able&lt;/span&gt;
&lt;/button&gt;
</code></pre>`;

}

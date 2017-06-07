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

    html: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [(ngSelect)]="selectedCharacter"
    (blur)="onBlur()
    (focus)="onFocus()"&gt;
&lt;/ng-select&gt;
</code></pre>`;
    ts: string = `
<pre><code class="typescript">import {Component} from '@angular/core;'
import {IOption} from 'ng-select';
import {OptionService} from '../../services/option.service';

export class Focus {

    characters: Array&lt;IOption&gt; = this.optionService.getOptions();
    selectedCharacter: string = '3';
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

    characters: Array<IOption> = this.optionService.getCharacters();
    selectedCharacter: string = '3';
    hasFocus: boolean = false;
    msg: string = '';

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    onBlur() {
        console.log('BLUR!');
        this.hasFocus = false;
        this.msg += 'blur, ';
    }

    onFocus() {
        console.log('focus');
        this.hasFocus = true;
        this.msg += 'focus, ';
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

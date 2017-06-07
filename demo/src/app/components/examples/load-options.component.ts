import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IOption } from 'ng-select';
declare var hljs: any;
import { OptionService } from '../../services/option.service';

@Component({
    selector: 'load-options',
    templateUrl: 'load-options.component.html'
})
export class LoadOptions implements AfterViewInit, OnInit {

    html: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;
    ts: string = `
<pre><code class="typescript">import { Component, OnInit } from '@angular/core;'
import { IOption } from 'ng-select';
import { OptionService } from '../../services/option.service';

export class BasicExample implements OnInit {

    characters: Array&lt;IOption&gt;;
    selectedCharacter: string = '2';

    constructor(
        private optionService: OptionService
    ) {}

    ngOnInit() {
        this.optionService.loadOptions().subscribe((options) => {
            this.characters = options;
        });
    }
}
</pre></code>`;

    characters: Array<IOption>;
    selectedCharacter: string = '2';

    private dataSub: Subscription = null;

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    ngOnInit() {
        this.dataSub = this.optionService.loadCharacters().subscribe((options) => {
            this.characters = options;
        });
    }

    ngOnDestroy() {
        if (this.dataSub !== null) { this.dataSub.unsubscribe(); }
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

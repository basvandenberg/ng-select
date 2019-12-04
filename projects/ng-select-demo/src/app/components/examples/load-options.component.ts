import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOption } from 'ng-select';
declare var hljs: any;
import { OptionService } from '../../services/option.service';

@Component({
    selector: 'load-options',
    templateUrl: 'load-options.component.html'
})
export class LoadOptions implements AfterViewInit, OnInit {

    characters: Array<IOption>;
    selectedCharacter: string = '3';
    timeLeft: number = 5;

    private dataSub: Subscription = null;

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    ngOnInit() {
        this.runTimer();
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

    runTimer() {
        let timer = setInterval(() => {
            this.timeLeft -= 1;
            if (this.timeLeft === 0) {
                clearInterval(timer);
            }
        }, 1000);
    }

    html: string = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [(ngModel)]="selectedCharacter"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    ts: string = `
<pre><code class="typescript">export class LoadOptionsExample implements OnInit {

    characters: Array&lt;IOption&gt;;
    selectedCharacter: string = '3';

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

}

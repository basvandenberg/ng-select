import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {IOption} from 'ng-select';
declare var hljs: any;
import {OptionService} from '../../services/option.service';

@Component({
    selector: 'load-options-async-pipe',
    templateUrl: 'load-options-async-pipe.component.html'
})
export class LoadOptionsAsyncPipe implements AfterViewInit, OnInit {

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
    selectedCharacter: string;

    constructor(
        private optionService: OptionService
    ) {}

    ngOnInit() {
        this.optionService.loadOptions().subscribe((options) => {
            this.characters = options;
            this.selectedCharacter = '2';
        });
    }
}
</pre></code>`;

    charactersObservable: Observable<Array<IOption>>;
    selectedCharacter: string;

    constructor(
        private elementRef: ElementRef,
        private optionService: OptionService
    ) {}

    ngOnInit() {
        this.charactersObservable = this.optionService.loadCharacters();
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

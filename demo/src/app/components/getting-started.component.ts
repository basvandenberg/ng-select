import {Component, ElementRef} from '@angular/core';
declare var hljs: any;

@Component({
    selector: 'getting-started',
    templateUrl: './getting-started.component.html'
})
export class GettingStarted {

    installNpm: string = `<pre><code class="shell-session">$ npm install --save ng-select</code></pre>`;
    installYarn: string = `<pre><code class="shell-session">$ yarn add ng-select</code></pre>`;

    moduleTypescript: string = `<pre><code class="typescript">import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SelectModule} from 'ng-select';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
        SelectModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}</code></pre>`;

    componentTemplate: string = `<pre><code class="html">&lt;ng-select
    [options]="myOptions"&gt;
&lt;/ng-select&gt;</pre></code>`;

    componentClass: string = `<pre><code class="typescript">import {Component} from '@angular/core';
import {IOption} from 'ng-select';

@Component({
    selector: 'my-example',
    templateUrl: 'my-example.component.html'
})
export class MyExampleComponent {

    myOptions: Array&lt;IOption&gt; = [
        {label: 'Belgium', value: 'BE'},
        {label: 'Luxembourg', value: 'LU'},
        {label: 'Netherlands', value: 'NL'}
    ];
}</code></pre>`;

    constructor(
        private elementRef: ElementRef,
    ) {}

    ngAfterViewInit() {
        hljs.initHighlighting();
        let nodes: NodeList = this.elementRef
            .nativeElement
            .querySelectorAll('.typescript, .html, .css, .shell-session');

        for (let i = 0; i < nodes.length; i++) {
            hljs.highlightBlock(nodes[i]);
        }
    }
}

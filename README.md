# Angular 2 select component

A native select component for angular 2, based on the select2 JQuery plugin. The
component is currently in beta, so please don't use it for production yet. See
the angular2-select page for example uses, or try it out with this [plunker].

- [Getting started](#getting-started)
- [Input properties](#input-properties)
- [Output events](#output-events)
- [Methods](#methods)
- [Use in forms](#use-in-forms)
- [Develop](#develop)

## Demo

Try it out with this [plunker] or by cloning [angular2-select-demo].


## Getting started

### Install

```
npm install --save angular2-select
```

### Configuration

#### Angular cli

After installation, no additional configuration is needed. Import the
`SelectModule` and define it as one of the imports of your application module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SelectModule} from 'angular2-select';

import {AppComponent} from './app.component';

@NgModule({
    imports: [
        BrowserModule
        SelectModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
```

#### Systemjs

This is not yet tested for the beta version!

In `systemjs.config.js` add `angular2-select` to map and package:

```javascript
var map = {
	// others...,
	'angular2-select': 'node_modules/angular2-select'
};

var packages = {
	// others...,
	'angular2-select': {
		main: 'index.js',
		defaultExtension: 'js'
	}
};
```

## Input properties

| Name          | Type      | Default               | Description      |
| ------------- | --------- | --------------------- | ---------------- |
| allowClear    | boolean   | false                 | Only applies to single select. If set to true, a clickable clear selection cross is shown. |
| disabled      | boolean   | false                 | If set to true, the select component is disabled. |
| multiple      | boolean   | false                 | If set to true, the select component is multi-select, otherwise single select. |
| notFoundMsg   | string    | "No results found"    | The message shown if no options are found for the current filter input value. |
| placeholder   | string    | ""                    | Placeholder text that is shown if no options are selected.

## Output events

| Name          | Value                 | Description   |
| ------------- | --------------------- | ------------- | 
| opened        | null                  |               |
| closed        | null                  |               |
| selected      | option                |               |
| deselected    | option or [option]    |               |

## Methods

| Name          | Parameters            | Description   |
| ------------- | --------------------- | ------------- |
| open          | -                     |               |
| close         | -                     |               |
| clear         | -                     |               |
| select        | value: string         |

## Use in forms

TODO Move to examples

The component can be used in an angular 2 form, just like you would use regular
`input` or `select` elements (the `angular2-select` component implements the
[ControlValueAccessor] interface).

```typescript
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'my-app',
    template: `
<h1>Angular 2 select demo app</h1>
<form
    [formGroup]="form">
    <ng-select
        [options]="options"
        placeholder="Select one"
		multiple="false"
        [allowClear]="true"
        formControlName="select">
    </ng-select>
</form>
<hr>
<div>
    Selected option id: {{form.value.select}}
</div>`
})

export class App implements OnInit {

    form: FormGroup;

    options = [];
        
    constructor() {
        this.options = [
            {
                value: 'a',
                label: 'Alpha'
            },
            {
                value: 'b',
                label: 'Beta'
            },
            {
                value: 'c',
                label: 'Gamma'
            }
        ];
    }

    ngOnInit() {
        this.form = new FormGroup({});
        this.form.addControl('select', new FormControl(''));
    }
}
```

## Develop

Clone or fork the repository and run:

```
yarn install
gulp build
```

[plunker]: https://plnkr.co/edit/JcG8uO9nIfSGMEKdLf0Y?p=preview
[angular2-select-demo]: https://github.com/basvandenberg/angular2-select-demo
[ControlValueAccessor]: https://angular.io/docs/ts/latest/api/common/index/ControlValueAccessor-interface.html
[issue]: https://gitlab.com/pushrocks/beautylog/issues/7
[beautylog]: https://gitlab.com/pushrocks/beautylog


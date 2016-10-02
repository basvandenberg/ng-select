# Angular 2 select component

A native select component for angular 2, based on the select2 JQuery plugin. The
component is currently in alpha, so breaking changes are to be expected.

- [Demo](#demo)
- [Getting started](#getting-started)
- [Input properties](#input-properties)
- [Events](#events)
- [Use in forms](#use-in-forms)
- [Not supported](#not-supported)
- [Develop](#develop)

## Demo

Try it out with this [plunker] or by cloning [angular2-select-demo].


## Getting started

### Install

```
npm install --save angular2-select
```

### Configuration

#### Systemjs

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

### Usage

Import the `SelectModule` and define it as one of the imports of your
application module:

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from 'angular2-select';

import {AppComponent} from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
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


Add the following HTML to the component template in which you want to use the
select component:

```html
<ng-select
	[options]="options">
</ng-select>
```

Within the component class you have to set the list of select options. This must
be a list of objects, with for each object a value (option identifier) and a
label (which the user sees in the select drop down).

```typescript
export class YourComponent {

    options = [
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
```


## Input properties

Next to the obligatory `options` property, the `ng-select` tag supports the
following optional properties:

```html
<ng-select
	[options]="options"
	multiple="true"
    placeholder="Select an option"
    [allowClear]="true"
    theme="default">
</ng-select>

```

The optional properties can also be bound to a variable in the component's
class.

```html
<ng-select
	[options]="options"
	multiple="true"
    [placeholder]="placeholder"
    [allowClear]="canClearSelect"
    theme="default">
</ng-select>

```

```typescript
export class YourComponent implements {

    placeholder: string = 'Select an option';
    canClearSelect: boolean = true;
    // ...
}
```

Optional properties will be set to their default value if they are not defined
in the `ng-select` tag.

### multiple

*default: 'false'*

A boolean to choose between single and multi-select.

### placeholder

*default: ''*

The placeholder value is shown if no option is selected.

### allowClear

*default: 'false'*

If set to true, a button with a cross that can be used to clear the currently
selected option is shown if an option is selected.

### theme

*default: 'default'*

Currently the original `select2` CSS is used, which allows you to select between
to themed looks, `default` and `classic`.


## Events

The angular2-select module emits output events to inform parent components that
the select dropdown is `opened` or `closed`, and that an item is `selected` or
`deselected`. 

A parent component can bind to these events with the output properties `opened`, 
`closed`, `selected`, and `deselected`:

```html
<ng-select
	[options]="options"
	multiple="true"
    (opened)="onSelectOpened()"
    (closed)="onSelectClosed()"
    (selected)="onSelected($event)"
    (deselected)="onDeselected($event)">
</ng-select>

```

With the corresponding event handlers defened in the parent component's class:

```typescript
onSelectOpened() {
    console.log('Select dropdown opened.');
}

onSelectClosed() {
    console.log('Select dropdown closed.');
}

onSelected(item) {
    console.log('Selected: ' + item.value + ', ' + item.label);
}

onDeselected(item) {
    console.log('Deselected: ' + item.value + ', ' + item.label);
}
```

The (de)selected item is provided as parameter to the `selected` and
`deselected` events. This is an object with properties `value` and `label`, the
same as the objects in the list of select `options` that was provided as input
for the module.

The `select` event is emitted by both the single and multiple select, the
`deselect` event is only submitted by the multiple select.


## Use in forms

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


## Not supported

Select2 features that are currently not supported are:

- Tests
- Option groups
- Loading remote data
- Disabled mode
- Disabled results
- Multiselect
    - Limit the number of selections
    - Tagging
- Localization, RTL
- Themes
- Templates


## Develop

Clone or fork the repository and run:

```
npm install
gulp build
```

[plunker]: https://plnkr.co/edit/JcG8uO9nIfSGMEKdLf0Y?p=preview
[angular2-select-demo]: https://github.com/basvandenberg/angular2-select-demo
[ControlValueAccessor]: https://angular.io/docs/ts/latest/api/common/index/ControlValueAccessor-interface.html
[issue]: https://gitlab.com/pushrocks/beautylog/issues/7
[beautylog]: https://gitlab.com/pushrocks/beautylog


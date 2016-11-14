# Angular 2 select component

A native select component for angular 2, based on the select2 JQuery plugin. The
component is currently in alpha, so breaking changes are to be expected.

- [Demo](#demo)
- [Getting started](#getting-started)
- [Use with ngModel](#use-with-ngmodel)
- [Use in reactive forms](#use-in-reactive-forms)
- [Input properties](#input-properties)
- [Events](#events)
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

#### Angular cli

After installation, no additional configuration is needed. The `SelectModule`
can be added to the list of imports of your module. See below for examples.

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



## Use with `ngModel`

Import the `SelectModule` and define it as one of the imports of your
application module. Import the `FormsModule` so that you can use `ngModel`:

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'angular2-select';

import {AppComponent} from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
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

Add the select component to one of your templates:

```html
<ng-select
	[multiple]="true"
	[options]="myOptions"
    [(ngModel)]="mySelectValue">
</ng-select>
```

In the corresponding component class, set the list of options (`myOptions`) and
set up the two-way data binding by defining `mySelectValue`.

```typescript
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'my-select',
    templateUrl: 'my-select.component.html'
})

export class App implements OnInit {

    options: Array<any>;
    mySelectValue: Array<string>; // Array of strings for multi select, string for single select.
        
    ngOnInit() {
        this.options = [
            {value: 'a', label: 'Alpha'},
            {value: 'b', label: 'Beta'},
            {value: 'c', label: 'Gamma'},
        ];
        this.mySelectValue = ['b', 'c'];
    }
}
```

In this example the last two options are selected in `ngOnInit` by initializing
the `mySelectValue` to `['b', 'c']`. Because of the two-way data binding,
updating the `mySelectValue` will cause the selection in your view to be 
updated.



## Use in reactive forms

The component can be used in an angular 2 form, just like you would use regular
`input` or `select` elements (the `angular2-select` component implements the
[ControlValueAccessor] interface).

For use in reactive forms, import the `ReactiveFormsModule` and `SelectModule`
and add both to the list of imports of your application module:

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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

Add a form with the select component to your template:

```html
<form
    [formGroup]="form">
    <ng-select
        [options]="myOptions"
		[multiple]="true"
        formControlName="mySelect">
    </ng-select>
</form>
<hr>
<div>
    Selected option id: {{form.value.mySelect}}
</div>`
```

Within the corresponding component set the list of select options
(`myOptions`). 


```typescript
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'my-select',
    templateUrl: 'my-select.component.html'
})

export class App implements OnInit {

    form: FormGroup;
    myOptions = [];

    ngOnInit() {
        this.myOptions = [
            {value: 'a', label: 'Alpha'},
            {value: 'b', label: 'Beta'},
            {value: 'c', label: 'Gamma'},
        ];
        this.form = new FormGroup({});
        this.form.addControl('mySelect', new FormControl(['b', 'c']));
    }
}
```



## Input properties

Next to the obligatory `options` property, the `ng-select` tag supports the
following optional properties:

```html
<ng-select
	[options]="options"
	[multiple]="multiple"
    [placeholder]="myPlaceholderText"
    [allowClear]="canClearSelect">
</ng-select>

```

```typescript
// ...

export class YourComponent implements {

    options: Array<any> = [
        {value: 'a', label: 'Alpha'},
        {value: 'b', label: 'Beta'},
        {value: 'c', label: 'Gamma'},
    ];
    multiple: boolean = true;
    myPlaceholderText: string = 'Select an option';
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



## Events

The angular2-select module emits output events to inform parent components that
the select drop down is `opened` or `closed`, and that an item is `selected` or
`deselected`. 

A parent component can bind to these events with the output properties `opened`, 
`closed`, `selected`, and `deselected`:

```html
<ng-select
	[options]="options"
	[multiple]="true"
    (opened)="onSelectOpened()"
    (closed)="onSelectClosed()"
    (selected)="onSelected($event)"
    (deselected)="onDeselected($event)">
</ng-select>

```

With the corresponding event handlers defined in the parent component's class:

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

[plunker]: https://plnkr.co/edit/PeGmCwVmi1X8Ag7LgnPT?p=preview
[angular2-select-demo]: https://github.com/basvandenberg/angular2-select-demo
[ControlValueAccessor]: https://angular.io/docs/ts/latest/api/common/index/ControlValueAccessor-interface.html
[issue]: https://gitlab.com/pushrocks/beautylog/issues/7
[beautylog]: https://gitlab.com/pushrocks/beautylog


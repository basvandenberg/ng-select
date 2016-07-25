# Angular 2 select component

A native select component for angular 2, based on the select2 JQuery plugin. The
component is currently in alpha, so breaking changes are to be expected.

## Demo

Try it out with this [plunker].

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

To use the select components in one of your components, import the
`SELECT_DIRECTIVES` with:

```typescript
import {SELECT_DIRECTIVES} from 'angular2-select';
```

Add the following HTML to your component's template to include the select
component:

```html
<ng-select
	[options]="options">
</ng-select>
```

And add the `SELECT_DIRECTIVES` to the list of directives.

Within your component's class you can set the list of select options. This must
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

## Parameters

Next to the obligatory `options` parameter, the `ng-select` tag supports the
following optional parameters:

```html
<ng-select
	[options]="options"
    placeholder="Select an option"
    allowClear="true"
    theme="default">
</ng-select>

```

The optional parameters can also be bound to a variable in the component's
class.

```html
<ng-select
	[options]="options"
    [placeholder]="placeholder"
    [allowClear]="canClearSelect"
    theme="default">
</ng-select>

```

``` typescript
export class YourComponent implements {

    placeholder: string = 'Select an option';
    canClearSelect: boolean = true;
    // ...
}
```

Optional parameters will be set to their default value if they are not defined
in the `ng-select` tag.

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

## Not yet supported

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

**IMPORTANT** Building with `gulp build` currently only works with node version
6, due to an [issue] in one of `gulp-typescript`'s dependencies ([beautylog]).

[plunker]: https://plnkr.co/edit/JcG8uO9nIfSGMEKdLf0Y?p=preview
[issue]: https://gitlab.com/pushrocks/beautylog/issues/7
[beautylog]: https://gitlab.com/pushrocks/beautylog


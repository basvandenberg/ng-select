# Angular 2 select component

A native select component for angular 2, based on the select2 JQuery plugin.

## Install

```
npm install --save angular2-select
```

## Configuration

### Systemjs

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

## Usage

```typescript
import {SELECT_DIRECTIVES} from 'angular2-select';
```


```html
<ng-select
	[options]="options">
</ng-select>
```

Adding `SELECT_DIRECTIVES` to the list of directives.

```typescript
export class AppComponent implements {

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

## Develop

Clone or fork the repository and run:

```
npm install
gulp build
```

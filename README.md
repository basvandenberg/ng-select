# Angular 2 select component

A native select component for angular 2, based on the select2 JQuery plugin.
The component is currently in alpha, so please don't use it for production yet.
See the [angular2-select] page for example uses.

- [Getting started](#getting-started)
- [Input properties](#input-properties)
- [Output events](#output-events)
- [Methods](#methods)
- [Use in forms](#use-in-forms)
- [Develop](#develop)

## Getting started

### Install

For npm users:
```
npm install --save angular2-select
```

For yarn users:
```
yarn add angular2-select
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
export class AppModule {}
```

#### Systemjs

*Not yet tested for the beta version.*

In `systemjs.config.js` add `angular2-select` to map and package:

```javascript
var map = {
	'angular2-select': 'node_modules/angular2-select'
};

var packages = {
	'angular2-select': {
		main: 'index.js',
		defaultExtension: 'js'
	}
};
```

## Input properties

| Name          | Type      | Default               | Description      |
| ------------- | --------- | --------------------- | ---------------- |
| options       | `Array&lt;option\*&gt;`|          | Required list of option objects. |
| allowClear    | `boolean`   | `false`             | Only applies to single select. If set to true, a clickable clear selection cross is shown. |
| disabled      | `boolean`   | `false`             | If set to true, the select component is disabled. |
| highlightColor| `string`    | `#2196f3`           | Background color of highlighted option. |
| highlightTextColor | `string` | `#fff`            | Text color of highlighted option. |
| multiple      | `boolean`   | `false`             | If set to true, the select component is multi-select, otherwise single select. |
| noFilter      | `number`    | `0`                 | Filter is hidden if the number of options is less than the given number. |
| notFoundMsg   | `string`    | `"No results found"`| The message shown if no options are found for the current filter input value. |
| placeholder   | `string`    | `""`                | Placeholder text that is shown if no options are selected.

\* Object with value and label (`{value: string, label: string}`)

## Output events

| Name          | Value                 | Description   |
| ------------- | --------------------- | ------------- | 
| opened        | `null`                  | If the select dropdown is opened. |
| closed        | `null`                  | If the select dropdown is closed. |
| selected      | `option`\*              | If an options is selected, providing the selected option. |
| deselected    | `option`\* or `[option]`| If one or more options are deselected, providing the selected option(s). |

\* Object with value and label (`{value: string, label: string}`)

## Methods

| Name          | Parameters            | Description   |
| ------------- | --------------------- | ------------- |
| open          | -                     | Not yet supported.                        |
| close         | -                     | Not yet supported.                        |
| clear         | -                     | Deselects all selected options.           |
| select        | `value: string`       | Selects the option with the given value.  |

## Develop

Global installation of `gulp` and `yarn` are required for development. Clone or
fork the repository and run:

```
yarn install
gulp build
```

[angular2-select]: https://basvandenberg.github.io/angular2-select
[plunker]: https://plnkr.co/edit/JcG8uO9nIfSGMEKdLf0Y?p=preview


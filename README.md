# Select component for angular
[![npm version](https://badge.fury.io/js/ng-select.svg)](https://badge.fury.io/js/ng-select)
[![Build Status](https://travis-ci.org/basvandenberg/ng-select.svg?branch=master)](https://travis-ci.org/basvandenberg/ng-select)

A select component for angular, based on the select2 JQuery plugin. See the
[ng-select] page for example uses or try it with this [plunker].

*Disclaimer*: This is a beta version, not yet intended for production release.

-------------------------------------------------------------------------------
***IMPORTANT NOTICE***

*The angular [press kit](https://angular.io/presskit.html) states that 3rd
party projects should avoid the use of version numbers in their names. The name
of this project is therefore changed from angular2-select to ng-select (since
angular-select was not available on npm anymore).*

*The npm package `angular2-select` will be deprecated, the upcoming beta.4
version will only be available as `ng-select`. Therefore, for upgrading to
beta.4 (which is not yet released) you will need to reinstall the npm package:*
```
npm uninstall --save angular2-select
npm install --save ng-select
```
*And your module import needs to be changed to:*
```
import {SelectModule} from 'ng-select';
```
-------------------------------------------------------------------------------

- [Getting started](#getting-started)
- [Input properties](#input-properties)
- [Output events](#output-events)
- [Methods](#methods)
- [Limitations](#limitations)
- [Develop](#develop)

## Getting started

### Install

For npm users:
```
npm install --save ng-select
```
For yarn users:
```
yarn add ng-select
```

### Configuration

#### Angular cli

After installation, no additional configuration is needed. Import the
`SelectModule` and define it as one of the imports of your application module:

```typescript
import {NgModule} from '@angular/core';
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
export class AppModule {}
```

#### Systemjs

In `systemjs.config.js` add `ng-select` to map and package:

```javascript
var map = {
	'ng-select': 'node_modules/ng-select'
};

var packages = {
	'ng-select': {
		main: 'index.js',
		defaultExtension: 'js'
	}
};
```

## Input properties

| Name               | Type              | Default               | Description                                                                                |
| ------------------ | ----------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| options            | `Array<IOption>`\* |                      | List of select option.                                                                     |
| multiple           | `boolean`         | `false`               | If set to true, the select component is multi-select, otherwise single select.             |
| allowClear         | `boolean`         | `false`               | Only applies to single select. If set to true, a clickable clear selection cross is shown. |
| disabled           | `boolean`         | `false`               | If set to true, the select component is disabled.                                          |
| highlightColor     | `string`          | `#2196f3`             | Background color of highlighted option.                                                    |
| highlightTextColor | `string`          | `#fff`                | Text color of highlighted option.                                                          |
| label              | `string`          | ''                    | Label above select container. |
| noFilter           | `number`          | `0`                   | Filter is hidden if the number of options is less than the given number.                   |
| notFoundMsg        | `string`          | `"No results found"`  | The message shown if no options are found for the current filter input value.              |
| placeholder        | `string`          | `""`                  | Placeholder text that is shown if no options are selected.
| filterPlaceholder  | `string`          | `""`                  | Placeholder text that is shown on the filter input (**single select only**).

\* Object that implements the IOption interface (`{value: string, label: string}`)

## Output events

| Name          | Value                       | Description                                                              |
| ------------- | --------------------------- | ------------------------------------------------------------------------ |
| opened        | `null`                      | If the select drop down is opened.                                       |
| closed        | `null`                      | If the select drop down is closed.                                       |
| selected      | `IOption`\*                 | Returns selected option object.                                          |
| deselected    | `IOption`\* or `[IOption]`\*| Returns deselected option object(s).                                     |
| noOptionsFound| `string`                    | Returns search term if filter does not return any results.               |

\* Object that implements the IOption interface (`{value: string, label: string}`)

## Methods

| Name          | Parameters            | Description                             |
| ------------- | --------------------- | --------------------------------------- |
| open          | -                     | Open the select drop down.              |
| close         | -                     | Close the select drop down.             |
| clear         | -                     | Deselect all selected options.          |
| select        | `value: string`       | Select the option with the given value. |

## Limitations

This component has limitations, which will be handled in future versions.
Currently the goal is to work towards a stable 1.0 release version.

### Scalability

The component is currently not suitable for large numbers of options. If the
dropdown is opened, all options are added to the DOM, which will cause browser
performance issues for large numbers of options. Therefore, if you have more
that a few hundred options, then you will be better of with another solution.

### Custom option view (using an option template)

In version 1.0 it will only be possible to define an option label that will be
shown in the select dropdown. Customizing the option's view (adding an icon for
example) is not possible. Also grouping of options is not supported.

## Develop

Global installations of `gulp` and `yarn` are required for development. Clone
or fork the repository and run:

```
yarn install
gulp build
```

[ng-select]: https://basvandenberg.github.io/ng-select
[plunker]: https://plnkr.co/edit/vxwV6zxEwZGVUVR5V6tg?p=preview
[changelog]: https://github.com/basvandenberg/ng-select/releases

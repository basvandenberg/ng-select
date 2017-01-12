# Changelog

<a name="1.0.0-beta.2"></a>
## [1.0.0-beta.2](https://github.com/basvandenberg/angular2-select/compare/1.0.0-beta.1...1.0.0-beta.2) (2017-01-12)

### Bug fixes

- Single select returns value as string instead of array (#66).


<a name="1.0.0-beta.1"></a>
## [1.0.0-beta.1](https://github.com/basvandenberg/angular2-select/compare/1.0.0-beta.0...1.0.0-beta.1) (2017-01-08)

### Bug fixes

- Removed accidentally included `console.log`'s in published npm package. (#64).


<a name="1.0.0-beta.0"></a>
## [1.0.0-beta.0](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.12...1.0.0-beta.0) (2017-01-07)

### Breaking changes

- Changed styling, Sass stylesheet for select and dropdown component instead of the original select2 CSS file.

### Features

- Set background color and text color of highlighted option (#61).
- Set width of select component with `ngStyle` (#59).
- Hide filter if number of options is less than given number (#44).
- Set custom text for 'No results found' (#9).
- Functions `open` and `close` to open/close drop down from ts (#43).
- Disable select component.
- Clear selection function.

### Improvements

- Switched from using [npm](https://www.npmjs.com/) to [yarn](https://yarnpkg.com/) for package management.
- Call `onTouched` when focus on select component (#24).
- Added demo page with examples.
- Simplified HTML structure with more intuitive classes.
- Moved logic to separate option and option-list classes.

### Bug fixes

- Greyed out placeholder text for singe select (#48).
- Close all drop downs on click outside, close drop down when pressing tab key (#58).



<a name="1.0.0-alpha.12"></a>
## [1.0.0-alpha.12](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.11...1.0.0-alpha.12)

### Breaking changes

- The method `clearSelected` is changed to `clear`.

### Bug fixes

- Trigger `deselected` event on clear single select click (#23).
- Typo fixes.



<a name="1.0.0-alpha.11"></a>
## [1.0.0-alpha.11](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.10...1.0.0-alpha.11)

- Update to Angular 2.1.0.



<a name="1.0.0-alpha.10"></a>
## [1.0.0-alpha.10](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.9...1.0.0-alpha.10)

### Bug fixes

- Fix errors in package.json and tsconfig.json ([#18] (https://github.com/basvandenberg/angular2-select/issues/18)).
- Fix empty value multi-select, so that required validator works ([#21] (https://github.com/basvandenberg/angular2-select/issues/21)).
- Fix setting value of single select ([#19] (https://github.com/basvandenberg/angular2-select/issues/19)).

### Improvements

- Set ViewEncapsulation to None to enable style override ([#16] (https://github.com/basvandenberg/angular2-select/issues/16)). 



<a name="1.0.0-alpha.9"></a>
## [1.0.0-alpha.9](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.8...1.0.0-alpha.9) (2016-10-05)

### Bug fixes

- Fix gulp watch task.
- Fix gulp build taks.
- Fix tsconfig, and added types to compilerOptions.
- Fix AoT build, made some variables public.



<a name="1.0.0-alpha.8"></a>
## [1.0.0-alpha.8](https://github.com/basvandenberg/angular2-select/compare/1.0.0-alpha.7...1.0.0-alpha.8) (2016-10-01)

### Features

- Added ngc/AoT support ([#11] (https://github.com/basvandenberg/angular2-select/pull/11)).

### Bug fixes

- Fix clear selection using form control's setValue function ([#5] (https://github.com/basvandenberg/angular2-select/issues/5)).
- Update current selection when option list is changed ([#6] (https://github.com/basvandenberg/angular2-select/issues/6)).
- Prevent javascript error when list of options is empty ([#7] (https://github.com/basvandenberg/angular2-select/issues/7)).
- Prevent javascript error when clicking the 'No results found' option ([#8] (https://github.com/basvandenberg/angular2-select/issues/8)).


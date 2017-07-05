# Changelog



<a name="1.0.0-beta.6"></a>
## [1.0.0-beta.6](https://github.com/basvandenberg/ng-select/compare/1.0.0-beta.5...1.0.0-beta.6) (2017-07-05)

### Features
- New ng-select web site.
- Blur and focus output events (#170).
- Option template for customizing option layout/styling (#92).

### Bug fixes
- Stop clearing the (single select) filter input in the drop down (#162).
- Enable/disable filter (based on noFilter) if list of options changes (#146).
- Skip disabled options when navigating option list with up/down keys (#182).
- Set value, also if there is no option with this value present yet, this
  prevents having to use setTimeout when setting a value directly after
  setting/updating options (#169, #130).
- Call the onChange only for user (de)select actions (#176).
- Fix missing placeholder (multiple select) if filter is hidden (#110).
- Prevent drop down to close when clicking disabled option (#156).
- Update filter input width when closing drop down (#198).
- Show pointer instead of text cursor when hovering placeholder in multiple 
  select (#199).
- Added change detection for placeholder property (#192).
- Fixed placeholder initially not visible in multi select (#193).



<a name="1.0.0-beta.5"></a>
## [1.0.0-beta.5](https://github.com/basvandenberg/ng-select/compare/1.0.0-beta.4...1.0.0-beta.5) (2017-03-29)

Fixes for use with angular4.

### Bug fixes
- Make view properties public, fix for angular4 (#144, #145).
- Prevent changed after check error in angular4 (#142, #143).



<a name="1.0.0-beta.4"></a>
## [1.0.0-beta.4](https://github.com/basvandenberg/ng-select/compare/1.0.0-beta.3...1.0.0-beta.4) (2017-03-12)

### Features

- Add `filterPlaceholder` input to set the filter placeholder (#121, #124).
- Add `label` input to show persistent label above select container (#106).

### Bug fixes

- Re-enable AoT compilation (#113).

### Improvements

- Enable import of SelectComponent and IOption interface (#118).
- Selected and deselected events return original option object.
- Disable autocomplete for filter inputs (#126).
- The NoOptionsFound output event returns filter term instead of null (#109).
- Setup unit testing.



<a name="1.0.0-beta.3"></a>
## [1.0.0-beta.3](https://github.com/basvandenberg/ng-select/compare/1.0.0-beta.2...1.0.0-beta.3) (2017-02-11)

### Breaking changes

- Empty multi-select returns empty array as value instead of empty string (#104).

### Features

- Trigger `noOptionsFound` event if no options found after filter (#73).

### Bug fixes

- Same placeholder styling single and multiple select (#67).
- Prevent selecting option if filter shows 'No results found' (#74).
- Update value after deselecting options that are not present in updated list
  of options (#75).
- Fixed test if new value is different from current value (#76).
- Fixed key handlers, prevent selecting multi-select option when pressing space
  key (#78).
- Hide clear button when nothing is selected (#90).
- Remove padding above option list if filter is disabled (#98).

### Improvements

- Throw `TypeError` when trying to set a non-string or non-Array value.
- For empty multiselect, return empty array instead of empty string (#104).
- Don't force color/highlight styles when not directly set (#97).



<a name="1.0.0-beta.2"></a>
## [1.0.0-beta.2](https://github.com/basvandenberg/ng-select/compare/1.0.0-beta.1...1.0.0-beta.2) (2017-01-12)

### Bug fixes

- Single select returns value as string instead of array (#66).



<a name="1.0.0-beta.1"></a>
## [1.0.0-beta.1](https://github.com/basvandenberg/ng-select/compare/1.0.0-beta.0...1.0.0-beta.1) (2017-01-08)

### Bug fixes

- Removed accidentally included `console.log`'s in published npm package. (#64).



<a name="1.0.0-beta.0"></a>
## [1.0.0-beta.0](https://github.com/basvandenberg/ng-select/compare/1.0.0-alpha.12...1.0.0-beta.0) (2017-01-07)

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
## [1.0.0-alpha.12](https://github.com/basvandenberg/ng-select/compare/1.0.0-alpha.11...1.0.0-alpha.12)

### Breaking changes

- The method `clearSelected` is changed to `clear`.

### Bug fixes

- Trigger `deselected` event on clear single select click (#23).
- Typo fixes.



<a name="1.0.0-alpha.11"></a>
## [1.0.0-alpha.11](https://github.com/basvandenberg/ng-select/compare/1.0.0-alpha.10...1.0.0-alpha.11)

- Update to Angular 2.1.0.



<a name="1.0.0-alpha.10"></a>
## [1.0.0-alpha.10](https://github.com/basvandenberg/ng-select/compare/1.0.0-alpha.9...1.0.0-alpha.10)

### Bug fixes

- Fix errors in package.json and tsconfig.json ([#18] (https://github.com/basvandenberg/ng-select/issues/18)).
- Fix empty value multi-select, so that required validator works ([#21] (https://github.com/basvandenberg/ng-select/issues/21)).
- Fix setting value of single select ([#19] (https://github.com/basvandenberg/ng-select/issues/19)).

### Improvements

- Set ViewEncapsulation to None to enable style override ([#16] (https://github.com/basvandenberg/ng-select/issues/16)).



<a name="1.0.0-alpha.9"></a>
## [1.0.0-alpha.9](https://github.com/basvandenberg/ng-select/compare/1.0.0-alpha.8...1.0.0-alpha.9) (2016-10-05)

### Bug fixes

- Fix gulp watch task.
- Fix gulp build taks.
- Fix tsconfig, and added types to compilerOptions.
- Fix AoT build, made some variables public.



<a name="1.0.0-alpha.8"></a>
## [1.0.0-alpha.8](https://github.com/basvandenberg/ng-select/compare/1.0.0-alpha.7...1.0.0-alpha.8) (2016-10-01)

### Features

- Added ngc/AoT support ([#11] (https://github.com/basvandenberg/ng-select/pull/11)).

### Bug fixes

- Fix clear selection using form control's setValue function ([#5] (https://github.com/basvandenberg/ng-select/issues/5)).
- Update current selection when option list is changed ([#6] (https://github.com/basvandenberg/ng-select/issues/6)).
- Prevent javascript error when list of options is empty ([#7] (https://github.com/basvandenberg/ng-select/issues/7)).
- Prevent javascript error when clicking the 'No results found' option ([#8] (https://github.com/basvandenberg/ng-select/issues/8)).

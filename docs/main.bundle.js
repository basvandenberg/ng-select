webpackJsonp([0,3],{

/***/ 339:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 339;


/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(448);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/bastiaan/Develop/bd-angular/angular2-select/demo/src/main.js.map

/***/ },

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(125);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent() {
        this.multipleSingle = false;
        this.optionsSingle = [];
        this.alternativeOptionsSingle = [];
        this.initialValueSingle = '22';
        this.allowClear = true;
        this.multipleMultiple = true;
        this.optionsMultiple = [];
        this.alternativeOptionsMultiple = [];
        this.initialValueMultiple = ['0', '2', '22', '66'];
        this.logSingleString = '';
        this.logMultipleString = '';
        this.OPTIONS_A = [
            { label: 'Agrajag', value: '0', disabled: true },
            { label: 'Mrs Alice Beeblebrox', value: '1' },
            { label: 'The Allitnils', value: '2' },
            { label: 'Almighty Bob', value: '3' },
            { label: 'Anjie', value: '4' },
            { label: 'Arcturan Megafreighter crew', value: '5' },
            { label: 'Aseed', value: '6' },
            { label: 'Barmen', value: '7' },
            { label: 'Barman of the Horse and Groom', value: '8' },
            { label: 'Barman in Old Pink Dog Bar', value: '9' },
            { label: 'Barman in the Domain of the King', value: '10' },
            { label: 'BBC department head', value: '11' },
            { label: 'Blart Versenwald III', value: '12' },
            { label: 'Bodyguard', value: '13' },
            { label: 'Caveman', value: '14' },
            { label: 'Colin', value: '15' },
            { label: 'Constant Mown', value: '16' },
            { label: 'Dr. Dan Streetmentioner', value: '17' },
            { label: 'Deep Thought', value: '18' },
            { label: 'Dionah Carlinton Housney', value: '19' },
            { label: 'Disaster Area\'s chief research accountant', value: '20' },
            { label: 'Dish of the Day', value: '21' },
            { label: 'East River Creature', value: '22' },
            { label: 'Eccentrica Gallumbits', value: '23' },
            { label: 'Eddie', value: '24' },
            { label: 'Effrafax of Wug', value: '25' },
            { label: 'Elders of Krikkit', value: '26' },
            { label: 'Elvis Presley', value: '27' },
            { label: 'Emily Saunders', value: '28' },
            { label: 'Emperor of the Galaxy', value: '29' },
            { label: 'Mrs Enid Kapelsen', value: '30' },
            { label: 'Eric Bartlett', value: '31' },
            { label: 'Fenchurch', value: '32' },
            { label: 'Frankie and Benjy Mouse', value: '33' },
            { label: 'Frat Gadz', value: '34' },
            { label: 'Frogstar Prisoner Relations Officer', value: '35' },
            { label: 'Gag Halfrunt', value: '36' },
            { label: 'Gail Andrews', value: '37' },
            { label: 'Gargravarr', value: '38' },
            { label: 'Garkbit', value: '39' },
            { label: 'Genghis Temüjin Khan', value: '40' },
            { label: 'Girl with a Master\'s degree', value: '41' },
            { label: 'God', value: '42' },
            { label: 'Gogrilla Mincefriend', value: '43' },
            { label: 'Golgafrinchans', value: '44' },
            { label: 'Agda and Mella', value: '45' },
            { label: 'Captain', value: '46' },
            { label: 'Great Circling Poets of Arium', value: '47' },
            { label: 'Hairdresser', value: '48' },
            { label: 'Management consultant', value: '49' },
            { label: 'Marketing girl', value: '50' },
            { label: 'Number One', value: '51' },
            { label: 'Number Two', value: '52' },
            { label: 'Telephone Sanitizer', value: '53' },
            { label: 'Googleplex Starthinker', value: '54' },
            { label: 'Great Green Arkleseizure', value: '55' },
            { label: 'Great Hyperlobic Omnicognate Neutron Wrangler', value: '56' },
            { label: 'Grunthos the Flatulent', value: '57' },
            { label: 'Guide Mark II', value: '58' },
            { label: 'Hactar', value: '59' },
            { label: 'Haggunenon Underfleet Commander', value: '60' },
            { label: 'Heimdall', value: '61' },
            { label: 'Hig Hurtenflurst', value: '62' },
            { label: 'Hillman Hunter', value: '63' },
            { label: 'Hotblack Desiato', value: '64' },
            { label: 'Humma Kavula', value: '65' },
            { label: 'Hurling Frootmig', value: '66' },
            { label: 'Ix', value: '67' },
            { label: 'Judiciary Pag', value: '68' },
            { label: 'Karl Mueller', value: '69' },
            { label: 'Know-Nothing Bozo the Non-Wonder Dog', value: '70' },
            { label: 'Krikkiters', value: '71' },
            { label: 'Kwaltz', value: '72' },
            { label: 'Lady Cynthia Fitzmelton', value: '73' },
            { label: 'The Lajestic Vantrashell of Lob', value: '74' },
            { label: 'Lallafa', value: '75' },
            { label: 'Lazlar Lyricon', value: '76' },
            { label: 'Lig Lury, Jr', value: '77' },
            { label: 'Lintilla', value: '78' },
            { label: 'Loonquawl and Phouchg', value: '79' },
            { label: 'The Lord', value: '80' },
            { label: 'Lord High Sanvalvwag of Hollop', value: '81' },
            { label: 'Lunkwill and Fook', value: '82' },
            { label: 'Magician', value: '83' },
            { label: 'Majikthise and Vroomfondel', value: '84' },
            { label: 'Max Quordlepleen', value: '85' },
            { label: 'Mo Minetti', value: '86' },
            { label: 'Murray Bost Henson', value: '87' },
            { label: 'Old Man on the Poles', value: '88' },
            { label: 'Old Thrashbarg', value: '89' },
            { label: 'Old Woman in the Cave', value: '90' },
            { label: 'Oolon Colluphid', value: '91' },
            { label: 'Paul Neil Milne Johnstone', value: '92' },
            { label: 'Phouchg and Loonquawl', value: '93' },
            { label: 'Poodoo', value: '94' },
            { label: 'Prak', value: '95' },
            { label: 'Pralite monks', value: '96' },
            { label: 'President Hudson', value: '97' },
            { label: 'Princess Hooli', value: '98' },
            { label: 'Mr Prosser', value: '99' },
            { label: 'Prostetnic Vogon Jeltz', value: '100' },
            { label: 'Questular Rontok', value: '101' },
            { label: 'Raffle ticket woman', value: '102' },
            { label: 'Random Dent', value: '103' },
            { label: 'Receptionists', value: '104' },
            { label: 'New York Hotel receptionist', value: '105' },
            { label: 'Megadodo receptionist', value: '106' },
            { label: 'Reg Nullify', value: '107' },
            { label: 'Rob McKenna', value: '108' },
            { label: 'Roosta', value: '109' },
            { label: 'The Ruler of the Universe', value: '110' },
            { label: 'Russell', value: '111' },
            { label: 'Safety and Civil Reassurance Administration Officials', value: '112' },
            { label: 'Sheila Steafel', value: '113' },
            { label: 'Shooty and Bang Bang', value: '114' },
            { label: 'Six Men', value: '115' },
            { label: 'Slartibartfast', value: '116' },
            { label: 'Sperm Whale', value: '117' },
            { label: 'Stavro Mueller', value: '118' },
            { label: 'Strinder the Tool Maker', value: '119' },
            { label: 'Sulijoo', value: '120' },
            { label: 'Thor', value: '121' },
            { label: 'Tribesmen of the Cold Hillsides', value: '122' },
            { label: 'Trin Tragula', value: '123' },
            { label: 'Varntvar The Priest', value: '124' },
            { label: 'Veet Voojagig', value: '125' },
            { label: 'Vroomfondel and Majikthise', value: '126' },
            { label: 'War Command Krikkiters', value: '127' },
            { label: 'Will Smithers', value: '128' },
            { label: 'The Wise Old Bird', value: '129' },
            { label: 'Werdle Sneng', value: '130' },
            { label: 'Wonko the Sane', value: '131' },
            { label: 'Wowbagger, the Infinitely Prolonged', value: '132' },
            { label: 'Yooden Vranx', value: '133' },
            { label: 'Zaphod Beeblebrox the Fourth', value: '134' },
            { label: 'Zarniwoop [Vann Harl]', value: '135' },
            { label: 'Zarquon', value: '136' },
            { label: 'Zem', value: '137' }
        ];
        this.OPTIONS_B = [];
        this.opts = this.OPTIONS_A;
        this.alternativeOpts = [{
                value: '0',
                label: '0'
            }, {
                value: '1',
                label: '1'
            }, {
                value: 'A',
                label: 'A'
            }, {
                value: 'B',
                label: 'B'
            }];
        this.optionsSingle = this.opts.slice(0);
        this.optionsMultiple = this.opts.slice(0);
    }
    AppComponent.prototype.ngOnInit = function () {
        this.formSingle = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({});
        this.formSingle.addControl('selectSingle', new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](this.initialValueSingle));
        this.formMultiple = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({});
        this.formMultiple.addControl('selectMultiple', new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](this.initialValueMultiple));
    };
    AppComponent.prototype.onSingleOpened = function () {
        this.logSingle('- opened');
    };
    AppComponent.prototype.onSingleClosed = function () {
        this.logSingle('- closed');
    };
    AppComponent.prototype.onSingleSelected = function (item) {
        this.logSingle('- selected (value: ' + item.value + ', label:' +
            item.label + ')');
    };
    AppComponent.prototype.onSingleDeselected = function (item) {
        this.logSingle('- deselected (value: ' + item.value + ', label:' +
            item.label + ')');
    };
    AppComponent.prototype.onMultipleOpened = function () {
        this.logMultiple('- opened');
    };
    AppComponent.prototype.onMultipleClosed = function () {
        this.logMultiple('- closed');
    };
    AppComponent.prototype.onMultipleSelected = function (item) {
        this.logMultiple('- selected (value: ' + item.value + ', label:' +
            item.label + ')');
    };
    AppComponent.prototype.onMultipleDeselected = function (item) {
        this.logMultiple('- deselected (value: ' + item.value + ', label:' +
            item.label + ')');
    };
    AppComponent.prototype.onSingleResetClick = function () {
        this.formSingle.reset();
    };
    AppComponent.prototype.onMultipleResetClick = function () {
        this.formMultiple.reset();
    };
    AppComponent.prototype.onMultipleSetOptions1Click = function () {
        this.optionsMultiple = this.alternativeOpts.slice(0);
    };
    AppComponent.prototype.logSingle = function (msg) {
        var _this = this;
        this.logSingleString += msg + '\n';
        // Let change detection do its work before scrolling to div bottom.
        setTimeout(function () {
            _this.scrollToBottom(_this.preSingle.nativeElement);
        });
    };
    AppComponent.prototype.logMultiple = function (msg) {
        var _this = this;
        this.logMultipleString += msg + '\n';
        // Let change detection do its work before scrolling to div bottom.
        setTimeout(function () {
            _this.scrollToBottom(_this.preMultiple.nativeElement);
        });
    };
    AppComponent.prototype.scrollToBottom = function (elem) {
        elem.scrollTop = elem.scrollHeight;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('singleSelectComponent'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "singleSelectComponent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multipleSelectComponent'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "multipleSelectComponent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('preSingle'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "preSingle", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('preMultiple'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "preMultiple", void 0);
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(615),
            styles: [__webpack_require__(614)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/home/bastiaan/Develop/bd-angular/angular2-select/demo/src/app.component.js.map

/***/ },

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_select__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(447);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_4_angular2_select__["SelectModule"]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/bastiaan/Develop/bd-angular/angular2-select/demo/src/app.module.js.map

/***/ },

/***/ 449:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/home/bastiaan/Develop/bd-angular/angular2-select/demo/src/environment.js.map

/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/home/bastiaan/Develop/bd-angular/angular2-select/demo/src/polyfills.js.map

/***/ },

/***/ 614:
/***/ function(module, exports) {

module.exports = "pre {       \n    background-color: #f5f5f5;        \n    border: 1px solid #9e9e9e;       \n    padding: 8px;       \n    height: 100px;     \n    overflow-y: scroll;       \n}\n"

/***/ },

/***/ 615:
/***/ function(module, exports) {

module.exports = "<h1>Angular 2 select demo app</h1>\n\n<form style=\"padding:18px;max-width:800px;\"\n    [formGroup]=\"formSingle\">\n\n    <div style=\"margin:5px 0;font-weight:600;\">Single select example</div>\n    <ng-select\n        #singleSelectComponent\n\t\t[options]=\"optionsSingle\"\n\t\t[multiple]=\"multipleSingle\"\n\t\tplaceholder=\"Select one\"\n        formControlName=\"selectSingle\"\n\t\t[allowClear]=\"allowClear\"\n        (opened)=\"onSingleOpened()\"\n        (closed)=\"onSingleClosed()\"\n        (selected)=\"onSingleSelected($event)\"\n        (deselected)=\"onSingleDeselected($event)\">\n\t</ng-select>\n\n    <div style=\"margin:10px 0 20px 0;color:#666;font-size:11pt;font-style:italic;\">\n\t    Selected option id: {{formSingle.value['selectSingle']}}\n    </div>\n\n    <div>Events:</div>\n    <pre #preSingle>{{logSingleString}}</pre>\n\n</form>\n\n<button\n    (click)=\"onSingleResetClick()\">Reset</button>\n\n<hr style=\"margin: 18px 0;\">\n\n<form style=\"padding:18px;max-width:800px;\"\n    [formGroup]=\"formMultiple\">\n\n    <div style=\"margin:5px 0;font-weight:600;\">Multiple select example</div>\n\t<ng-select\n        #multipleSelectComponent\n        [ngStyle]=\"{'width': '500px'}\"\n\t\t[options]=\"optionsMultiple\"\n\t\t[multiple]=\"multipleMultiple\"\n\t\tplaceholder=\"Select multiple\"\n        formControlName=\"selectMultiple\"\n        (opened)=\"onMultipleOpened()\"\n        (closed)=\"onMultipleClosed()\"\n        (selected)=\"onMultipleSelected($event)\"\n        (deselected)=\"onMultipleDeselected($event)\">\n\t</ng-select>\n\n    <div style=\"margin:10px 0 20px 0;color:#666;font-size:11pt;font-style:italic;\">\n\t    Selected option id: {{formMultiple.value['selectMultiple']}}\n    </div>\n\n    <div>Events:</div>\n    <pre #preMultiple>{{logMultipleString}}</pre>\n</form>\n\n<button\n    (click)=\"onMultipleResetClick()\">Reset</button>\n<button\n    (click)=\"onMultipleSetOptions1Click()\">Set options 0, 1, A, B</button>\n"

/***/ },

/***/ 628:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(340);


/***/ }

},[628]);
//# sourceMappingURL=main.bundle.map
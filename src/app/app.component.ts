import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {SelectComponent, IOption} from 'ng-select';

declare var hljs: any;

@Component({
  selector: 'ng-select-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @ViewChild('mainContainer') mainContainer: ElementRef;

    static readonly SCREEN_BREAKPOINT: number = 600;
    smallScreen: boolean = false;

    constructor(
        public router: Router
    ) {}

    /** Event listeners **/

    ngOnInit() {
        this.updateScreen(window.innerWidth);
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            if (evt.url.indexOf('/faq') === -1) {
                this.mainContainer.nativeElement.scrollTop = 0;
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
        this.updateScreen(event.target.innerWidth);
    }

    /** Helper functions. **/

    updateScreen(width: number) {
        this.smallScreen = width < AppComponent.SCREEN_BREAKPOINT;
    }
}
/*export class AppComponent implements AfterViewInit, OnInit {

    delayedOptions: Array<IOption> = [];
    delayedDefault: string = '';
    updatedOptions: Array<IOption>;
    updatedOptionsValue: string = '1';
    selectedValues: Array<string>;
    selectedValuesOptions: Array<IOption> = [];
    disabled: boolean = true;
    form: FormGroup;

    @ViewChild('clearSelectExample') clearSelectExample: SelectComponent;
    @ViewChild('delayed') delayedExample: SelectComponent;

    constructor(
        private elementRef: ElementRef
    ) {}

    ngOnInit() {
        this.form = new FormGroup({});
        let c: FormControl = new FormControl('', Validators.required);
        this.form.addControl('select', c);

        this.updatedOptions = this.OPTIONS_BASIC;

        setTimeout(() => {
            this.delayedOptions = this.OPTIONS_BASIC;
            this.delayedExample.select('2');

        }, 5000);

        this.selectedValuesOptions = this.OPTIONS_BASIC.map(a => a);
    }

    ngAfterViewInit() {
        hljs.initHighlighting();
        let nodes: NodeList = this.elementRef
            .nativeElement
            .querySelectorAll('.typescript, .html, .css');

        for (let i = 0; i < nodes.length; i++) {
            hljs.highlightBlock(nodes[i]);
        }
    }

    onDisableClick() {
        this.disabled = true;
    }

    onEnableClick() {
        this.disabled = false;
    }

    onClearSelectionClick() {
        this.clearSelectExample.clear();
    }

    onNoOptionsFound(term: string) {
        console.log(term);
    }

    onSelectedValuesClick() {
        this.selectedValuesOptions = this.OPTIONS_BASIC.map(a => a).slice(0, 2);
        //setTimeout(() => {
            this.selectedValues = ['0','1'];
        //});
    }

    onUpdateOptionsA() {
        this.updatedOptions = this.OPTIONS_BASIC.map(a => a);
        this.updatedOptionsValue = '4';
    }

    onUpdateOptionsB() {
        this.updatedOptions = this.OPTIONS_BASIC.map(a => a).slice(0, 2);
        this.updatedOptionsValue = '2';
    }

    sample00ts = `
<pre><code class="typescript">characters: Array&lt;any&gt;;

ngOnInit() {
    this.characters = [
        {value: '0', label: 'Aech'},
        {value: '1', label: 'Art3mis'},
        {value: '2', label: 'Daito'},
        {value: '3', label: 'Parzival'},
        {value: '4', label: 'Shoto'}
    ];
}
</code></pre>`;

    sample00html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample01html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [multiple]="true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample02html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [disabled]="disabled"&gt;
&lt;/ng-select&gt;
&lt;button
    [disabled]="disabled"
    (click)="onDisableClick()"&gt;
    Disable
&lt;/button&gt;
&lt;button
    [disabled]="!disabled"
    (click)="onEnableClick()"&gt;
    Enable
&lt;/button&gt;
</code></pre>`;

    sample02ts = `
<pre><code class="typescript">disabled: boolean = true;

onDisableClick() {
    this.disabled = true;
}

onEnableClick() {
    this.disabled = false;
}
</code></pre>`;

    sample03html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample04html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [allowClear]="true"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample05html = `
<pre><code class="html">&lt;ng-select
    #clearSelectExample
    [options]="characters"
    [multiple]="true"&gt;
&lt;/ng-select&gt;
&lt;button
    (click)="clearSelectExample.clear()"&gt;
    Clear selection
&lt;/button&gt;
</code></pre>`;

    sample06html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [allowClear]="true"
    placeholder="Select one of the characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample07html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [multiple]="true"
    placeholder="Select characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample08html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    notFoundMsg="None of the characters match your search"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample09html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [ngStyle]="{'width': '300px'}"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample10html = `
<pre><code class="html">&lt;div&gt;
    Value: &lt;strong&gt;{{selectedValues}}&lt;/strong&gt;
&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    [multiple]="true"
    [(ngModel)]="selectedValues"&gt;
&lt;/ng-select&gt;
&lt;button
    (click)="selectedValues=['1','3']"&gt;
    Select values 1 and 3
&lt;/button&gt;
</code></pre>`;

    sample11html = `
<pre><code class="html">&lt;div&gt;
    Last event: &lt;strong&gt;{{lastEvent}}&lt;/strong&gt;
&lt;/div&gt;
&lt;ng-select
    [options]="characters"
    [multiple]="true"
    (selected)="lastEvent='selected ' + $event.label"
    (deselected)="lastEvent='deselected ' + $event.label"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample12html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample12ts = `
<pre><code class="typescript">disabled: boolean = true;

onDisableClick() {
    this.disabled = true;
}

onEnableClick() {
    this.disabled = false;
}
</code></pre>`;

    sample13html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [multiple]="true"
    highlightColor="#B39DDB"
    highlightTextColor="#4527A0"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample14html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [noFilter]="10"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample15html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    [multiple]="true"
    [noFilter]="10"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample16html = `
<pre><code class="html">&lt;ng-select
    [options]="delayedCharacters"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample16ts = `
<pre><code class="typescript">delayedCharacters: Array<any>;

onInit() {
    setTimeout(() => {
        this.delayedCharacters = [
            {value: '0', label: 'Aech'},
            {value: '1', label: 'Art3mis'},
            {value: '2', label: 'Daito'},
            {value: '3', label: 'Parzival'},
            {value: '4', label: 'Shoto'}
        ];
    }, 5000);
}
</code></pre>`;

    sample17html = `
<pre><code class="html">&lt;div class="value-bar"&gt;
    &lt;div&gt;Value: &lt;strong&gt;{{updatedOptionsValue}}&lt;/strong&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;ng-select
    [options]="updatedCharacters"
    [multiple]="true"
    [(ngModel)]="updatedOptionsValue"&gt;
&lt;/ng-select&gt;
&lt;button
    (click)="updatedCharacters=characters"&gt;
    All options
&lt;/button&gt;
&lt;button
    (click)="updatedCharacters=characters.slice(0, 2)"&gt;
    First two options
&lt;/button&gt;
</code></pre>`;

    sample17ts = `
<pre><code class="typescript">updatedCharacters: Array<any>;
characters: Array<any> = [
    {value: '0', label: 'Aech'},
    {value: '1', label: 'Art3mis'},
    {value: '2', label: 'Daito'},
    {value: '3', label: 'Parzival'},
    {value: '4', label: 'Shoto'}
];

onInit() {
    this.updatedCharacters = this.characters;
}
</code></pre>`;

    sample18html = `
<pre><code class="html">&lt;div&gt;Value: &lt;strong&gt;{{form.value.select}}&lt;/strong&gt;&lt;/div&gt;
&lt;div&gt;Control touched: &lt;strong&gt;{{form.controls['select'].touched}}&lt;/strong&gt;&lt;/div&gt;
&lt;div&gt;Form valid: &lt;strong&gt;{{form.valid}}&lt;/strong&gt;&lt;/div&gt;
&lt;form&gt;
    &lt;ng-select
        formControlName="select"
        [options]="characters"
        [multiple]="true"&gt;
    &lt;/ng-select&gt;
&lt;/form&gt;
</code></pre>`;

    sample18ts = `
<pre><code class="typescript">form: FormGroup;

ngOnInit() {
    this.form = new FormGroup({});
    let c: FormControl = new FormControl('', Validators.required);
    this.form.addControl('select', c);
}
</code></pre>`;

    sample19html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    filterPlaceholder="Type to filter"&gt;
&lt;/ng-select&gt;
</code></pre>`;

    sample20html = `
<pre><code class="html">&lt;ng-select
    [options]="characters"
    label="Favorite character"&gt;
&lt;/ng-select&gt;
</code></pre>`;


    OPTIONS_BASIC: Array<IOption> = [
        {value: '0', label: 'Aech'},
        {value: '1', label: 'Art3mis'},
        {value: '2', label: 'Daito'},
        {value: '3', label: 'Parzival'},
        {value: '4', label: 'Shoto'}
    ];

    OPTIONS_BASIC_FIRST_TWO = [
        {value: '0', label: 'Aech'},
        {value: '1', label: 'Art3mis'}
    ];

    OPTIONS_BASIC_WITH_DISABLED = [
        {value: '0', label: 'Aech'},
        {value: '1', label: 'Art3mis'},
        {value: '2', label: 'Daito', disabled: true},
        {value: '3', label: 'Parzival', disabled: true},
        {value: '4', label: 'Shoto'}
    ];

    OPTIONS_MANY = [
        {label: 'Agrajag', value: '0'},
        {label: 'Mrs Alice Beeblebrox', value: '1'},
        {label: 'The Allitnils', value: '2'},
        {label: 'Almighty Bob', value: '3'},
        {label: 'Anjie', value: '4'},
        {label: 'Arcturan Megafreighter crew', value: '5'},
        {label: 'Aseed', value: '6'},
        {label: 'Barmen', value: '7'},
        {label: 'Barman of the Horse and Groom', value: '8'},
        {label: 'Barman in Old Pink Dog Bar', value: '9'},
        {label: 'Barman in the Domain of the King', value: '10'},
        {label: 'BBC department head', value: '11'},
        {label: 'Blart Versenwald III', value: '12'},
        {label: 'Bodyguard', value: '13'},
        {label: 'Caveman', value: '14'},
        {label: 'Colin', value: '15'},
        {label: 'Constant Mown', value: '16'},
        {label: 'Dr. Dan Streetmentioner', value: '17'},
        {label: 'Deep Thought', value: '18'},
        {label: 'Dionah Carlinton Housney', value: '19'},
        {label: 'Disaster Area\'s chief research accountant', value: '20'},
        {label: 'Dish of the Day', value: '21'},
        {label: 'East River Creature', value: '22'},
        {label: 'Eccentrica Gallumbits', value: '23'},
        {label: 'Eddie', value: '24'},
        {label: 'Effrafax of Wug', value: '25'},
        {label: 'Elders of Krikkit', value: '26'},
        {label: 'Elvis Presley', value: '27'},
        {label: 'Emily Saunders', value: '28'},
        {label: 'Emperor of the Galaxy', value: '29'},
        {label: 'Mrs Enid Kapelsen', value: '30'},
        {label: 'Eric Bartlett', value: '31'},
        {label: 'Fenchurch', value: '32'},
        {label: 'Frankie and Benjy Mouse', value: '33'},
        {label: 'Frat Gadz', value: '34'},
        {label: 'Frogstar Prisoner Relations Officer', value: '35'},
        {label: 'Gag Halfrunt', value: '36'},
        {label: 'Gail Andrews', value: '37'},
        {label: 'Gargravarr', value: '38'},
        {label: 'Garkbit', value: '39'},
        {label: 'Genghis Temüjin Khan', value: '40'},
        {label: 'Girl with a Master\'s degree', value: '41'},
        {label: 'God', value: '42'},
        {label: 'Gogrilla Mincefriend', value: '43'},
        {label: 'Golgafrinchans', value: '44'},
        {label: 'Agda and Mella', value: '45'},
        {label: 'Captain', value: '46'},
        {label: 'Great Circling Poets of Arium', value: '47'},
        {label: 'Hairdresser', value: '48'},
        {label: 'Management consultant', value: '49'},
        {label: 'Marketing girl', value: '50'},
        {label: 'Number One', value: '51'},
        {label: 'Number Two', value: '52'},
        {label: 'Telephone Sanitizer', value: '53'},
        {label: 'Googleplex Starthinker', value: '54'},
        {label: 'Great Green Arkleseizure', value: '55'},
        {label: 'Great Hyperlobic Omnicognate Neutron Wrangler', value: '56'},
        {label: 'Grunthos the Flatulent', value: '57'},
        {label: 'Guide Mark II', value: '58'},
        {label: 'Hactar', value: '59'},
        {label: 'Haggunenon Underfleet Commander', value: '60'},
        {label: 'Heimdall', value: '61'},
        {label: 'Hig Hurtenflurst', value: '62'},
        {label: 'Hillman Hunter', value: '63'},
        {label: 'Hotblack Desiato', value: '64'},
        {label: 'Humma Kavula', value: '65'},
        {label: 'Hurling Frootmig', value: '66'},
        {label: 'Ix', value: '67'},
        {label: 'Judiciary Pag', value: '68'},
        {label: 'Karl Mueller', value: '69'},
        {label: 'Know-Nothing Bozo the Non-Wonder Dog', value: '70'},
        {label: 'Krikkiters', value: '71'},
        {label: 'Kwaltz', value: '72'},
        {label: 'Lady Cynthia Fitzmelton', value: '73'},
        {label: 'The Lajestic Vantrashell of Lob', value: '74'},
        {label: 'Lallafa', value: '75'},
        {label: 'Lazlar Lyricon', value: '76'},
        {label: 'Lig Lury, Jr', value: '77'},
        {label: 'Lintilla', value: '78'},
        {label: 'Loonquawl and Phouchg', value: '79'},
        {label: 'The Lord', value: '80'},
        {label: 'Lord High Sanvalvwag of Hollop', value: '81'},
        {label: 'Lunkwill and Fook', value: '82'},
        {label: 'Magician', value: '83'},
        {label: 'Majikthise and Vroomfondel', value: '84'},
        {label: 'Max Quordlepleen', value: '85'},
        {label: 'Mo Minetti', value: '86'},
        {label: 'Murray Bost Henson', value: '87'},
        {label: 'Old Man on the Poles', value: '88'},
        {label: 'Old Thrashbarg', value: '89'},
        {label: 'Old Woman in the Cave', value: '90'},
        {label: 'Oolon Colluphid', value: '91'},
        {label: 'Paul Neil Milne Johnstone', value: '92'},
        {label: 'Phouchg and Loonquawl', value: '93'},
        {label: 'Poodoo', value: '94'},
        {label: 'Prak', value: '95'},
        {label: 'Pralite monks', value: '96'},
        {label: 'President Hudson', value: '97'},
        {label: 'Princess Hooli', value: '98'},
        {label: 'Mr Prosser', value: '99'},
        {label: 'Prostetnic Vogon Jeltz', value: '100'},
        {label: 'Questular Rontok', value: '101'},
        {label: 'Raffle ticket woman', value: '102'},
        {label: 'Random Dent', value: '103'},
        {label: 'Receptionists', value: '104'},
        {label: 'New York Hotel receptionist', value: '105'},
        {label: 'Megadodo receptionist', value: '106'},
        {label: 'Reg Nullify', value: '107'},
        {label: 'Rob McKenna', value: '108'},
        {label: 'Roosta', value: '109'},
        {label: 'The Ruler of the Universe', value: '110'},
        {label: 'Russell', value: '111'},
        {label: 'Safety and Civil Reassurance Administration Officials', value: '112'},
        {label: 'Sheila Steafel', value: '113'},
        {label: 'Shooty and Bang Bang', value: '114'},
        {label: 'Six Men', value: '115'},
        {label: 'Slartibartfast', value: '116'},
        {label: 'Sperm Whale', value: '117'},
        {label: 'Stavro Mueller', value: '118'},
        {label: 'Strinder the Tool Maker', value: '119'},
        {label: 'Sulijoo', value: '120'},
        {label: 'Thor', value: '121'},
        {label: 'Tribesmen of the Cold Hillsides', value: '122'},
        {label: 'Trin Tragula', value: '123'},
        {label: 'Varntvar The Priest', value: '124'},
        {label: 'Veet Voojagig', value: '125'},
        {label: 'Vroomfondel and Majikthise', value: '126'},
        {label: 'War Command Krikkiters', value: '127'},
        {label: 'Will Smithers', value: '128'},
        {label: 'The Wise Old Bird', value: '129'},
        {label: 'Werdle Sneng', value: '130'},
        {label: 'Wonko the Sane', value: '131'},
        {label: 'Wowbagger, the Infinitely Prolonged', value: '132'},
        {label: 'Yooden Vranx', value: '133'},
        {label: 'Zaphod Beeblebrox the Fourth', value: '134'},
        {label: 'Zarniwoop [Vann Harl]', value: '135'},
        {label: 'Zarquon', value: '136'},
        {label: 'Zem', value: '137'}
    ];
}
*/

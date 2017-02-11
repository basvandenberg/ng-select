import { Option } from './option';
export declare class OptionList<T> {
    private _options;
    private _highlightedOption;
    private _hasShown;
    constructor(options: Array<any>);
    /** Options. **/
    readonly options: Array<Option<T>>;
    getOptionsByValue(value: T): Array<Option<T>>;
    /** Value. **/
    value: Array<any> | any;
    /** Selection. **/
    readonly selection: Array<Option<T>>;
    select(option: Option<T>, multiple: boolean): void;
    deselect(option: Option<T>): void;
    clearSelection(): void;
    /** Filter. **/
    readonly filtered: Array<Option<T>>;
    filter(term: string): boolean;
    private resetFilter();
    /** Highlight. **/
    readonly highlightedOption: Option<T>;
    highlight(): void;
    highlightOption(option: Option<T>): void;
    highlightNextOption(): void;
    highlightPreviousOption(): void;
    private clearHighlightedOption();
    private getHighlightedIndexFromList(options);
    getHighlightedIndex(): number;
    /** Util. **/
    readonly hasShown: boolean;
    hasSelected(): boolean;
    hasShownSelected(): boolean;
    private getFirstShown();
    private getFirstShownSelected();
    static equalValues<T>(v0: Array<T>, v1: Array<T>): boolean;
}

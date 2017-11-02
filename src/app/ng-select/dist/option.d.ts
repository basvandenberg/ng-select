import { IOption } from './option.interface';
export declare class Option {
    wrappedOption: IOption;
    disabled: boolean;
    highlighted: boolean;
    selected: boolean;
    shown: boolean;
    constructor(option: IOption);
    readonly value: string;
    readonly label: string;
}

export declare class Option<T> {
    value: T;
    label: string;
    disabled: boolean;
    highlighted: boolean;
    selected: boolean;
    shown: boolean;
    constructor(value: T, label: string);
    show(): void;
    hide(): void;
    disable(): void;
    enable(): void;
    undecoratedCopy(): {
        label: string;
        value: T;
    };
}

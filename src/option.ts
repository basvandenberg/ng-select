export class Option {

    value: string;
    label: string;

    selected: boolean;
    shown: boolean;
    highlighted: boolean;

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;

        this.shown = true;
        this.selected = false;
        this.highlighted = false;
    }

    show() {
        this.shown = true;
    }

    hide() {
        this.shown = false;
    }

    undecoratedCopy() {
        return {
            label: this.label,
            value: this.value
        };
    }
}

export class Option {

    value: string;
    label: string;
    index: number;

    selected: boolean;
    shown: boolean;
    highlighted: boolean;

    constructor(value: string, label: string, index: number) {
        this.value = value;
        this.label = label;
        this.index = index;

        this.shown = true;
        this.selected = false;
        this.highlighted = false;
    }

    toggleSelected() {
        this.selected = !this.selected;
    }

    show() {
        this.shown = true;
    }

    hide() {
        this.shown = false;
    }
}

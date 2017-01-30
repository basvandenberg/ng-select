export class Option {

    value: string;
    label: string;

    disabled: boolean;
    highlighted: boolean;
    selected: boolean;
    shown: boolean;
    extraData:any;

    constructor(value: string, label: string,extraData:any) {
        this.value = value;
        this.label = label;
        this.extraData=extraData;

        this.disabled = false;
        this.highlighted = false;
        this.selected = false;
        this.shown = true;
    }

    show() {
        this.shown = true;
    }

    hide() {
        this.shown = false;
    }

    disable() {
        this.disabled = true;
    }

    enable() {
        this.disabled = false;
    }

    undecoratedCopy() {
        return {
            label: this.label,
            value: this.value,
            extraData: this.extraData
        };
    }
}

import {OptionList} from './option-list';
import {Option} from './option';
import {IOption} from './option.interface';

const numbers = [0, 1, 2, 3, 4];

describe('An OptionList\'s constructor', () => {

    let options: Array<IOption>;
    let invalidOptions: Array<any>;

    beforeEach(() => {
        let options: Array<IOption> = numbers.map((i) => {
            return {
                label: `Option ${i}`,
                value: `${i}`
            };
        });
        let invalidOptions: Array<any> = [{
            label: 'Option 1',
            value: '1'
        }, {
            view: 'Invalid option label',
            value: '2'
        }];
    });

    it('creates empty list if undefined is provided as parameter', () => {
        let optionList: OptionList = new OptionList(undefined);

        expect(optionList.options.length).toBe(0);
        expect(optionList.hasShown).toBe(false);
        expect(optionList.highlightedOption).toBe(null);
    });

    it('creates empty list if null is provided as parameter', () => {
        let optionList: OptionList = new OptionList(null);

        expect(optionList.options.length).toBe(0);
        expect(optionList.hasShown).toBe(false);
        expect(optionList.highlightedOption).toBe(null);
    });
});

describe('An OptionList\'s getOptionsByValue function', () => {

    let optionList: OptionList;

    beforeEach(() => {
        let options: Array<IOption> = numbers.map((i) => {
            return {
                label: `Option ${i}`,
                value: `${i}`
            };
        });
        optionList = new OptionList(options);
    });

    it('returns empty list if list of options is empty', () => {
        optionList = new OptionList([]);
        let result: Array<Option> = optionList.getOptionsByValue('test');

        expect(result.constructor).toBe(Array);
        expect(result.length).toBe(0);
    });

    it('returns empty list if value is not in list of options', () => {
        let result: Array<Option> = optionList.getOptionsByValue('test');

        expect(result.constructor).toBe(Array);
        expect(result.length).toBe(0);
    });

    it('returns the option with requested value', () => {
        let result: Array<Option> = optionList.getOptionsByValue('2');

        expect(result.length).toBe(1);
        expect(result[0].label).toBe('Option 2');
        expect(result[0].value).toBe('2');
    });

    it('returns all options with requested value', () => {
        optionList.options[4].wrappedOption.value = '3';
        let result: Array<Option> = optionList.getOptionsByValue('3');

        expect(result.length).toBe(2);
        expect(result[0].value).toBe('3');
        expect(result[1].value).toBe('3');
    });
});

describe('An OptionList\'s get value function', () => {

    let optionList: OptionList;

    beforeEach(() => {
        let options: Array<IOption> = numbers.map((i) => {
            return {
                label: `Option ${i}`,
                value: `${i}`
            };
        });
        optionList = new OptionList(options);
    });

    it('returns empty list if list of options is empty', () => {
        optionList = new OptionList([]);
        let value: Array<string> = optionList.value;

        expect(value.constructor).toBe(Array);
        expect(value.length).toBe(0);
    });

    it('returns empty list if no options are selected', () => {
        let value: Array<string> = optionList.value;

        expect(value.constructor).toBe(Array);
        expect(value.length).toBe(0);
    });

    it('returns value of selected option', () => {
        optionList.options[1].selected = true;
        let value: Array<string> = optionList.value;

        expect(value.length).toBe(1);
        expect(value[0]).toBe('1');
    });

    it('returns value of selected options', () => {
        optionList.options[2].selected = true;
        optionList.options[4].selected = true;
        let value: Array<string> = optionList.value;

        expect(value.length).toBe(2);
        expect(value[0]).toBe('2');
        expect(value[1]).toBe('4');
    });
});

describe('An OptionList\'s set value function', () => {

    let optionList: OptionList;

    beforeEach(() => {
        let options: Array<IOption> = numbers.map((i) => {
            return {
                label: `Option ${i}`,
                value: `${i}`
            };
        });
        optionList = new OptionList(options);
    });

    it('has unchanged value if list of options is empty', () => {
        optionList = new OptionList([]);

        optionList.value = [];
        expect(optionList.value.length).toBe(0);

        optionList.value = ['2'];
        expect(optionList.value.length).toBe(0);

        optionList.value = ['0', '4'];
        expect(optionList.value.length).toBe(0);
    });

    it('has unchanged value when setting non-existing option value', () => {
        optionList.value = ['a'];
        expect(optionList.value.length).toBe(0);

        optionList.value = ['2'];
        expect(optionList.value.length).toBe(1);
        expect(optionList.value[0]).toBe('2');

        optionList.value = ['b', 'c'];
        expect(optionList.value.length).toBe(0);

        optionList.value = ['d', '3'];
        expect(optionList.value.length).toBe(1);
        expect(optionList.value[0]).toBe('3');
    });

    it('has unchanged value when setting value that is already set', () => {
        optionList.value = ['0', '4'];
        expect(optionList.value.length).toBe(2);
        expect(optionList.value[0]).toBe('0');
        expect(optionList.value[1]).toBe('4');

        optionList.value = ['0', '4'];
        expect(optionList.value.length).toBe(2);
        expect(optionList.value[0]).toBe('0');
        expect(optionList.value[1]).toBe('4');
    });

    it('selects single set value', () => {
        optionList.value = ['4'];
        expect(optionList.value.length).toBe(1);
        expect(optionList.value[0]).toBe('4');
    });

    it('selects multiple set values', () => {
        optionList.value = ['0', '2', '4'];
        expect(optionList.value.length).toBe(3);
        expect(optionList.value[0]).toBe('0');
        expect(optionList.value[1]).toBe('2');
        expect(optionList.value[2]).toBe('4');
    });

    it('selects values in the order of the option list', () => {
        optionList.value = ['2', '4', '0'];
        expect(optionList.value.length).toBe(3);
        expect(optionList.value[0]).toBe('0');
        expect(optionList.value[1]).toBe('2');
        expect(optionList.value[2]).toBe('4');
    });
});

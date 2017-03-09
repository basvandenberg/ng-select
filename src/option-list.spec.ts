import {OptionList} from './option-list';
import {Option} from './option';

let numbers = [0, 1, 2, 3, 4];

describe('An OptionList object', () => {
    it('is true', () => {
        expect(true).toBe(true);
    });
});

describe('An OptionList\'s getOptionsByValue function', () => {

    let optionList: OptionList;

    beforeEach(() => {
        let options: Array<any> = numbers.map((i) => {
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
        optionList.options[4].value = '3';
        let result: Array<Option> = optionList.getOptionsByValue('3');

        expect(result.length).toBe(2);
        expect(result[0].value).toBe('3');
        expect(result[1].value).toBe('3');
    });
});

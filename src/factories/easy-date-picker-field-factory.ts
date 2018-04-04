import { FieldOptions } from '../classes/index';
import { EasyField } from '../baseClasses/easy-field';

export class EasyDatePickerField extends EasyField {
    controlType = 'date-picker';

    constructor(options: FieldOptions<Date> = {}) {
        super(options);
        options.controlType = this.controlType;
    }
}

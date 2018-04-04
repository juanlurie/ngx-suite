import { EasyField } from '../baseClasses/easy-field';
import { FieldOptions } from '../classes/index';


export class EasyDateTimePickerField extends EasyField {
    controlType = 'date-time-picker';

    constructor(options: FieldOptions<Date>) {
        super(options);

        options.controlType = this.controlType;
    }
}
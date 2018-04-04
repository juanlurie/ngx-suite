import { FieldOptions } from '../classes/index'
import { EasyField } from '../baseClasses/easy-field';

export class EasyDividerField extends EasyField {
    controlType = 'divider';

    constructor(options: FieldOptions<any> = {}) {
        super(options);
        options.controlType = this.controlType;
    }
}

import { FieldOptions } from '../classes/index';
import { EasyField } from '../baseClasses/easy-field';

export class EasyToolbarTextField extends EasyField {
    controlType = 'toolbar-text';
    color: string;
    icon: string;
    type: string;

    constructor(options: FieldOptions<any> = {}) {
        super(options);
        this.color = options.color || '';
        this.icon = options.icon || '';
    }
}

import { EasyField } from '../baseClasses/easy-field';
import { FieldOptions } from '../classes/index';

export class EasyInputField extends EasyField {
  controlType = 'textbox';
  type: string;

  constructor(options: FieldOptions<any> = {}) {
    super(options);
    options.controlType = this.controlType;
    this.type = options['type'] || '';
  }
}

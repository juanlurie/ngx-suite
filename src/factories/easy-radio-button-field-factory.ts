import { FieldOptions, SelectOption } from '../classes/index';
import { EasyField } from '../baseClasses/easy-field';

export class EasyRadioButtonField extends EasyField {
  controlType = 'radio-button';
  items: Array<SelectOption<any>>;

  constructor(options: FieldOptions<any> = {}) {
    super(options);
    options.controlType = this.controlType;
  }
}

import { FieldOptions } from '../classes/index';
import { EasyField } from '../baseClasses/easy-field';

export class EasySelectField extends EasyField {
  controlType = 'select';
  items: Array<string>;

  constructor(options: FieldOptions<string> = {}) {
    super(options);
    options.controlType = this.controlType;
  }

  setItems(items: Array<string>) {
    this.items = items;
  }
}

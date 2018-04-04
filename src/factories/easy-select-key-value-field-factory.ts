import { FieldOptions, SelectOption } from '../classes/index';
import { EasyField } from '../baseClasses/easy-field';

export class EasySelectKeyValueField<T> extends EasyField {
  controlType = 'select-key-value';

  constructor(options: FieldOptions<T> = {}) {
    super(options);
    options.controlType = this.controlType;
  }

  setItems(items: Array<T>) {
    this.items = items;
  }
}

import { FieldOptions, SelectOption } from '../classes/index';
import { EasyField } from '../baseClasses/easy-field';

export class EasyAutocompleteField extends EasyField {
  controlType = 'autocomplete';
  items: Array<string>;

  constructor(options: FieldOptions<any> = {}) {
    super(options);
    options.controlType = this.controlType;
  }

  setItems(items: Array<string>) {
    this.items = items;
  }
}



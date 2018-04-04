import { EasyField } from '../baseClasses/easy-field';

export class EasyCheckBoxGroupField extends EasyField {
  controlType = 'checkbox-group';
  type: Array<string>;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || [];
  }
}

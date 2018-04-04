import { FieldOptions } from '../classes/index';
import { EasyField } from '../baseClasses/easy-field';

export class EasyCheckboxField extends EasyField {
  controlType = 'checkbox';
  type: string;

  constructor(options: FieldOptions<any> = {}) {
    super(options);
    options.controlType = this.controlType;
    this.type = options['type'] || '';
    this.marginLeft = options.marginLeft;
    this.marginTop = options.marginTop;
    this.marginRight = options.marginRight;
    this.marginBottom = options.marginBottom;
  }
}

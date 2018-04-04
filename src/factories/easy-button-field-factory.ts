import { EasyField } from '../baseClasses/easy-field';
import { FieldOptions } from '../classes/index'

export class EasyButtonField extends EasyField {
  controlType = 'button';
  action: Function;
  color: string;
  icon: string;
  type: string;

  constructor(options: FieldOptions<any> = {}) {
    super(options);
    this.action = options.action;
    this.color = options.color || '';
    this.icon = options.icon || '';
    this.type = options.type || 'mat-button';
  }
}

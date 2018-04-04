import { FieldOptions } from '../classes/index'
import { EasyField } from '../baseClasses/easy-field';

export class EasyTextAreaField extends EasyField {
  controlType = 'textArea';
  type: string;

  constructor(options: FieldOptions<string> = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

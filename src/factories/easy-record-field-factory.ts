import { FieldOptions } from '../classes/index'
import { EasyField } from '../baseClasses/easy-field';

export class EasyRecordField extends EasyField {
  controlType = 'record';
  url: string;
  authorizationHeader: string;

  constructor(url: string, options: FieldOptions<any> = {}) {
    super(options);
    options.url = url;
    this.url = url;
    this.authorizationHeader = options.authorizationHeader;
  }
}

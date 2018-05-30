import { SelectKeyValueOptions, SelectOption } from '../classes/index';
import { EasyField } from '../baseClasses/easy-field';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';

export class EasySelectKeyValueField<T> extends EasyField {
  controlType = 'select-key-value';
  isAsync: boolean;
  itemsAsync: Observable<SelectOption<T>[]>;

  constructor(options: SelectKeyValueOptions<T> = {}) {
    super(options);
    options.controlType = this.controlType;
    
    this.isAsync = options.isAsync;
    this.itemsAsync = options.itemsAsync;
  }

  clearItems(items: Array<T>) {
    this.items = [];
  }

  setItems(items: Array<T>) {
    this.items = items;
  }
}

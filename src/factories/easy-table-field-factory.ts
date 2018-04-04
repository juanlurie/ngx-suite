import { Observable, Subject } from 'rxjs/Rx';
import { PageEvent } from '@angular/material';

import { EasyAutocompleteKeyValueField, EasyAutocompleteField, EasyInputField, EasyCheckboxField, EasyButtonField, EasyDatePickerField, EasySelectField, EasySelectKeyValueField, EasyRadioButtonField, EasyFileUploadField } from '../factories/index';
import { TableFieldOptions, FieldOptions, ColumnTypes, SelectOption } from '../classes/index';
import { EasyForm } from '../baseClasses/easy-form';
import { EasyField } from '../baseClasses/easy-field';

export class EasyTableField extends EasyField {
  controlType = 'table';

  columns: Array<EasyField> = [];
  rows: Array<any> = [];
  actions: Array<EasyField> = [];

  private pageChangeSubject = new Subject<EasyTableField>();
  public onPageChange = this.pageChangeSubject.asObservable();

  constructor(options: TableFieldOptions = {}) {
    super(options);

    this.pageIndex = options.pageIndex;
    this.pageSize = options.pageSize;
    this.totalItems = options.totalItems;
  }

  /**
   * @deprecated. Please use addAction.
  */
  addButton(label: string, action: Function, options: FieldOptions<any> = {}) {
    options.action = action;
    options.label = label;
    this.actions.push(new EasyButtonField(options));
  }

  addAction(label: string, action: Function, options: FieldOptions<any> = {}) {
    options.action = action;
    options.label = label;
    this.actions.push(new EasyButtonField(options));
  }

  addColumn(key: string, label: string, options: FieldOptions<string> = {}) {
    options.key = key;
    options.label = label;
    this.columns.push(new EasyField(options));
  }

  addInputField<T>(key: string, label: string, options: FieldOptions<T> = {}): EasyInputField {
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;

    let field: any = new EasyInputField(options);

    this.addField(field);

    return field;
  }

  addSelectField(key: string, label: string, items: Array<string>, options: FieldOptions<string> = {}): EasySelectField {
    options.items = items;
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;
    let field: any = new EasySelectField(options);

    this.addField(field);

    return field;
  }

  addAutocompleteKeyValueField<T>(key: string, label: string, items: Array<SelectOption<T>>, options: FieldOptions<T> = {}): EasyAutocompleteKeyValueField<T> {
    options.items = items;
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;
    let field: any = new EasyAutocompleteKeyValueField(options);

    this.addField(field);

    return field;
  }

  addAutocompleteField<T>(key: string, label: string, items: Array<T>, options: FieldOptions<T> = {}): EasyAutocompleteField {
    options.items = items;
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;
    let field: any = new EasyAutocompleteField(options);

    this.addField(field);

    return field;
  }

  addFileUploadField(key: string, label: string, options: FieldOptions<any> = {}): EasyFileUploadField {
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;
    let field: any = new EasyFileUploadField(options);

    this.addField(field);

    return field;
  }

  addCheckboxField(key: string, label: string, options: FieldOptions<boolean> = {}): EasyCheckboxField {
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;
    let field: any = new EasyCheckboxField(options);

    this.addField(field);

    return field;
  }

  addSelectKeyValueField<T>(key: string, label: string, items: Array<SelectOption<T>>, options: FieldOptions<T> = {}): EasySelectKeyValueField<T> {
    options.items = items;
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;
    let field: any = new EasySelectKeyValueField(options);
    this.addField(field);

    return field;
  }

  addRadioButtonField<T>(key: string, label: string, items: Array<SelectOption<T>>, options: FieldOptions<T> = {}): EasyRadioButtonField {
    options.items = items;
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;
    let field: any = new EasyRadioButtonField(options);

    this.addField(field);

    return field;
  }

  addDatePickerField(key: string, label: string, options: FieldOptions<Date> = {}): EasyDatePickerField {
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;
    let field: any = new EasyDatePickerField(options);

    this.addField(field);

    return field;
  }

  addTextLabelField(key: string, label: string, options: FieldOptions<string> = {}): EasyInputField {
    options.key = key;
    options.label = label;
    options.type = ColumnTypes.column_type_control;
    options.readonly = true;

    let field: any = new EasyInputField(options);

    this.addField(field);

    return field;
  }

  private addField(field: EasyField) {
    this.setDefaultKey(field);

    this.columns.push(field);
  }

  private setDefaultKey(field: EasyField) {
    if (field.key == "") {
      let similarFields = this.columns.filter(x => x.controlType == field.controlType);
      field.key = field.controlType + "_" + similarFields.length;
    }
  }

  setRows(rows: Array<any>) {
    this.rows = rows;
  }

  addRows(rows: Array<any>) {
    for (let row of rows) {
      this.rows.push(row);
    }
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.totalItems = event.length;
    this.pageChangeSubject.next(<EasyTableField>{ columns: this.columns, rows: this.rows, actions: this.actions, pageIndex: this.pageIndex, pageSize: this.pageSize, totalItems: this.totalItems });
  }
}

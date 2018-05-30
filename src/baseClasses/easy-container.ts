import { OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorType, ContainerValidation } from '../services/validation.service';
import { MultipleFieldsWithSameKeyExistException } from '../classes/exceptions'
import { EasyCardField } from '../factories/easy-card-factory';
import { EasyForm } from '../baseClasses/easy-form';
import { EasyField } from '../baseClasses/easy-field';

import { EasyTabField, EasyExpansionPanelField, EasyAccordionField } from '../factories/easy-card-factory';

import {
    IEasyContainerGroup,
    CheckboxListItem,
} from '../index'
import {
    KeyValue,
    TableFieldOptions,
    FieldOptions,
    SelectOption,
    SelectKeyValueOptions
} from '../classes/index'

import { EasyTableField } from '../factories/easy-table-field-factory';

import {
    EasyDividerField,
    EasyDateTimePickerField,
    EasyCheckBoxGroupField,
    EasyCheckboxField,
    EasyRecordField,
    EasyInputField,
    EasyAutocompleteField,
    EasyAutocompleteKeyValueField,
    EasyFileUploadField,
    EasyRadioButtonField,
    EasyTextAreaField,
    EasyButtonField,
    EasySelectKeyValueField,
    EasySelectField,
    EasyDatePickerField
} from '../factories/index';

export class EasyContainer extends ContainerValidation {
    form: EasyForm;
    public useGrid: boolean = false;
    fields: EasyField[] = []
    actions: EasyField[] = [];
    show: boolean = true;
    containers: EasyContainer[] = [];
    controlType: string;
    readonly: boolean;

    xsColumnSize: string = "100%";
    smColumnSize: string = "100%";
    mdColumnSize: string = "100%";
    lgColumnSize: string = "100%";
    xlColumnSize: string = "100%";
    xsSize: string = "100%";
    smSize: string = "100%";
    mdSize: string = "100%";
    lgSize: string = "100%";
    xlSize: string = "100%";
    order: number = 0;
    marginRight: string;
    marginLeft: string;
    paddingRight: string;
    paddingLeft: string;

    constructor(public header: string, options: FieldOptions<any>, form: EasyForm, controlType: string) {
        super();
        this.controlType = controlType;
        this.useGrid = this.fields.filter(x => x.controlType == 'table').length == 0;
        this.form = form;

        this.order = options.order || 0;
        this.xsColumnSize = options.xsColumnSize || "100%";
        this.smColumnSize = options.smColumnSize || "100%";
        this.mdColumnSize = options.mdColumnSize || "100%";
        this.lgColumnSize = options.lgColumnSize || "100%";
        this.xlColumnSize = options.xlColumnSize || "100%";
        this.xsSize = options.xsSize || "100%";
        this.smSize = options.smSize || "100%";
        this.mdSize = options.mdSize || "100%";
        this.lgSize = options.lgSize || "100%";
        this.xlSize = options.xlSize || "100%";
        this.marginRight = options.marginRight || "";
        this.marginLeft = options.marginLeft || "";
        this.paddingLeft = options.paddingLeft || "";
        this.paddingRight = options.paddingRight || "";
        this.show = !options.hide;
    }

    public validateFields(): { valid: boolean, invalidFields: Array<EasyField> } {
        return super.validateContainerFields(this.fields);
    }

    public showContainer() {
        this.show = true;
    }

    public hideContainer() {
        this.show = false;
    }

    protected addContainer(container: EasyContainer) {
        this.containers.add(container);
    }

    getXlColumnSize(field: EasyField) {
        if (field.xlColumnSize == null || field.xlColumnSize == "")
            return this.xlColumnSize;
        return field.xlColumnSize;
    }

    getLgColumnSize(field: EasyField) {
        if (field.lgColumnSize == null || field.lgColumnSize == "")
            return this.lgColumnSize;
        return field.lgColumnSize;
    }

    getMdColumnSize(field: EasyField) {
        if (field.mdColumnSize == null || field.mdColumnSize == "")
            return this.mdColumnSize;
        return field.mdColumnSize;
    }

    getSmColumnSize(field: EasyField) {
        if (field.smColumnSize == null || field.smColumnSize == "")
            return this.smColumnSize;
        return field.smColumnSize;
    }

    getXsColumnSize(field: EasyField) {
        if (field.xsColumnSize == null || field.xsColumnSize == "")
            return this.xsColumnSize;
        return field.xsColumnSize;
    }

    addField(field: EasyField) {
        this.form.setDefaultKey(field);

        this.fields.push(field);
        this.form.addField(field);
    }

    addActionField(field: EasyField) {
        this.form.setDefaultKey(field);

        this.actions.push(field);
        this.form.addField(field);
    }

    addAutocompleteKeyValueField<T>(label: string, items: Array<SelectOption<T>>, options: FieldOptions<T> = {}): EasyAutocompleteKeyValueField<T> {
        options.items = items;
        options.label = label
        let field: any = new EasyAutocompleteKeyValueField(options);

        this.addField(field);

        return field;
    }

    addAutocompleteField<T>(label: string, items: Array<T>, options: FieldOptions<T> = {}): EasyAutocompleteField {
        options.items = items;
        options.label = label
        let field: any = new EasyAutocompleteField(options);

        this.addField(field);

        return field;
    }

    addInputField<T>(label: string, options: FieldOptions<T> = {}): EasyInputField {
        options.label = label;

        let field: any = new EasyInputField(options);

        this.addField(field);

        return field;
    }

    addFileUploadField(label: string, options: FieldOptions<any> = {}): EasyFileUploadField {
        options.label = label;
        let field: any = new EasyFileUploadField(options);

        this.addField(field);

        return field;
    }

    addRecordField(url: string, options: FieldOptions<string> = {}): EasyRecordField {

        let field: any = new EasyRecordField(url, options);

        this.addField(field);

        return field;
    }

    addTextAreaField(label: string, options: FieldOptions<string> = {}): EasyInputField {
        options.label = label;

        let field: any = new EasyTextAreaField(options);

        this.addField(field);

        return field;
    }

    addTableField(options: TableFieldOptions = {}): EasyTableField {
        let field: any = new EasyTableField(options);

        this.addField(field);

        return field;
    }

    addCheckBoxField(label: string, options: FieldOptions<boolean> = {}): EasyCheckboxField {
        options.label = label

        let field: any = new EasyCheckboxField(options);

        this.addField(field);

        return field;
    }

    addCheckBoxGroupField(label: string, items: Array<CheckboxListItem>, options: FieldOptions<Array<string>> = {}): EasyCheckBoxGroupField {
        options.label = label
        options.items = items;

        let field: any = new EasyCheckBoxGroupField(options);

        this.addField(field);

        return field;
    }

    addSelectField(label: string, items: Array<string>, options: FieldOptions<string> = {}): EasySelectField {
        options.items = items;
        options.label = label
        let field: any = new EasySelectField(options);

        this.addField(field);

        return field;
    }

    addSelectKeyValueFieldAsync<T>(label: string, items: Observable<Array<SelectOption<T>>>, options: SelectKeyValueOptions<T> = {}): EasySelectKeyValueField<T> {
        options.isAsync = true;
        options.itemsAsync = items;
        options.label = label
        let field: any = new EasySelectKeyValueField(options);
        this.addField(field);

        return field;
    }

    addSelectKeyValueField<T>(label: string, items: Array<SelectOption<T>>, options: SelectKeyValueOptions<T> = {}): EasySelectKeyValueField<T> {
        options.items = items;
        options.label = label
        let field: any = new EasySelectKeyValueField(options);
        this.addField(field);

        return field;
    }

    addRadioButtonField<T>(label: string, items: Array<SelectOption<T>>, options: FieldOptions<T> = {}): EasyRadioButtonField {
        options.items = items;
        options.label = label
        let field: any = new EasyRadioButtonField(options);

        this.addField(field);

        return field;
    }

    addButtonField(label: string, action: Function, options: FieldOptions<any> = {}): EasyButtonField {
        options.label = label;
        options.action = action;

        let field: any = new EasyButtonField(options);

        this.addField(field);

        return field;
    }

    addDividerField(options: FieldOptions<any> = {}): EasyDividerField {

        let field: any = new EasyDividerField(options);

        this.addField(field);

        return field;
    }

    addAction(label: string, action: Function, options: FieldOptions<any> = {}): EasyButtonField {
        options.label = label;
        options.action = action;

        let field: any = new EasyButtonField(options);

        this.addActionField(field);

        return field;
    }

    addDatePickerField(label: string, options: FieldOptions<Date> = {}): EasyDatePickerField {
        options.label = label;
        let field: any = new EasyDatePickerField(options);

        this.addField(field);

        return field;
    }

    addDateTimePickerField(label: string, options: FieldOptions<Date> = {}): EasyDateTimePickerField {
        options.label = label;
        let field = new EasyDateTimePickerField(options);

        this.addField(field);

        return field;
    }

    addLabelField(label: string, options: FieldOptions<string> = {}): EasyInputField {
        options.label = label;
        options.readonly = true;

        let field: any = new EasyInputField(options);

        this.addField(field);

        return field;
    }

    addTextLabelField(label: string, options: FieldOptions<string> = {}): EasyInputField {
        options.label = label;
        options.readonly = true;

        let field: any = new EasyInputField(options);

        this.addField(field);

        return field;
    }

    public mapFields<T>(dto: T) {
        Object.keys(dto).forEach(key => {
            let field = this.fetchField(key)
            if (field != null)
                dto[key] = field.value;
        });
    }

    public mapFieldsFromDto<T>(dto: T) {
        Object.keys(dto).forEach(key => {
            let field = this.fetchField(key)
            if (field != null)
                field.value = dto[key];
        });
    }

    public fetchField(key: string): EasyField {
        let field = this.fields.singleOrDefault(x => x.key == key);

        return field;
    }
}

export class ModalContainer extends EasyContainer {

    addField(field: EasyField) {
        this.form.setDefaultKey(field);

        this.fields.push(field);
    }
}

import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { FieldWithKeyDoesNotExistException, FieldWithSameKeyAlreadyExistsException, MultipleFieldsWithSameKeyExistException } from '../classes/exceptions';
import { EasyButtonField } from '../factories/index'

import { EasyTabField, EasyExpansionPanelField, EasyAccordionField } from '../factories/easy-card-factory';
import { EasyStepperField } from '../factories/easy-stepper-field-factory';

import { EasyCardField } from '../factories/easy-card-factory';
import { EasyToolbarContainer, EasyToolbar } from '../baseClasses/index'
import { ModalContainer } from '../baseClasses/easy-container'
import { EasyField } from '../baseClasses/easy-field';
import { EasyContainer } from '../baseClasses/easy-container'
import { FieldOptions, KeyValue } from '../classes/index'

export class EasyForm implements OnDestroy {
  public toolbarContainers: EasyToolbarContainer[] = [];
  private containers: EasyContainer[] = [];
  private subscriptions: Array<Subscription> = [];
  public fields: Array<EasyField> = [];
  public data: any = {};

  public xsSize: string = "100%";
  public smSize: string = "100%";
  public mdSize: string = "80%";
  public lgSize: string = "60%";
  public xlSize: string = "60%";

  public actions: Array<EasyField> = [];

  public layout: string = "space-between center";

  public getContainers(): EasyContainer[] {
    return this.containers.orderBy(x => x.order);
  }

  public setSize(size: string) {
    this.mdSize = size;
    this.lgSize = size;
    this.xlSize = size;
  }

  public setLayout(layout: string) {
    this.layout = layout;
  }

  public addAction(label: string, action: Function, options: FieldOptions<any> = {}): EasyButtonField {
    options.label = label;
    options.action = action;
    let field: any = new EasyButtonField(options);

    this.actions.push(field);

    return field;
  }

  public addCardContainer(header: string, options: FieldOptions<any> = {}): EasyCardField {
    let container = new EasyCardField(header, options, this);
    this.addContainer(container);

    return container;
  }

  public addTabContainer(header: string, options: FieldOptions<any> = {}): EasyTabField {
    let tabs = new EasyTabField(this, options);
    this.addContainer(tabs);

    return tabs;
  }

  public addStepperContainer(header: string, options: FieldOptions<any> = {}): EasyStepperField {
    let tabs = new EasyStepperField(this, options);
    this.addContainer(tabs);

    return tabs;
  }

  public addAccordionContainer(header: string, options: FieldOptions<any> = {}): EasyAccordionField {
    let accordion = new EasyAccordionField(this, options);
    this.addContainer(accordion);

    return accordion;
  }

  public addExpansionPanelContainer(header: string, options: FieldOptions<any> = {}): EasyExpansionPanelField {
    let tabs = new EasyExpansionPanelField(header, options, this);
    this.addContainer(tabs);

    return tabs;
  }

  public addModalContainer(header: string, options: FieldOptions<any> = {}): EasyContainer {
    let subContainer = new ModalContainer(header, options, this, "modal");

    return subContainer;
  }

  public addToolBarContainer(): EasyToolbar {

    let easyToolbarContainer = new EasyToolbarContainer();

    this.toolbarContainers.push(easyToolbarContainer);

    let toolbar = easyToolbarContainer.addToolBar(this);

    return toolbar;
  }

  public validateForm(): { valid: boolean, invalidFields: Array<EasyField> } {

    let invalidFields = this.validateContainers(this.containers);

    return { valid: invalidFields.length == 0, invalidFields: invalidFields };
  }

  validateContainers(containers: EasyContainer[]) {
    let invalidFields: Array<EasyField> = [];

    for (let container of containers) {

      let validationResult = container.validateFields();
      invalidFields.addRange(validationResult.invalidFields);
      invalidFields.addRange(this.validateContainers(container.containers));
    }

    return invalidFields;
  }

  private addContainer(container: EasyContainer) {
    this.containers.push(container);
    this.addSubscriptions(container.fields);
    this.addFields(container.fields);

    if (container.containers != null && container.containers.any()) {
      container.containers.forEach(x => this.addContainer(x));
    }
  }

  private addSubscriptions(fields: Array<EasyField>) {
    for (let field of fields) {
      let subscription = field.onChange.subscribe(x => {
        this.updateField(x);

        if (this.data != null) {
          Object.keys(this.data).forEach(key => {
            let field = this.fields.singleOrDefault(x => x.key == key);
            if (field != null)
              this.data[key] = field.value;
          });
        }

      });

      this.subscriptions.push(subscription);
    }
  }

  private addFields(fields: EasyField[]) {
    fields.forEach(x => this.addField(x));
  }

  public mapFields<T>(dto: T) {
    Object.keys(dto).forEach(key => {
      let field = this.fetchField(key)
      if (field != null)
        dto[key] = field.value;
    });
  }

  public fetchField(key: string): EasyField {
    let fields = this.fields.filter(x => x.key == key);

    if (fields.length > 1)
      throw new MultipleFieldsWithSameKeyExistException(key);

    if (fields.length == 0)
      return null;

    return fields[0];
  }

  public fetchFieldValue(key: string): any {
    let fields = this.fields.filter(x => x.key == key);

    if (fields.length > 1)
      throw new MultipleFieldsWithSameKeyExistException(key);

    if (fields.length == 0)
      return null;

    return fields[0].value;
  }

  addField(field: EasyField) {

    if (field.controlType == "button")
      return;

    this.checkFieldAlreadyExists(field.key);

    this.fields.push(field);

    this.addSubscription(field);
  }

  private checkFieldAlreadyExists(key: string) {
    let existingFields = this.fields.filter(x => x.key == key);

    if (existingFields.length > 0)
      throw new FieldWithSameKeyAlreadyExistsException(key);
  }

  private addSubscription(field: EasyField) {
    let subscription = field.onChange.subscribe(x => {
      this.updateField(x);
    });
  }

  private updateField(field: EasyField) {
    let fields = this.fields.filter(x => x.key == field.key);
    if (fields.length > 1)
      throw new MultipleFieldsWithSameKeyExistException(field.key);

    if (fields.length == 0)
      throw new FieldWithKeyDoesNotExistException(field.key);

    fields[0].value = field.value;

    if (fields[0].updateAction != null)
      fields[0].updateAction(field);
  }

  public setDefaultKey(field: EasyField) {
    if (field.key == "") {
      let similarFields = this.fields.filter(x => x.controlType == field.controlType);
      field.key = field.controlType + "_" + similarFields.length;
    }
  }

  setData(data: any) {

    if (data != null) {
      this.data = data;
      Object.keys(this.data).forEach(key => {
        let field = this.fetchField(key)
        if (field != null)
          field.value = this.data[key];
      });
    }
  }

  enableReadonlyMode() {
    this.containers.forEach(x => {
      x.readonly = true;
    });
  }

  disableReadonlyMode() {
    this.containers.forEach(x => {
      x.readonly = false;
    });
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}

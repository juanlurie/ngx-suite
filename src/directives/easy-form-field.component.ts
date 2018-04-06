import { Component, Input } from '@angular/core';
import { EasyField } from '../baseClasses/easy-field';
import { FieldChangeDto } from '../classes/index';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'easy-form-field',
  template: `<div [ngSwitch]="field.controlType">
  
    <easy-input [key]="field.key"  *ngSwitchCase="'textbox'" [readonly]="containerReadonly || field.readonly" [validators]="field.validators" [maxLength]="field.maxLength" [placeholder]="field.label" [value]="field.value" (fieldValueChange)="valueChanged($event)" [type]="field.type" [options]="field.pristine" [hint]="field.hint" [onEnter]="field.onEnter"></easy-input>
    
    <easy-text-area [key]="field.key" [height]="field.height" [minHeight]="field.minHeight" [maxHeight]="field.maxHeight" *ngSwitchCase="'textArea'" [readonly]="containerReadonly || field.readonly" [validators]="field.validators" [maxLength]="field.maxLength" [placeholder]="field.label" [value]="field.value" (fieldValueChange)="valueChanged($event)" [options]="field.pristine"></easy-text-area>
  
    <easy-select [key]="field.key" [easy-required]="field.validators" [readonly]="containerReadonly || field.readonly" *ngSwitchCase="'select'" [validators]="field.validators" [placeholder]="field.label" [selectedValue]="field.value" [items]="field.items" (fieldValueChange)="valueChanged($event)" [options]="field.pristine"></easy-select>
  
    <easy-select-key-value [key]="field.key" [easy-required]="field.validators" [readonly]="containerReadonly || field.readonly" [validators]="field.validators" *ngSwitchCase="'select-key-value'" [placeholder]="field.label" [selectedValue]="field.value" [items]="field.items" [itemsAsync]="field.itemsAsync" (fieldValueChange)="valueChanged($event)" [options]="field.pristine" [isAsync]="field.isAsync"></easy-select-key-value>
  
    <easy-radio-button [key]="field.key" [easy-required]="field.validators" [readonly]="containerReadonly || field.readonly" [validators]="field.validators" *ngSwitchCase="'radio-button'" [placeholder]="field.label" [selectedValue]="field.value" [items]="field.items" (fieldValueChange)="valueChanged($event)" [options]="field.pristine"></easy-radio-button>
  
    <easy-checkbox [key]="field.key" *ngSwitchCase="'checkbox'" [readonly]="containerReadonly || field.readonly" [placeholder]="field.label" [(value)]="field.value" (fieldValueChange)="valueChanged($event)" [marginLeft]="field.marginLeft" [marginTop]="field.marginTop" [marginRight]="field.marginRight" [marginBottom]="field.marginBottom"></easy-checkbox>
  
    <easy-checkbox-group [key]="field.key" *ngSwitchCase="'checkbox-group'" [readonly]="containerReadonly || field.readonly" [placeholder]="field.label" [(value)]="field.value" [items]="field.items" (fieldValueChange)="valueChanged($event)"></easy-checkbox-group>
  
    <easy-autocomplete [key]="field.key" *ngSwitchCase="'autocomplete'" [readonly]="containerReadonly || field.readonly" [validators]="field.validators" [placeholder]="field.label" [items]="field.items" [selectedValue]="field.value" (fieldValueChange)="valueChanged($event)" [options]="field.pristine"></easy-autocomplete>
  
    <easy-autocomplete-key-value [key]="field.key" *ngSwitchCase="'autocomplete-key-value'" [readonly]="containerReadonly || field.readonly" [validators]="field.validators" [placeholder]="field.label" [items]="field.items" [selectedValue]="field.value" (fieldValueChange)="valueChanged($event)" [options]="field.pristine"></easy-autocomplete-key-value>
  
    <easy-button [key]="field.key" class="right" *ngSwitchCase="'button'" [color]="field.color" [icon]="field.icon" [type]="field.type" [displayValue]="field.label" [showLoader]="field.showLoader" (onClicked)="executeAction(field.action)"></easy-button>
  
    <easy-table *ngSwitchCase="'table'" [rows]="field.rows" [columns]="field.columns" [actions]="field.actions" [showFilter]="field.showFilter" [showPaginator]="field.showPaginator" [pageIndex]="field.pageIndex" [pageSize]="field.pageSize" [totalItems]="field.totalItems" (fieldValueChange)="valueChanged($event)" (pageChange)="tablePageChanged($event)"></easy-table>
    
    <easy-date-picker [key]="field.key" *ngSwitchCase="'date-picker'" [readonly]="containerReadonly || field.readonly" [placeholder]="field.label" [hint]="field.hint" [value]="field.value" [validators]="field.validators" (fieldValueChange)="valueChanged($event)" [options]="field.pristine"></easy-date-picker>

    <easy-date-time-picker [key]="field.key" *ngSwitchCase="'date-time-picker'" [readonly]="containerReadonly || field.readonly" [placeholder]="field.label" [hint]="field.hint" [value]="field.value" [validators]="field.validators" (fieldValueChange)="valueChanged($event)" [options]="field.pristine"></easy-date-time-picker>    
      
    <easy-fileupload [key]="field.key" *ngSwitchCase="'fileupload'" [readonly]="containerReadonly || field.readonly" [icon]="field.icon" [color]="field.color" [hint]="field.hint" [placeholder]="field.label" (fieldValueChange)="valueChanged($event)" [type]="field.type"></easy-fileupload>  
  
    <easy-record *ngSwitchCase="'record'" [source]="field.url" [authorizationHeader]="field.authorizationHeader"></easy-record>  
  
    <easy-form-content-actions *ngSwitchCase="'actions'" [actions]="field.actions"></easy-form-content-actions>    

    <easy-divider *ngSwitchCase="'divider'"></easy-divider>  
  
  </div>`,
  styles: [`.checkbox-group-container {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }
  
  .easy-checkbox {
    margin-top: 100px;
  }
  
  .button-row {
    display: flex;
    align-items: right;
    justify-content: flex-end;
  }
  
  .easy-date-picker {
    margin-top: 20px;
    width: 100%;
  }
  
  .easy-select {
    margin-top: 20px;
    width: 100%;
  }
  
  .easy-input {
    margin-top: 20px;
    width: 100%;
  }
  
  .easy-autocomplete {
    margin-top: 20px;
    width: 100%;
  }
  
  .easy-button {
    margin: 8px;
    text-transform: uppercase;
  }
  
  .input-icon {
    font-size: 24px;
    height: 24px;
    width: 24px;
  }
  
  .full-width {
    width: 100vw;
  }`]
})
export class EasyFormFieldComponent {
  @Input() field: EasyField;
  @Input() containerReadonly: boolean;

  valueChanged(event: FieldChangeDto) {
    this.field.valueChanged(event);
  }

  executeAction(action: Function) {
    action(this.field);
  }

  tablePageChanged(event: PageEvent) {
    let tableField = <any>this.field;
    tableField.pageChanged(event);
  }
}

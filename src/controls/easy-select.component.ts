import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SelectOption, FieldChangeDto } from '../classes/index'
import { ValidatorService, EasyFieldValidator, ValidatorType, EasyFormComponent } from '../services/validation.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'easy-select',
  template: `<mat-form-field class="easy-select">
                <mat-select [placeholder]="placeholder"  [id]="key" [(ngModel)]="selectedValue" (change)="onChange()" [formControl]="formControl">
                    <mat-option *ngFor="let item of items" [value]="item">
                        {{item}}
                    </mat-option>
                </mat-select>
               </mat-form-field>`,
  styles: [`.easy-select {
                margin-top: 20px;
                width: 100%;
              }`],
  inputs: ['easy-required']
})
export class EasySelectComponent extends EasyFormComponent {
  @Output() fieldValueChange = new EventEmitter<FieldChangeDto>();
  @Input('placeholder') placeholder: string;
  @Input('items') items: Array<string>;
  @Input('selectedValue') selectedValue: any;
  @Input('key') key: string = '';

  constructor(validatorService: ValidatorService) {
    super(validatorService);
  }

  onChange() {
    this.fieldValueChange.emit(new FieldChangeDto(this.key, this.selectedValue, this.formControl.valid));
  }
}

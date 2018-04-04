import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectOption, FieldChangeDto } from '../classes/index'
import { FormControl } from '@angular/forms';
import { ValidatorService, EasyFieldValidator, ValidatorType, EasyFormComponent } from '../services/validation.service'

@Component({
  selector: 'easy-radio-button',
  template: `<mat-radio-group [(ngModel)]="selectedValue" (change)="onChange()" [formControl]="formControl">
                <mat-radio-button *ngFor="let item of items" [value]="item.key">
                   {{item.value}}
                 </mat-radio-button>
               </mat-radio-group>`,
  styles: [``],
  inputs: ['easy-required']
})
export class EasyRadioButtonComponent extends EasyFormComponent {
  @Output() fieldValueChange = new EventEmitter<FieldChangeDto>();
  @Input('placeholder') placeholder: string;
  @Input('selectedValue') selectedValue: any;
  @Input('key') key: string = '';
  @Input('items') items: Array<SelectOption<any>>;

  formControl: FormControl = new FormControl('', []);

  constructor(validatorService: ValidatorService) {
    super(validatorService);
  }

  onChange() {
    this.fieldValueChange.emit(new FieldChangeDto(this.key, this.selectedValue, this.formControl.valid));
  }
}

import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Colors, FieldChangeDto } from '../classes/index';
import { ValidatorService, EasyFieldValidator, ValidatorType, EasyFormComponent } from '../services/validation.service'
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material'

@Component({
  selector: 'easy-date-picker',
  template: `<mat-form-field class="easy-date-picker">
                <input matInput [matDatepicker]="myDatepicker" [placeholder]='placeholder' (change)="onChange()" [formControl]="formControl"/>
                    <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>                    
                    <mat-hint>{{hint}}</mat-hint>
                    <mat-datepicker #myDatepicker (selectedChanged)="onselectedChanged($event)"></mat-datepicker>
                    <mat-error *ngIf="formControl.hasError('required')">{{this.getError('required')}}</mat-error>
                    <mat-error *ngIf="formControl.hasError('maxlength')">{{this.getError('maxlength')}}</mat-error>
                    <mat-error *ngIf="formControl.hasError('minlength')">{{this.getError('minlength')}}</mat-error>
                    <mat-error *ngIf="formControl.hasError('pattern')">{{this.getError('pattern')}}</mat-error>
                </mat-form-field>`,
  styles: [`
                  .easy-date-picker {
                    margin-top: 20px;
                    width: 100%;
                  }`]
})
export class EasyDatePickerComponent extends EasyFormComponent {
  @Output() fieldValueChange = new EventEmitter();
  @Input('placeholder') placeholder: string;
  @Input('value') value: any = null;
  @Input('key') key: string = '';
  @Input('readonly') readonly: boolean;
  @Input('hint') hint: string = '';

  constructor(validatorService: ValidatorService, private dateAdapter: DateAdapter<Date>) {
    super(validatorService);
    this.dateAdapter.setLocale('en-ZA');
  }

  ngOnInit() {
    if (this.readonly)
      this.formControl.disable();

    let date2 = this.dateAdapter.parse(this.value, "dd/MM/yyyy");

    if (this.value == null || this.value == '' || this.value == "Invalid Date")
      this.formControl.setValue(null);
    else
      this.formControl.setValue(date2);

    super.ngOnInit();
  }

  onChange() {
    this.fieldValueChange.emit(new FieldChangeDto(this.key, this.value, this.formControl.valid));
  }

  onselectedChanged(date: Date) {
    let parsedDate = this.dateAdapter.parse(date, "dd/MM/yyyy");
    this.value = date;
    this.formControl.setValue(parsedDate);
    this.formControl.updateValueAndValidity();
    this.fieldValueChange.emit(new FieldChangeDto(this.key, this.value, this.formControl.valid));
  }
}

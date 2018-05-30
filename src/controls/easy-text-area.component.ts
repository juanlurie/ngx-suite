import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ValidatorService, EasyFieldValidator, EasyFormComponent } from '../services/validation.service'
import { FormControl } from '@angular/forms';
import { FieldOptions, FieldChangeDto } from '../classes/index'
import { EasyField } from '../baseClasses/easy-field';

@Component({
  selector: 'easy-text-area',
  template: `<mat-form-field class='easy-input'>
                        <textarea matInput [id]="key" [style.height]="height" [style.min-height]="minHeight" [style.max-height]="maxHeight" [easy-max-length]="maxLength" [placeholder]="placeholder"  [(ngModel)]="value" (change)="onBlur()" [formControl]="formControl"></textarea>
                        <mat-hint *ngIf="maxLength != null && maxLength > 0" align="end">{{value.length}} / {{maxLength}}</mat-hint>
                        <mat-error *ngIf="formControl.hasError('required')">{{this.getError('required')}}</mat-error>
                        <mat-error *ngIf="formControl.hasError('maxlength')">{{this.getError('maxlength')}}</mat-error>
                        <mat-error *ngIf="formControl.hasError('minlength')">{{this.getError('minlength')}}</mat-error>
                        <mat-error *ngIf="formControl.hasError('pattern')">{{this.getError('pattern')}}</mat-error>
               </mat-form-field>`,
  styles: [`.easy-input {
                margin-top: 20px;
                width: 100%;
              }`]
})
export class EasyTextAreaComponent extends EasyFormComponent {
  @Output() fieldValueChange = new EventEmitter<FieldChangeDto>();
  @Input('placeholder') placeholder: string;
  @Input('value') value: string;
  @Input('maxLength') maxLength: number;
  @Input('validators') validators: Array<EasyFieldValidator> = [];
  @Input('key') key: string = '';
  @Input('readonly') readonly: boolean;
  @Input('height') height: boolean;
  @Input('minHeight') minHeight: boolean;
  @Input('maxHeight') maxHeight: boolean;

  formControl: FormControl = new FormControl('', []);

  constructor(validatorService: ValidatorService) {
    super(validatorService);
  }

  ngOnInit() {
    if (this.readonly)
      this.formControl.disable();

    super.ngOnInit();
  }

  onBlur() {
    this.fieldValueChange.emit(new FieldChangeDto(this.key, this.value, this.formControl.valid));
  }
}
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Colors, FieldChangeDto } from '../classes/index';
import { ValidatorService, EasyFieldValidator, ValidatorType, EasyFormComponent } from '../services/validation.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'easy-input',
  template: `<mat-input-container class='easy-input'>
                        <input matInput [id]="key" [easy-max-length]="maxLength" [type]="type" [placeholder]="placeholder"  [(ngModel)]="value" (change)="onChange()" (keyup.enter)="enterKeyPressed()" [formControl]="formControl">
                        <mat-hint *ngIf="maxLength != null && maxLength > 0" align="end">{{value.length}} / {{maxLength}}</mat-hint>
                        <mat-hint *ngIf="hint != null && hint.length > 0" align="start">{{hint}}</mat-hint>
                        <mat-error *ngIf="formControl.hasError('required')">{{this.getError('required')}}</mat-error>
                        <mat-error *ngIf="formControl.hasError('maxlength')">{{this.getError('maxlength')}}</mat-error>
                        <mat-error *ngIf="formControl.hasError('minlength')">{{this.getError('minlength')}}</mat-error>
                        <mat-error *ngIf="formControl.hasError('pattern')">{{this.getError('pattern')}}</mat-error>
               </mat-input-container>`,
  styles: [`.easy-input {
                margin-top: 20px;
                width: 100%;
              }`]
})
export class EasyInputComponent extends EasyFormComponent {
  @Output() fieldValueChange = new EventEmitter<FieldChangeDto>();
  @Input('value') value: string;
  @Input('key') key: string = '';
  @Input('hint') hint: string = '';
  @Input('maxLength') maxLength: number = 0;
  @Input('placeholder') placeholder: string = '';
  @Input('type') type: string = 'text';
  @Input('onEnter') onEnter: Function;

  constructor(validatorService: ValidatorService) {
    super(validatorService);
  }

  onChange() {
    this.fieldValueChange.emit(new FieldChangeDto(this.key, this.value, this.formControl.valid));
  }

  enterKeyPressed() {
    if (!this.onEnter)
      return;

    this.onEnter();
  }
}
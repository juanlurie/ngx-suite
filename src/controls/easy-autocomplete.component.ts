import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { ValidatorService, EasyFieldValidator, EasyFormComponent } from '../services/validation.service'
import { FormControl } from '@angular/forms';
import { SelectOption, FieldChangeDto } from '../classes/index';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'easy-autocomplete',
  template: `<mat-form-field class='easy-autocomplete'>
                    <input matInput [placeholder]="placeholder" [matAutocomplete]="auto" [(ngModel)]="selectedValue" [formControl]="formControl">
                    <mat-error *ngIf="formControl.hasError('required')">{{this.getError('required')}}</mat-error>
                    <mat-autocomplete #auto="matAutocomplete">
                        <mat-option *ngFor="let item of filteredItems | async" [value]="item" (onSelectionChange)="onChange(item)">
                            {{ item }}
                        </mat-option>
                    </mat-autocomplete>
                </mat-form-field>`,
  styles: [`.easy-autocomplete {
                  margin-top: 20px;
                  width: 100%;
                }`]
})
export class EasyAutocompleteComponent extends EasyFormComponent {
  @Input('placeholder') placeholder: string = '';
  @Input('key') key: string = '';
  @Input('selectedValue') selectedValue: any;
  @Input('items') items: string[];
  @Output() fieldValueChange = new EventEmitter<FieldChangeDto>();
  filteredItems: Observable<string[]>;

  constructor(validatorService: ValidatorService) {
    super(validatorService);
    this.filteredItems = this.formControl.valueChanges.pipe(startWith(null)
      , map(x => x ? this.filter(x) : this.items.slice()));
  }

  onChange(item: SelectOption<any>) {
    this.selectedValue = item;
    this.formControl.setValue(item);
    this.formControl.updateValueAndValidity();
    this.fieldValueChange.emit(new FieldChangeDto(this.key, this.selectedValue, this.formControl.valid));
  }

  filter(name: string) {
    return this.items.filter(x =>
      x.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}

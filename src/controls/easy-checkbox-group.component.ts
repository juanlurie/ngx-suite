import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { ValidatorService, EasyFieldValidator, EasyFormComponent } from '../services/validation.service'
import { FormControl } from '@angular/forms';
import { FieldChangeDto } from '../classes/index';

export class CheckboxListItem {
  public checked: boolean;
  constructor(public displayValue: string, public value: string) { }
}

@Component({
  selector: 'easy-checkbox-group',
  template: `<div class="checkbox-group-container">
                <span>{{placeholder}}</span>
                <div *ngFor="let item of checkboxListItems" class="checkbox-group">
                    <mat-checkbox [(ngModel)]="item.checked" (change)="onChange()">
                        {{item.displayValue}} 
                    </mat-checkbox>
               </div>
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
              }`]
})
export class EasyCheckBoxGroupComponent extends EasyFormComponent {
  @Output() fieldValueChange = new EventEmitter();
  @Input('placeholder') placeholder: string;
  @Input('value') value: Array<string> = [];
  @Input('key') key: string = '';
  @Input('items') items: Array<CheckboxListItem> = [];
  checkboxListItems: Array<CheckboxListItem> = [];

  constructor(validatorService: ValidatorService) {
    super(validatorService);
  }

  ngOnInit() {

    if (this.value == null)
      this.value = [];

    for (let item of this.items) {
      let checked = this.value.any(x => x == item.value);

      let checkboxItem = new CheckboxListItem(item.displayValue, item.value);
      checkboxItem.checked = checked;
      this.checkboxListItems.add(checkboxItem);
    }
  }

  onChange() {
    this.value = [];

    for (let item of this.checkboxListItems) {
      if (item.checked)
        this.value.push(item.value);
    }

    this.fieldValueChange.emit(new FieldChangeDto(this.key, this.value, true));
  }
}

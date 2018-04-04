import { Component, Input, Output, OnInit, OnChanges, EventEmitter, IterableDiffers } from '@angular/core';
import { ValidatorService, EasyFieldValidator, EasyFormComponent } from '../services/validation.service'
import { FormControl } from '@angular/forms';
import { SelectOption, FieldChangeDto } from '../classes/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'easy-autocomplete-key-value',
    template: `<mat-form-field class='easy-autocomplete'>
                    <input matInput [placeholder]="placeholder" [matAutocomplete]="auto" [formControl]="formControl">
                    <mat-error *ngIf="formControl.hasError('required')">{{this.getError('required')}}</mat-error>

                    <mat-autocomplete #auto="matAutocomplete">
                        <mat-option *ngFor="let item of filteredItems | async" [value]="item" (onSelectionChange)="onChange(item)">
                            {{ item.value }}
                        </mat-option>
                    </mat-autocomplete>
                </mat-form-field>`,
    styles: [`
      .easy-autocomplete {
        margin-top: 20px;
        width: 100%;
      }`]
})
export class EasyAutocompleteKeyValueComponent extends EasyFormComponent {
    @Input('placeholder') placeholder: string;
    @Input('items') items: Array<SelectOption<any>>;
    @Input('selectedValue') selectedValue: any;
    @Input('key') key: string = '';
    @Output() fieldValueChange = new EventEmitter<FieldChangeDto>();
    filteredItems: Observable<Array<SelectOption<any>>>;
    iterableDiffer: any;
    displayValue: any;

    constructor(validatorService: ValidatorService, private iterableDiffers: IterableDiffers) {
        super(validatorService);
        this.filteredItems = this.formControl.valueChanges.startWith(null)
            .map(x => x && typeof x === 'object' ? x.value : x)
            .map(x => x ? this.filter(x) : this.items.slice());

        this.iterableDiffer = this.iterableDiffers.find([]).create(null);
    }

    displayFn(item: SelectOption<any>): any {
        if (item == null)
            return "";
        return item.value;
    }

    ngDoCheck() {
        let changes = this.iterableDiffer.diff(this.items);
        if (changes) {
            var item = this.items.singleOrDefault(x => x.key == this.selectedValue);
            if (item == null)
                return;

            this.selectedValue = item.key;

            if (this.selectedValue != null && this.selectedValue != "")
                this.onChange(item);
        }
    }

    onChange(item: SelectOption<any>) {
        this.selectedValue = item.key;
        this.formControl.setValue(item.value);
        this.formControl.updateValueAndValidity();
        this.fieldValueChange.emit(new FieldChangeDto(this.key, this.selectedValue, this.formControl.valid));
    }

    filter(name: string) {
        return this.items.filter(x =>
            x.value.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
}

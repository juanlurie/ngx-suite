import { Component, Input, Output, EventEmitter, DoCheck, IterableDiffers } from '@angular/core';
import { SelectOption, FieldChangeDto } from '../classes/index'
import { ValidatorService, EasyFieldValidator, ValidatorType, EasyFormComponent } from '../services/validation.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'easy-select-key-value',
    template: `<mat-form-field class="easy-select">
                <mat-select id="{{key}}" [placeholder]="placeholder"  [(ngModel)]="selectedValue" (change)="onChange()" [formControl]="formControl">
                    <mat-option *ngFor="let item of items" [value]="item.key" id="{{item.key}}">
                    {{item.value}}
                    </mat-option>
                </mat-select>
               </mat-form-field>`,
    styles: [`.easy-select {
                margin-top: 20px;
                width: 100%;
              }`],
    inputs: ['easy-required']
})
export class EasySelectKeyValueComponent extends EasyFormComponent {
    @Output() fieldValueChange = new EventEmitter<FieldChangeDto>();
    @Input('placeholder') placeholder: string;
    @Input('items') items: Array<SelectOption<any>>;
    @Input('selectedValue') selectedValue: any;
    @Input('key') key: string = '';

    iterableDiffer: any;

    constructor(validatorService: ValidatorService, private iterableDiffers: IterableDiffers) {
        super(validatorService);

        this.iterableDiffer = this.iterableDiffers.find([]).create(null);
    }

    ngDoCheck() {
        let changes = this.iterableDiffer.diff(this.items);
        if (changes) {
            var item = this.items.singleOrDefault(x => x.key == this.selectedValue);
            if (item == null)
                return;

            this.selectedValue = item.key;

            if (this.selectedValue != null && this.selectedValue != "")
                this.onChange();
        }

        super.ngDoCheck();
    }

    ngOnInit() {
        super.ngOnInit();

        if (this.selectedValue != null && this.selectedValue != "")
            this.onChange();
    }

    onChange() {

        if (this.items == null || !this.items.any())
            return;

        let selectedItem = this.items.single(x => x.key == this.selectedValue);

        if (selectedItem == null) {
            return;
        }

        this.fieldValueChange.emit(new FieldChangeDto(this.key, this.selectedValue, this.formControl.valid, selectedItem));
    }
}

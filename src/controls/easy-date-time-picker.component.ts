import { FieldChangeDto } from '../classes/index';
import { EventEmitter, Output, Input, Component } from '@angular/core';
import { EasyFormComponent, EasyFieldValidator, ValidatorType, ValidatorService, EasyValidator } from "../services/validation.service";
import { EasyFormFieldComponent } from '../directives/easy-form-field.component';

@Component({
    selector: 'easy-date-time-picker',
    template: `<div fxLayout="row" fxLayoutWrap fxLayoutGap="10px">
            <easy-date-picker fxFlex="47%" [readonly]="readonly" [placeholder]="placeholder" [hint]="hint" [value]="value" [validators]="validators" (fieldValueChange)="dateValueChanged($event)" [options]="options"></easy-date-picker>
        <div fxLayout="row" fxFlex="47%" fxLayoutWrap fxLayoutGap="10px">
            <easy-input fxFlex type="number" [readonly]="readonly" placeholder="Hours" [value]="hourValue" [validators]="hourValidators" (fieldValueChange)="hourValueChanged($event)" [options]="options"></easy-input>
            <easy-input fxFlex type="number" [readonly]="readonly" placeholder="Minutes" [value]="minuteValue" [validators]="minuteValidators" (fieldValueChange)="minuteValueChanged($event)" [options]="options"></easy-input>
            <easy-select fxFlex [easy-required]="validators" [readonly]="readonly" [validators]="validators" placeholder="" [selectedValue]="amPmValue" [items]="timeOfDayItems" (fieldValueChange)="amPmValueChanged($event)" [options]="options"></easy-select>
        </div>
    </div>`
})

export class EasyDateTimePickerComponent extends EasyFormComponent {
    @Output() fieldValueChange = new EventEmitter();
    @Input('hourValue') hourValue: number = 0;
    @Input('minuteValue') minuteValue: number = 0;
    @Input('amPmValue') amPmValue: string = 'AM';

    @Input('readonly') readonly: boolean;
    @Input('hint') hint: string = '';
    @Input('placeholder') placeholder: string;
    @Input('value') value: any = null;
    dateKey: string;

    minuteValid: boolean = false;
    hourValid: boolean = false;
    dateValid: boolean = false;

    timeOfDayItems = ['AM', 'PM'];

    hourValidators: Array<EasyFieldValidator> = [];
    minuteValidators: Array<EasyFieldValidator> = [];

    constructor(validatorService: ValidatorService) {
        super(validatorService);
    }

    ngOnInit() {
        this.hourValidators.add(EasyValidator.Pattern("^([1-9]|1[012])$", "Hour not valid"));
        this.minuteValidators.add(EasyValidator.Pattern("^([0-5]?[0-9]|60)$", "Minute not valid"));

        if (this.validators.any(x => x.validatorType == ValidatorType.required)) {
            this.hourValidators.add(EasyValidator.Required("Hour is required"));
            this.minuteValidators.add(EasyValidator.Required("Minute is required"));
        }

        let date = new Date(this.value);
        let hours = date.getHours();

        this.minuteValue = date.getMinutes();
        if (hours > 12 || hours == 0) {
            this.amPmValue = "PM";
            if (hours == 0)
                this.hourValue = 12;
            else
                this.hourValue = hours - 12;
        }
        else
            this.hourValue = hours;

        super.ngOnInit();
    }

    amPmValueChanged(event: FieldChangeDto) {
        this.amPmValue = event.value;
        this.onChange();
    }

    hourValueChanged(event: FieldChangeDto) {
        this.hourValue = event.value;
        this.hourValid = event.valid;
        this.onChange();
    }

    minuteValueChanged(event: FieldChangeDto) {
        this.minuteValue = event.value;
        this.minuteValid = event.valid;
        this.onChange();
    }

    dateValueChanged(event: FieldChangeDto) {
        this.value = event.value;
        this.dateValid = event.valid;
        this.onChange();
    }

    onChange() {

        if (!this.hourValue || this.hourValue == null)
            this.hourValue = 0;

        if (!this.minuteValue || this.minuteValue == null)
            this.minuteValue = 0;

        let date = new Date(this.value);
        date.setMinutes(this.minuteValue);

        if (this.amPmValue == 'PM')
            if (this.hourValue == 12)
                date.setHours(0);
            else
                date.setHours(this.hourValue + 12);
        else
            date.setHours(this.hourValue);

        let valid = this.dateValid && this.minuteValid && this.hourValid;

        this.fieldValueChange.emit(new FieldChangeDto(this.key, date, valid));
    }

    ngOnChanges(changes: any) {
        this.dateKey = this.dateKey + "1";

        super.ngOnChanges(changes);
    }
}
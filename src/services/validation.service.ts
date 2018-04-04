import { Injectable, OnInit, OnChanges, Input, DoCheck } from '@angular/core';
import { ValidatorFn, FormControl, Validators } from '@angular/forms';
import { EasyTableField } from '../factories/easy-table-field-factory';
import { EasyField } from '../baseClasses/easy-field';

@Injectable()
export class ValidatorService {
    buildValidators(validators: Array<EasyFieldValidator> = [], formControl: FormControl) {

        let formValidators = Array<ValidatorFn>();

        for (let validator of validators) {

            switch (validator.validatorType) {
                case ValidatorType.required:
                    formValidators.push(Validators.required)
                    break;
                case ValidatorType.maxlength:
                    formValidators.push(Validators.maxLength(validator.maxlength))
                    break;
                case ValidatorType.minlength:
                    formValidators.push(Validators.minLength(validator.minlength))
                    break;
                case ValidatorType.pattern:
                    formValidators.push(Validators.pattern(validator.pattern))
                    break;

            }

        }

        formControl.setValidators(formValidators)
    }

    getError(name: string, validators: Array<EasyFieldValidator>) {
        let matchingValidators = validators.filter(x => x.validatorType == name);

        if (matchingValidators.length == 0)
            return "No message configured.";
        Validators.required
        return matchingValidators[0].message;
    }
}

export class EasyFormComponent implements OnChanges, OnInit, DoCheck {

    @Input('validators') validators: Array<EasyFieldValidator> = [];
    @Input('options') options: any;
    @Input('readonly') readonly: boolean;
    @Input('key') key: string;

    formControl: FormControl = new FormControl('', []);

    constructor(public validatorService: ValidatorService) { }

    getError(name: string) {
        return this.validatorService.getError(name, this.validators);
    }

    ngOnInit() {
        if (this.readonly)
            this.formControl.disable();
        else
            this.formControl.enable();

        this.validatorService.buildValidators(this.validators, this.formControl);
    }

    ngOnChanges(changes: any) {
        if (changes == null || changes.options == null || changes.options.currentValue)
            return;

        this.formControl.markAsTouched();
        this.formControl.markAsDirty();
        this.formControl.updateValueAndValidity();
    }

    ngDoCheck() {
        if (this.readonly)
            this.formControl.disable();
        else
            this.formControl.enable();
    }
}

export class EasyValidator {
    static Required(message: string) {
        return new EasyFieldValidator().requiredValidator(message);
    }

    static MinLength(length: number, message: string) {
        return new EasyFieldValidator().minLengthValidator(length, message);
    }

    static MaxLength(length: number, message: string) {
        return new EasyFieldValidator().maxLengthValidator(length, message);
    }

    static Pattern(pattern: RegExp | string, message: string) {
        return new EasyFieldValidator().patternValidator(pattern, message);
    }

    static Email(message: string) {
        if (message == "" || message == null)
            message = "Email is not in correct format";
        return new EasyFieldValidator().patternValidator(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message);
    }

    static TelephoneNumber(message: string) {
        if (message == "" || message == null)
            message = "Telephone number is not in correct format"
        return new EasyFieldValidator().patternValidator(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/, message);
    }

    static IdentityNumber(message: string) {
        if (message == "" || message == null)
            message = "Identity number is not in correct format"
        return new EasyFieldValidator().patternValidator(/^([0-9]){2}([0-1][0-9])([0-3][0-9])([0-9]){4}([0-1])([0-9]){2}?$/, message);
    }
}

export class ContainerValidation {
    public validateContainerFields(fields: Array<EasyField>): { valid: boolean, invalidFields: Array<EasyField> } {
        let valid = false;

        let invalidFields: EasyField[] = [];

        this.validateTableFields(fields, invalidFields);

        invalidFields.addRange(fields.filter(x => !this.validateField(x)));

        return { valid: invalidFields.length == 0, invalidFields: invalidFields };
    }

    private validateTableFields(fields: Array<EasyField>, invalidFields: Array<EasyField>) {
        let tableFields = <EasyTableField[]>fields.where(x => x.controlType == "table");
        tableFields.forEach(x => {
            x.columns.forEach(field => {
                var validationResult = this.validateField(field);
                if (!validationResult)
                    invalidFields.add(field);
            })
        });
    }

    private validateField(field: EasyField): boolean {
        let result = true;

        if (field.value == null)
            field.value = "";

        field.value = field.value.toString().trim();

        if (field.hide) {
            result = true;
        }
        else if (!field.required && field.value == "") {
            result = true;
        }
        else if (field.easyValidators != null && field.easyValidators.any()) {
            result = this.runFieldValidation(field);
        }

        if (!result && field.easyValidators.any()) {
            field.pristine = false;
        }

        return result;
    }

    private runFieldValidation(field: EasyField): boolean {

        for (let validator of field.easyValidators) {
            switch (validator.validatorType) {
                case ValidatorType.required: if (field.value == null || field.value == "" || field.value == "0")
                    return false;
                    break;
                case ValidatorType.minlength: if (field.value == null || field.value.length < validator.minlength)
                    return false;
                    break;
                case ValidatorType.maxlength: if (field.value == null || field.value.length > validator.maxlength)
                    return false;
                    break;
                case ValidatorType.pattern:
                    let pattern = new RegExp(validator.pattern);

                    var result = pattern.test(field.value)
                    if (!result)
                        return result;

                    break;

            }

        }
        return true;
    }
}

export class EasyFieldValidator {
    public validatorType: ValidatorType
    public message: string
    public maxlength: number
    public minlength: number
    public pattern: RegExp | string

    requiredValidator(message: string) {
        this.validatorType = ValidatorType.required;
        this.message = message;

        return this;
    }

    maxLengthValidator(length: number, message: string) {
        this.validatorType = ValidatorType.maxlength;
        this.maxlength = length;
        this.message = message;

        return this;
    }

    minLengthValidator(length: number, message: string) {
        this.validatorType = ValidatorType.minlength;
        this.minlength = length;
        this.message = message;

        return this;
    }

    patternValidator(pattern: RegExp | string, message: string) {
        this.validatorType = ValidatorType.pattern;
        this.pattern = pattern;
        this.message = message;

        return this;
    }
}

export class ValidatorType {
    static required: string = 'required';
    static maxlength: string = 'maxlength';
    static minlength: string = 'minlength';
    static pattern: string = 'pattern';
}
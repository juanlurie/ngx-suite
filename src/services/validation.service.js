"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ValidatorService = (function () {
    function ValidatorService() {
    }
    ValidatorService.prototype.buildValidators = function (validators, formControl) {
        if (validators === void 0) { validators = []; }
        var formValidators = Array();
        for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
            var validator = validators_1[_i];
            switch (validator.validatorType) {
                case ValidatorType.required:
                    formValidators.push(forms_1.Validators.required);
                    break;
                case ValidatorType.maxlength:
                    formValidators.push(forms_1.Validators.maxLength(validator.maxlength));
                    break;
                case ValidatorType.minlength:
                    formValidators.push(forms_1.Validators.minLength(validator.minlength));
                    break;
                case ValidatorType.pattern:
                    formValidators.push(forms_1.Validators.pattern(validator.pattern));
                    break;
            }
        }
        formControl.setValidators(formValidators);
    };
    ValidatorService.prototype.getError = function (name, validators) {
        var matchingValidators = validators.filter(function (x) { return x.validatorType == name; });
        if (matchingValidators.length == 0)
            return "No message configured.";
        forms_1.Validators.required;
        return matchingValidators[0].message;
    };
    return ValidatorService;
}());
ValidatorService = __decorate([
    core_1.Injectable()
], ValidatorService);
exports.ValidatorService = ValidatorService;
var EasyFormComponent = (function () {
    function EasyFormComponent(validatorService) {
        this.validatorService = validatorService;
        this.validators = [];
        this.formControl = new forms_1.FormControl('', []);
    }
    EasyFormComponent.prototype.getError = function (name) {
        return this.validatorService.getError(name, this.validators);
    };
    EasyFormComponent.prototype.ngOnInit = function () {
        if (this.readonly)
            this.formControl.disable();
        else
            this.formControl.enable();
        this.validatorService.buildValidators(this.validators, this.formControl);
    };
    EasyFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes == null || changes.options == null || changes.options.currentValue)
            return;
        this.formControl.markAsTouched();
        this.formControl.markAsDirty();
        this.formControl.updateValueAndValidity();
    };
    EasyFormComponent.prototype.ngDoCheck = function () {
        if (this.readonly)
            this.formControl.disable();
        else
            this.formControl.enable();
    };
    return EasyFormComponent;
}());
__decorate([
    core_1.Input('validators'),
    __metadata("design:type", Array)
], EasyFormComponent.prototype, "validators", void 0);
__decorate([
    core_1.Input('options'),
    __metadata("design:type", Object)
], EasyFormComponent.prototype, "options", void 0);
__decorate([
    core_1.Input('readonly'),
    __metadata("design:type", Boolean)
], EasyFormComponent.prototype, "readonly", void 0);
__decorate([
    core_1.Input('key'),
    __metadata("design:type", String)
], EasyFormComponent.prototype, "key", void 0);
exports.EasyFormComponent = EasyFormComponent;
var EasyValidator = (function () {
    function EasyValidator() {
    }
    EasyValidator.Required = function (message) {
        return new EasyFieldValidator().requiredValidator(message);
    };
    EasyValidator.MinLength = function (length, message) {
        return new EasyFieldValidator().minLengthValidator(length, message);
    };
    EasyValidator.MaxLength = function (length, message) {
        return new EasyFieldValidator().maxLengthValidator(length, message);
    };
    EasyValidator.Pattern = function (pattern, message) {
        return new EasyFieldValidator().patternValidator(pattern, message);
    };
    EasyValidator.Email = function (message) {
        if (message === void 0) { message = "Email is not in correct format"; }
        return new EasyFieldValidator().patternValidator(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message);
    };
    EasyValidator.TelephoneNumber = function (message) {
        if (message === void 0) { message = "Telephone number is not in correct format"; }
        return new EasyFieldValidator().patternValidator(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/, message);
    };
    EasyValidator.IdentityNumber = function (message) {
        if (message === void 0) { message = "Identity number is not in correct format"; }
        return new EasyFieldValidator().patternValidator(/^([0-9]){2}([0-1][0-9])([0-3][0-9])([0-9]){4}([0-1])([0-9]){2}?$/, message);
    };
    return EasyValidator;
}());
exports.EasyValidator = EasyValidator;
var ContainerValidation = (function () {
    function ContainerValidation() {
    }
    ContainerValidation.prototype.validateContainerFields = function (fields) {
        var _this = this;
        var valid = false;
        var invalidFields = [];
        this.validateTableFields(fields, invalidFields);
        invalidFields.addRange(fields.filter(function (x) { return !_this.validateField(x); }));
        return { valid: invalidFields.length == 0, invalidFields: invalidFields };
    };
    ContainerValidation.prototype.validateTableFields = function (fields, invalidFields) {
        var _this = this;
        var tableFields = fields.where(function (x) { return x.controlType == "table"; });
        tableFields.forEach(function (x) {
            x.columns.forEach(function (field) {
                var validationResult = _this.validateField(field);
                if (!validationResult)
                    invalidFields.add(field);
            });
        });
    };
    ContainerValidation.prototype.validateField = function (field) {
        var result = true;
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
    };
    ContainerValidation.prototype.runFieldValidation = function (field) {
        for (var _i = 0, _a = field.easyValidators; _i < _a.length; _i++) {
            var validator = _a[_i];
            switch (validator.validatorType) {
                case ValidatorType.required:
                    if (field.value == null || field.value == "" || field.value == "0")
                        return false;
                    break;
                case ValidatorType.minlength:
                    if (field.value == null || field.value.length < validator.minlength)
                        return false;
                    break;
                case ValidatorType.maxlength:
                    if (field.value == null || field.value.length > validator.maxlength)
                        return false;
                    break;
                case ValidatorType.pattern:
                    var pattern = new RegExp(validator.pattern);
                    var result = pattern.test(field.value);
                    if (!result)
                        return result;
                    break;
            }
        }
        return true;
    };
    return ContainerValidation;
}());
exports.ContainerValidation = ContainerValidation;
var EasyFieldValidator = (function () {
    function EasyFieldValidator() {
    }
    EasyFieldValidator.prototype.requiredValidator = function (message) {
        this.validatorType = ValidatorType.required;
        this.message = message;
        return this;
    };
    EasyFieldValidator.prototype.maxLengthValidator = function (length, message) {
        this.validatorType = ValidatorType.maxlength;
        this.maxlength = length;
        this.message = message;
        return this;
    };
    EasyFieldValidator.prototype.minLengthValidator = function (length, message) {
        this.validatorType = ValidatorType.minlength;
        this.minlength = length;
        this.message = message;
        return this;
    };
    EasyFieldValidator.prototype.patternValidator = function (pattern, message) {
        this.validatorType = ValidatorType.pattern;
        this.pattern = pattern;
        this.message = message;
        return this;
    };
    return EasyFieldValidator;
}());
exports.EasyFieldValidator = EasyFieldValidator;
var ValidatorType = (function () {
    function ValidatorType() {
    }
    return ValidatorType;
}());
ValidatorType.required = 'required';
ValidatorType.maxlength = 'maxlength';
ValidatorType.minlength = 'minlength';
ValidatorType.pattern = 'pattern';
exports.ValidatorType = ValidatorType;
//# sourceMappingURL=validation.service.js.map
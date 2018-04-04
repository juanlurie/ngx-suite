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
var easyField_1 = require("../baseClasses/easyField");
var EasyFormFieldComponent = (function () {
    function EasyFormFieldComponent() {
    }
    EasyFormFieldComponent.prototype.valueChanged = function (event) {
        this.field.valueChanged(event);
    };
    EasyFormFieldComponent.prototype.executeAction = function (action) {
        action(this.field);
    };
    EasyFormFieldComponent.prototype.tablePageChanged = function (event) {
        var tableField = this.field;
        tableField.pageChanged(event);
    };
    return EasyFormFieldComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", easyField_1.EasyField)
], EasyFormFieldComponent.prototype, "field", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], EasyFormFieldComponent.prototype, "containerReadonly", void 0);
EasyFormFieldComponent = __decorate([
    core_1.Component({
        selector: 'easy-form-field',
        template: "<div [ngSwitch]=\"field.controlType\">\n  \n    <easy-input [key]=\"field.key\"  *ngSwitchCase=\"'textbox'\" [readonly]=\"containerReadonly || field.readonly\" [validators]=\"field.validators\" [maxLength]=\"field.maxLength\" [placeholder]=\"field.label\" [value]=\"field.value\" (fieldValueChange)=\"valueChanged($event)\" [type]=\"field.type\" [options]=\"field.pristine\" [hint]=\"field.hint\" [onEnter]=\"field.onEnter\"></easy-input>\n    \n    <easy-text-area [key]=\"field.key\" [height]=\"field.height\" [minHeight]=\"field.minHeight\" [maxHeight]=\"field.maxHeight\" *ngSwitchCase=\"'textArea'\" [readonly]=\"containerReadonly || field.readonly\" [validators]=\"field.validators\" [maxLength]=\"field.maxLength\" [placeholder]=\"field.label\" [value]=\"field.value\" (fieldValueChange)=\"valueChanged($event)\" [options]=\"field.pristine\"></easy-text-area>\n  \n    <easy-select [key]=\"field.key\" [easy-required]=\"field.validators\" [readonly]=\"containerReadonly || field.readonly\" *ngSwitchCase=\"'select'\" [validators]=\"field.validators\" [placeholder]=\"field.label\" [selectedValue]=\"field.value\" [items]=\"field.items\" (fieldValueChange)=\"valueChanged($event)\" [options]=\"field.pristine\"></easy-select>\n  \n    <easy-select-key-value [key]=\"field.key\" [easy-required]=\"field.validators\" [readonly]=\"containerReadonly || field.readonly\" [validators]=\"field.validators\" *ngSwitchCase=\"'select-key-value'\" [placeholder]=\"field.label\" [selectedValue]=\"field.value\" [items]=\"field.items\" (fieldValueChange)=\"valueChanged($event)\" [options]=\"field.pristine\"></easy-select-key-value>\n  \n    <easy-radio-button [key]=\"field.key\" [easy-required]=\"field.validators\" [readonly]=\"containerReadonly || field.readonly\" [validators]=\"field.validators\" *ngSwitchCase=\"'radio-button'\" [placeholder]=\"field.label\" [selectedValue]=\"field.value\" [items]=\"field.items\" (fieldValueChange)=\"valueChanged($event)\" [options]=\"field.pristine\"></easy-radio-button>\n  \n    <easy-checkbox [key]=\"field.key\" *ngSwitchCase=\"'checkbox'\" [readonly]=\"containerReadonly || field.readonly\" [placeholder]=\"field.label\" [(value)]=\"field.value\" (fieldValueChange)=\"valueChanged($event)\" [marginLeft]=\"field.marginLeft\" [marginTop]=\"field.marginTop\" [marginRight]=\"field.marginRight\" [marginBottom]=\"field.marginBottom\"></easy-checkbox>\n  \n    <easy-checkbox-group [key]=\"field.key\" *ngSwitchCase=\"'checkbox-group'\" [readonly]=\"containerReadonly || field.readonly\" [placeholder]=\"field.label\" [(value)]=\"field.value\" [items]=\"field.items\" (fieldValueChange)=\"valueChanged($event)\"></easy-checkbox-group>\n  \n    <easy-autocomplete [key]=\"field.key\" *ngSwitchCase=\"'autocomplete'\" [readonly]=\"containerReadonly || field.readonly\" [validators]=\"field.validators\" [placeholder]=\"field.label\" [items]=\"field.items\" [selectedValue]=\"field.value\" (fieldValueChange)=\"valueChanged($event)\" [options]=\"field.pristine\"></easy-autocomplete>\n  \n    <easy-autocomplete-key-value [key]=\"field.key\" *ngSwitchCase=\"'autocomplete-key-value'\" [readonly]=\"containerReadonly || field.readonly\" [validators]=\"field.validators\" [placeholder]=\"field.label\" [items]=\"field.items\" [selectedValue]=\"field.value\" (fieldValueChange)=\"valueChanged($event)\" [options]=\"field.pristine\"></easy-autocomplete-key-value>\n  \n    <easy-button [key]=\"field.key\" class=\"right\" *ngSwitchCase=\"'button'\" [color]=\"field.color\" [icon]=\"field.icon\" [type]=\"field.type\" [displayValue]=\"field.label\" [showLoader]=\"field.showLoader\" (onClicked)=\"executeAction(field.action)\"></easy-button>\n  \n    <easy-table *ngSwitchCase=\"'table'\" [rows]=\"field.rows\" [columns]=\"field.columns\" [actions]=\"field.actions\" [showFilter]=\"field.showFilter\" [showPaginator]=\"field.showPaginator\" [pageIndex]=\"field.pageIndex\" [pageSize]=\"field.pageSize\" [totalItems]=\"field.totalItems\" (fieldValueChange)=\"valueChanged($event)\" (pageChange)=\"tablePageChanged($event)\"></easy-table>\n    \n    <easy-date-picker [key]=\"field.key\" *ngSwitchCase=\"'date-picker'\" [readonly]=\"containerReadonly || field.readonly\" [placeholder]=\"field.label\" [hint]=\"field.hint\" [value]=\"field.value\" [validators]=\"field.validators\" (fieldValueChange)=\"valueChanged($event)\" [options]=\"field.pristine\"></easy-date-picker>\n\n    <easy-date-time-picker [key]=\"field.key\" *ngSwitchCase=\"'date-time-picker'\" [readonly]=\"containerReadonly || field.readonly\" [placeholder]=\"field.label\" [hint]=\"field.hint\" [value]=\"field.value\" [validators]=\"field.validators\" (fieldValueChange)=\"valueChanged($event)\" [options]=\"field.pristine\"></easy-date-time-picker>    \n      \n    <easy-fileupload [key]=\"field.key\" *ngSwitchCase=\"'fileupload'\" [readonly]=\"containerReadonly || field.readonly\" [icon]=\"field.icon\" [color]=\"field.color\" [hint]=\"field.hint\" [placeholder]=\"field.label\" (fieldValueChange)=\"valueChanged($event)\" [type]=\"field.type\"></easy-fileupload>  \n  \n    <easy-record *ngSwitchCase=\"'record'\" [source]=\"field.url\" [authorizationHeader]=\"field.authorizationHeader\"></easy-record>  \n  \n    <easy-form-content-actions *ngSwitchCase=\"'actions'\" [actions]=\"field.actions\"></easy-form-content-actions>    \n\n    <easy-divider *ngSwitchCase=\"'divider'\"></easy-divider>  \n  \n  </div>",
        styles: [".checkbox-group-container {\n    display: flex;\n    flex-direction: column;\n    margin-top: 20px;\n  }\n  \n  .checkbox-group {\n    display: flex;\n    flex-direction: column;\n    padding-left: 20px;\n  }\n  \n  .easy-checkbox {\n    margin-top: 100px;\n  }\n  \n  .button-row {\n    display: flex;\n    align-items: right;\n    justify-content: flex-end;\n  }\n  \n  .easy-date-picker {\n    margin-top: 20px;\n    width: 100%;\n  }\n  \n  .easy-select {\n    margin-top: 20px;\n    width: 100%;\n  }\n  \n  .easy-input {\n    margin-top: 20px;\n    width: 100%;\n  }\n  \n  .easy-autocomplete {\n    margin-top: 20px;\n    width: 100%;\n  }\n  \n  .easy-button {\n    margin: 8px;\n    text-transform: uppercase;\n  }\n  \n  .input-icon {\n    font-size: 24px;\n    height: 24px;\n    width: 24px;\n  }\n  \n  .full-width {\n    width: 100vw;\n  }"]
    })
], EasyFormFieldComponent);
exports.EasyFormFieldComponent = EasyFormFieldComponent;
//# sourceMappingURL=easy-form-field.component.js.map
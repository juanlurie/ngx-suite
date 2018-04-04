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
var easyContainer_1 = require("../baseClasses/easyContainer");
var EasyFormContentComponent = (function () {
    function EasyFormContentComponent() {
    }
    return EasyFormContentComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", easyContainer_1.EasyContainer)
], EasyFormContentComponent.prototype, "container", void 0);
EasyFormContentComponent = __decorate([
    core_1.Component({
        selector: 'easy-form-content',
        template: "<div fxFlex fxLayoutWrap fxLayout style=\"overflow-y:hidden\">\n              <div *ngFor=\"let field of container.fields\" [fxFlex.xl]=\"container.getXlColumnSize(field)\" [fxFlex.lg]=\"container.getLgColumnSize(field)\"\n                  [fxFlex.md]=\"container.getMdColumnSize(field)\" [fxFlex.sm]=\"container.getSmColumnSize(field)\" [fxFlex.xs]=\"container.getXsColumnSize(field)\"\n                  fxLayoutAlign=\"start\">\n                  <easy-form-field fxFlex=\"auto\" *ngIf=\"!field.hide\" style=\"margin-left:10px\" [field]=\"field\" [containerReadonly]=\"container.readonly\"></easy-form-field>\n              </div>\n            </div>",
        styles: [".checkbox-group-container {\n              display: flex;\n              flex-direction: column;\n              margin-top: 20px;\n            }\n            \n            .checkbox-group {\n              display: flex;\n              flex-direction: column;\n              padding-left: 20px;\n            }\n            \n            .easy-checkbox {\n              margin-top: 100px;\n            }\n            \n            .button-row {\n              display: flex;\n              align-items: right;\n              justify-content: flex-end;\n            }\n            \n            .easy-date-picker {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-select {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-input {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-autocomplete {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-button {\n              margin: 8px;\n              text-transform: uppercase;\n            }\n            \n            .input-icon {\n              font-size: 24px;\n              height: 24px;\n              width: 24px;\n            }\n            \n            .full-width {\n              width: 100vw;\n            }"]
    })
], EasyFormContentComponent);
exports.EasyFormContentComponent = EasyFormContentComponent;
//# sourceMappingURL=easy-form-content.component.js.map
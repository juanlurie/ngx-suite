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
var EasyFormContentActionsComponent = (function () {
    function EasyFormContentActionsComponent() {
    }
    EasyFormContentActionsComponent.prototype.click = function (action) {
        action();
    };
    return EasyFormContentActionsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EasyFormContentActionsComponent.prototype, "actions", void 0);
EasyFormContentActionsComponent = __decorate([
    core_1.Component({
        selector: 'easy-form-content-actions',
        template: "<div fxLayout fxLayoutAlign=\"end\" fxLayoutWrap>\n              <div *ngFor=\"let action of actions\">\n                  <easy-button [key]=\"action.key\" *ngIf=\"!action.hide\" [icon]=\"action.icon\" [color]=\"action.color\" [displayValue]=\"action.label\" [type]='action.type'\n                    [showLoader]=\"action.showLoader\" (onClicked)=\"click(action.action)\"></easy-button>\n              </div>\n            </div>",
        styles: [".checkbox-group-container {\n              display: flex;\n              flex-direction: column;\n              margin-top: 20px;\n            }\n            \n            .checkbox-group {\n              display: flex;\n              flex-direction: column;\n              padding-left: 20px;\n            }\n            \n            .easy-checkbox {\n              margin-top: 100px;\n            }\n            \n            .button-row {\n              display: flex;\n              align-items: right;\n              justify-content: flex-end;\n            }\n            \n            .easy-date-picker {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-select {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-input {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-autocomplete {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-button {\n              margin: 8px;\n              text-transform: uppercase;\n            }\n            \n            .input-icon {\n              font-size: 24px;\n              height: 24px;\n              width: 24px;\n            }\n            \n            .full-width {\n              width: 100vw;\n            }"]
    })
], EasyFormContentActionsComponent);
exports.EasyFormContentActionsComponent = EasyFormContentActionsComponent;
//# sourceMappingURL=easy-form-content-actions.component.js.map
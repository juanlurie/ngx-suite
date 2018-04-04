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
var easyForm_1 = require("../baseClasses/easyForm");
var easy_form_service_1 = require("../services/easy-form.service");
var easy_fab_service_1 = require("../services/easy-fab-service");
var EasyFormComponent = (function () {
    function EasyFormComponent(easyFabService) {
        this.easyFabService = easyFabService;
    }
    EasyFormComponent.prototype.ngOnInit = function () {
        this.easyFabService.initialize(this.form.actions);
    };
    EasyFormComponent.prototype.ngOnDestroy = function () {
        this.easyFabService.uninitialize();
    };
    return EasyFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", easyForm_1.EasyForm)
], EasyFormComponent.prototype, "form", void 0);
EasyFormComponent = __decorate([
    core_1.Component({
        selector: 'easy-form',
        template: "<div *ngFor=\"let toolbarContainer of form.toolbarContainers\">\n                          <mat-toolbar color=\"primary\">\n                            <div *ngFor=\"let toolbar of toolbarContainer.toolbars\" class=\"toolbar-row\">\n\n                            <button mat-icon-button [matMenuTriggerFor]=\"toolbarMenu\" *ngFor=\"let menu of toolbar.menus\">\n                              <mat-icon>more_vert</mat-icon>\n                              <mat-menu #toolbarMenu=\"matMenu\">\n                                <button *ngFor=\"let field of menu\" mat-menu-item [disabled]=\"field.show\" (click)=\"field.action()\">\n                                  <span *ngIf=\"!field.show\">{{field.label}}</span>\n                                </button>\n                              </mat-menu>                     \n                            </button>\n\n                            <div *ngFor=\"let field of toolbar.fields\">\n                              <div [ngSwitch]=\"field.controlType\">\n                                <easy-form-field *ngSwitchCase=\"'button'\" [field]=\"field\"></easy-form-field>\n                                <span *ngSwitchCase=\"'toolbar-text'\">\n                                  {{field.label}}\n                                </span>                            \n                              </div>            \n                            </div>\n                            </div>\n                          </mat-toolbar>\n                        </div>\n            \n            <div fxLayout style=\"padding-top:10px;padding-bottom:10px;\" fxLayoutAlign=\"center\">                                      \n                      \n              <div [fxFlex.xl]=\"form.xlSize\" [fxFlex.lg]=\"form.lgSize\" [fxFlex.md]=\"form.mdSize\" [fxFlex.sm]=\"form.smSize\" [fxFlex.xs]=\"form.xsSize\">\n                <easy-container [layout]='form.layout' [containers]='form.getContainers()'></easy-container>\n              </div>\n            </div>",
        styles: [".checkbox-group-container {\n              display: flex;\n              flex-direction: column;\n              margin-top: 20px;\n            }\n\n            .toolbar-row {\n              display: flex;\n              flex-direction: row;\n            }\n            \n            .checkbox-group {\n              display: flex;\n              flex-direction: column;\n              padding-left: 20px;\n            }\n            \n            .easy-checkbox {\n              margin-top: 100px;\n            }\n            \n            .button-row {\n              display: flex;\n              align-items: right;\n              justify-content: flex-end;\n            }\n            \n            .easy-date-picker {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-select {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-input {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-autocomplete {\n              margin-top: 20px;\n              width: 100%;\n            }\n            \n            .easy-button {\n              margin: 8px;\n              text-transform: uppercase;\n            }\n            \n            .input-icon {\n              font-size: 24px;\n              height: 24px;\n              width: 24px;\n            }\n            \n            .full-width {\n              width: 100vw;\n            }"],
        providers: [easy_form_service_1.EasyFormService]
    }),
    __metadata("design:paramtypes", [easy_fab_service_1.EasyFabService])
], EasyFormComponent);
exports.EasyFormComponent = EasyFormComponent;
//# sourceMappingURL=easy-form.component.js.map
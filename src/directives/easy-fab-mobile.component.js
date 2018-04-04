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
var easy_core_1 = require("easy-core");
var easy_fab_service_1 = require("../services/easy-fab-service");
var EasyFabMobileComponent = (function () {
    function EasyFabMobileComponent(loaderService, easyFabService) {
        var _this = this;
        this.loaderService = loaderService;
        this.easyFabService = easyFabService;
        this.actions = [];
        this.easyFabSubscription = easyFabService.initialized.subscribe(function (x) {
            _this.actions = easyFabService.actions;
        });
    }
    EasyFabMobileComponent.prototype.click = function (field) {
        field.action();
    };
    EasyFabMobileComponent.prototype.ngOnDestroy = function () {
        this.easyFabSubscription.unsubscribe();
    };
    return EasyFabMobileComponent;
}());
EasyFabMobileComponent = __decorate([
    core_1.Component({
        selector: 'easy-fab-mobile',
        template: "<button *ngIf=\"actions != null && actions.length > 0\" mat-icon-button [matMenuTriggerFor]=\"easyFabMobileMenu\">\n                <mat-menu #easyFabMobileMenu=\"matMenu\">\n                    <easy-button type=\"mat-menu-item\" [displayValue]=\"action.label\" (onClicked)=\"click(action)\" *ngFor=\"let action of actions\"></easy-button>\n                </mat-menu>\n                <mat-icon>more_vert</mat-icon>\n            </button>",
        styles: [".checkbox-group-container {\n                display: flex;\n                flex-direction: column;\n                margin-top: 20px;\n              }\n              \n              .checkbox-group {\n                display: flex;\n                flex-direction: column;\n                padding-left: 20px;\n              }\n              \n              .easy-checkbox {\n                margin-top: 100px;\n              }\n              \n              .button-row {\n                display: flex;\n                align-items: right;\n                justify-content: flex-end;\n              }\n              \n              .easy-date-picker {\n                margin-top: 20px;\n                width: 100%;\n              }\n              \n              .easy-select {\n                margin-top: 20px;\n                width: 100%;\n              }\n              \n              .easy-input {\n                margin-top: 20px;\n                width: 100%;\n              }\n              \n              .easy-autocomplete {\n                margin-top: 20px;\n                width: 100%;\n              }\n              \n              .easy-button {\n                margin: 8px;\n                text-transform: uppercase;\n              }\n              \n              .input-icon {\n                font-size: 24px;\n                height: 24px;\n                width: 24px;\n              }\n              \n              .full-width {\n                width: 100vw;\n              }"]
    }),
    __metadata("design:paramtypes", [easy_core_1.LoaderService, easy_fab_service_1.EasyFabService])
], EasyFabMobileComponent);
exports.EasyFabMobileComponent = EasyFabMobileComponent;
//# sourceMappingURL=easy-fab-mobile.component.js.map
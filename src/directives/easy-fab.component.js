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
var EasyFabComponent = (function () {
    function EasyFabComponent(loaderService, easyFabService) {
        var _this = this;
        this.loaderService = loaderService;
        this.easyFabService = easyFabService;
        this.actions = [];
        this.easyFabSubscription = easyFabService.initialized.subscribe(function (x) {
            _this.actions = easyFabService.actions;
        });
    }
    EasyFabComponent.prototype.click = function (field) {
        field.action();
    };
    EasyFabComponent.prototype.ngOnDestroy = function () {
        this.easyFabSubscription.unsubscribe();
    };
    return EasyFabComponent;
}());
EasyFabComponent = __decorate([
    core_1.Component({
        selector: 'easy-fab',
        template: "<div class='full-container'>\n               <button [id]=\"action.key\" *ngFor=\"let action of actions\" mat-fab class='sticky-fab easy-button' [color]=\"action.color\" (click)=\"click(action)\" [matTooltip]=\"action.label\" matTooltipPosition=\"left\">\n                <mat-icon *ngIf=\"action.icon !='' && action.icon != null\">{{action.icon}}</mat-icon>\n               </button>\n               </div>",
        styles: ["\n               \n               .form-row {\n                margin-left: 15px;\n              }\n              \n              .demo-card-container {\n                display: flex;\n                flex-flow: column nowrap;\n              }\n              \n              .demo-card-container .mat-card {\n                margin: 0 16px 16px 0;\n                width: 350px;\n              }\n              \n              .demo-card-container img {\n                background-color: gray;\n              }\n              \n              .demo-card-blue {\n                background-color: #b0becc;\n              }\n              \n              .demo-card-blue .mat-card-actions {\n                display: flex;\n                flex-direction: column;\n              }\n              \n              .container {\n                width: 100%;\n                margin-bottom: 15px;\n              }\n              \n              .full-container {\n                position: fixed;\n                height: 100vh;\n                width: 56px;\n                right: 30px;\n                bottom: 30px;\n                z-index: 9999;\n                pointer-events: none;\n                display: flex;\n                flex-direction: column-reverse;\n              }\n              \n              .sticky-fab {\n                margin-top: 10px;\n                margin-right: 30px;\n                margin-left: auto;\n                pointer-events: all;\n              }\n               \n               .checkbox-group-container {\n                display: flex;\n                flex-direction: column;\n                margin-top: 20px;\n              }\n              \n              .checkbox-group {\n                display: flex;\n                flex-direction: column;\n                padding-left: 20px;\n              }\n              \n              .easy-checkbox {\n                margin-top: 100px;\n              }\n              \n              .button-row {\n                display: flex;\n                align-items: right;\n                justify-content: flex-end;\n              }\n              \n              .easy-date-picker {\n                margin-top: 20px;\n                width: 100%;\n              }\n              \n              .easy-select {\n                margin-top: 20px;\n                width: 100%;\n              }\n              \n              .easy-input {\n                margin-top: 20px;\n                width: 100%;\n              }\n              \n              .easy-autocomplete {\n                margin-top: 20px;\n                width: 100%;\n              }\n              \n              .easy-button {\n                margin: 8px;\n                text-transform: uppercase;\n              }\n              \n              .input-icon {\n                font-size: 24px;\n                height: 24px;\n                width: 24px;\n              }\n              \n              .full-width {\n                width: 100vw;\n              }"]
    }),
    __metadata("design:paramtypes", [easy_core_1.LoaderService, easy_fab_service_1.EasyFabService])
], EasyFabComponent);
exports.EasyFabComponent = EasyFabComponent;
//# sourceMappingURL=easy-fab.component.js.map
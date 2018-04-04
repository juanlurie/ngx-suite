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
var material_1 = require("@angular/material");
var colors_1 = require("../classes/colors");
var icons_1 = require("../classes/icons");
var button_types_1 = require("../classes/button-types");
var easy_modal_service_1 = require("../services/easy-modal.service");
var notification_service_1 = require("../notificationService/notification.service");
var easy_core_1 = require("easy-core");
var easyForm_1 = require("../baseClasses/easyForm");
var EasyFormService = (function () {
    function EasyFormService(easyNotification, httpIntegrationService, matDialog) {
        var _this = this;
        this.easyNotification = easyNotification;
        this.httpIntegrationService = httpIntegrationService;
        this.easyModal = new easy_modal_service_1.EasyModalService(matDialog);
        this.errorSubscription = httpIntegrationService.OnError.subscribe(function (x) {
            if (x.status == 0) {
                _this.easyNotification.showError("Error", "No response from server.", function () { return _this.showErrorModal(x.json().Message); });
            }
            else if (x.status == 500) {
                _this.easyNotification.showError("Error", x.status + " : " + x.statusText, function () { return _this.showErrorModal(x.json().Message); });
            }
        });
    }
    EasyFormService.prototype.buildModal = function () {
        this.modal = this.form.addModalContainer("Error");
        this.stackTraceField = this.modal.addTextAreaField("Stack Trace", { readonly: true });
        this.modal.addAction('Back', function () { }, { key: 'Back', color: colors_1.Colors.color_warn, icon: icons_1.Icons.icon_arrow_back, showLoader: true, type: button_types_1.ButtonTypes.button_raised, columnSpan: 2 });
    };
    EasyFormService.prototype.showErrorModal = function (message) {
        this.stackTraceField.value = message;
        this.easyModal.showModal(this.modal);
    };
    EasyFormService.prototype.createForm = function () {
        this.form = new easyForm_1.EasyForm();
        this.buildModal();
        return this.form;
    };
    EasyFormService.prototype.ngOnDestroy = function () {
        this.errorSubscription.unsubscribe();
    };
    return EasyFormService;
}());
EasyFormService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [notification_service_1.EasyNotification, easy_core_1.HttpIntegrationService, material_1.MatDialog])
], EasyFormService);
exports.EasyFormService = EasyFormService;
//# sourceMappingURL=easy-form.service.js.map
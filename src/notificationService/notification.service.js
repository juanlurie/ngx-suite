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
var EasyNotification = (function () {
    function EasyNotification(snackBar) {
        this.snackBar = snackBar;
    }
    EasyNotification.prototype.showMessage = function (title, body) {
        this.snackBar.open(title, body, { duration: 3000 });
    };
    EasyNotification.prototype.showError = function (title, body, action) {
        if (action === void 0) { action = null; }
        var config = new material_1.MatSnackBarConfig();
        config.duration = 6000;
        config.extraClasses = ['notification-error'];
        this.snackBar.open(title, body, config);
        var ref = this.snackBar.open(title, body, config);
        if (action != null)
            ref.onAction().subscribe(function (x) { action(); });
    };
    return EasyNotification;
}());
EasyNotification = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [material_1.MatSnackBar])
], EasyNotification);
exports.EasyNotification = EasyNotification;
//# sourceMappingURL=notification.service.js.map
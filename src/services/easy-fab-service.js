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
var Subject_1 = require("rxjs/Subject");
var EasyFabService = (function () {
    function EasyFabService() {
        this.subject = new Subject_1.Subject();
        this.actions = [];
        this.initialized = this.subject.asObservable();
    }
    EasyFabService.prototype.initialize = function (actions) {
        if (actions === void 0) { actions = []; }
        this.actions = actions;
        this.subject.next(true);
    };
    EasyFabService.prototype.uninitialize = function () {
        this.actions = [];
        this.subject.next(true);
    };
    return EasyFabService;
}());
EasyFabService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], EasyFabService);
exports.EasyFabService = EasyFabService;
//# sourceMappingURL=easy-fab-service.js.map
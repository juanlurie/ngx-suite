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
var EasyContainerComponent = (function () {
    function EasyContainerComponent() {
        this.selectedTabIndex = 0;
    }
    return EasyContainerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EasyContainerComponent.prototype, "containers", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EasyContainerComponent.prototype, "layout", void 0);
EasyContainerComponent = __decorate([
    core_1.Component({
        selector: 'easy-container',
        template: "<div fxLayout=\"row\" fxLayoutWrap fxLayoutAlign=\"space-around\">\n    <div *ngFor=\"let container of containers\" [fxFlex.xl]=\"container.xlSize\" [fxFlex.lg]=\"container.lgSize\" [fxFlex.md]=\"container.mdSize\" [fxFlex.sm]=\"container.smSize\" [fxFlex.xs]=\"container.xsSize\" \n    [style.margin-right]=\"container.marginRight\" [style.margin-left]=\"container.marginLeft\" [style.padding-left]=\"container.paddingLeft\" [style.padding-left]=\"container.paddingLeft\">\n      <div *ngIf=\"container.show\" [ngSwitch]=\"container.controlType\" class=\"container\">\n          <mat-card *ngSwitchCase=\"'card'\">\n              <mat-card-header *ngIf=\"container.header != null && container.header != ''\">\n                  <mat-card-title class=\"mat-card-title\" style=\"text-transform:uppercase;\">\n                      {{container.header}}\n                  </mat-card-title>\n              </mat-card-header>\n              <mat-card-content>\n                  <easy-form-content [container]=\"container\"></easy-form-content>\n                  <easy-container [containers]='container.containers'></easy-container>\n              </mat-card-content>\n              <mat-card-actions>\n                  <easy-form-content-actions [actions]=\"container.actions\"></easy-form-content-actions>\n              </mat-card-actions>\n          </mat-card>\n          <mat-expansion-panel [id]=\"container.header\" *ngSwitchCase=\"'expansion-panel'\">\n              <mat-expansion-panel-header>\n                  <mat-panel-title>\n                      {{container.header}}\n                  </mat-panel-title>\n              </mat-expansion-panel-header>\n              <easy-form-content [container]=\"container\"></easy-form-content>\n              <easy-container [containers]='container.containers'></easy-container>\n              <easy-form-content-actions [actions]=\"container.actions\"></easy-form-content-actions>\n          </mat-expansion-panel>\n          <mat-card *ngSwitchCase=\"'tabs'\">\n              <mat-tab-group [(selectedIndex)]=\"selectedTabIndex\">\n                  <mat-tab label=\"{{tab.header}}\" *ngFor=\"let tab of container.containers;let index = index\">\n                      <easy-form-content [container]=\"tab\" *ngIf=\"selectedTabIndex == index\"></easy-form-content>\n                      <easy-container [containers]='tab.containers' *ngIf=\"selectedTabIndex == index\"></easy-container>\n                      <easy-form-content-actions [actions]=\"tab.actions\"></easy-form-content-actions>\n                  </mat-tab>\n              </mat-tab-group>\n          </mat-card>\n          <mat-horizontal-stepper *ngSwitchCase=\"'stepper'\">\n              <mat-step *ngFor=\"let step of container.containers\">\n                  <easy-form-content [container]=\"step\"></easy-form-content>\n                  <easy-container [containers]='step.containers'></easy-container>\n              </mat-step>\n          </mat-horizontal-stepper>\n          <mat-accordion *ngSwitchCase=\"'accordion'\">\n              <mat-expansion-panel [id]=\"expansionPanel.header\" *ngFor=\"let expansionPanel of container.containers\">\n                  <mat-expansion-panel-header>\n                      <mat-panel-title>\n                          {{expansionPanel.header}}\n                      </mat-panel-title>\n                  </mat-expansion-panel-header>\n                  <easy-form-content [container]=\"expansionPanel\"></easy-form-content>\n                  <easy-container [containers]='expansionPanel.containers'></easy-container>\n                  <easy-form-content-actions [actions]=\"expansionPanel.actions\"></easy-form-content-actions>\n              </mat-expansion-panel>\n          </mat-accordion>\n      </div>\n  </div>\n</div>",
        styles: [".checkbox-group-container {\n    display: flex;\n    flex-direction: column;\n    margin-top: 20px;\n  }\n  \n  .checkbox-group {\n    display: flex;\n    flex-direction: column;\n    padding-left: 20px;\n  }\n  \n  .easy-checkbox {\n    margin-top: 100px;\n  }\n  \n  .button-row {\n    display: flex;\n    align-items: right;\n    justify-content: flex-end;\n  }\n  \n  .easy-date-picker {\n    margin-top: 20px;\n    width: 100%;\n  }\n  \n  .easy-select {\n    margin-top: 20px;\n    width: 100%;\n  }\n  \n  .easy-input {\n    margin-top: 20px;\n    width: 100%;\n  }\n  \n  .easy-autocomplete {\n    margin-top: 20px;\n    width: 100%;\n  }\n  \n  .easy-button {\n    margin: 8px;\n    text-transform: uppercase;\n  }\n  \n  .input-icon {\n    font-size: 24px;\n    height: 24px;\n    width: 24px;\n  }\n  \n  .full-width {\n    width: 100vw;\n  }"]
    })
], EasyContainerComponent);
exports.EasyContainerComponent = EasyContainerComponent;
//# sourceMappingURL=easy-container.component.js.map
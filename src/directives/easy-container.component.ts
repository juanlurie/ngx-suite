import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EasyContainer } from '../baseClasses/easy-container';

@Component({
    selector: 'easy-container',
    template:
        `<div fxLayout="row" fxLayoutWrap fxLayoutAlign="space-around">
    <div *ngFor="let container of containers" [fxFlex.xl]="container.xlSize" [fxFlex.lg]="container.lgSize" [fxFlex.md]="container.mdSize" [fxFlex.sm]="container.smSize" [fxFlex.xs]="container.xsSize" 
    [style.margin-right]="container.marginRight" [style.margin-left]="container.marginLeft" [style.padding-left]="container.paddingLeft" [style.padding-left]="container.paddingLeft">
      <div *ngIf="container.show" [ngSwitch]="container.controlType" class="container">
          <mat-card *ngSwitchCase="'card'">
              <mat-card-header *ngIf="container.header != null && container.header != ''">
                  <mat-card-title class="mat-card-title" style="text-transform:uppercase;">
                      {{container.header}}
                  </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  <easy-form-content [container]="container"></easy-form-content>
                  <easy-container [containers]='container.containers'></easy-container>
              </mat-card-content>
              <mat-card-actions>
                  <easy-form-content-actions [actions]="container.actions"></easy-form-content-actions>
              </mat-card-actions>
          </mat-card>
          <mat-expansion-panel [id]="container.header" *ngSwitchCase="'expansion-panel'">
              <mat-expansion-panel-header>
                  <mat-panel-title>
                      {{container.header}}
                  </mat-panel-title>
              </mat-expansion-panel-header>
              <easy-form-content [container]="container"></easy-form-content>
              <easy-container [containers]='container.containers'></easy-container>
              <easy-form-content-actions [actions]="container.actions"></easy-form-content-actions>
          </mat-expansion-panel>
          <mat-card *ngSwitchCase="'tabs'">
              <mat-tab-group [(selectedIndex)]="selectedTabIndex">
                  <mat-tab label="{{tab.header}}" *ngFor="let tab of container.containers;let index = index">
                      <easy-form-content [container]="tab" *ngIf="selectedTabIndex == index"></easy-form-content>
                      <easy-container [containers]='tab.containers' *ngIf="selectedTabIndex == index"></easy-container>
                      <easy-form-content-actions [actions]="tab.actions"></easy-form-content-actions>
                  </mat-tab>
              </mat-tab-group>
          </mat-card>
          <mat-horizontal-stepper *ngSwitchCase="'stepper'">
              <mat-step *ngFor="let step of container.containers">
                  <easy-form-content [container]="step"></easy-form-content>
                  <easy-container [containers]='step.containers'></easy-container>
              </mat-step>
          </mat-horizontal-stepper>
          <mat-accordion *ngSwitchCase="'accordion'">
              <mat-expansion-panel [id]="expansionPanel.header" *ngFor="let expansionPanel of container.containers">
                  <mat-expansion-panel-header>
                      <mat-panel-title>
                          {{expansionPanel.header}}
                      </mat-panel-title>
                  </mat-expansion-panel-header>
                  <easy-form-content [container]="expansionPanel"></easy-form-content>
                  <easy-container [containers]='expansionPanel.containers'></easy-container>
                  <easy-form-content-actions [actions]="expansionPanel.actions"></easy-form-content-actions>
              </mat-expansion-panel>
          </mat-accordion>
      </div>
  </div>
</div>`,
    styles: [`.checkbox-group-container {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }
  
  .easy-checkbox {
    margin-top: 100px;
  }
  
  .button-row {
    display: flex;
    align-items: right;
    justify-content: flex-end;
  }
  
  .easy-date-picker {
    margin-top: 20px;
    width: 100%;
  }
  
  .easy-select {
    margin-top: 20px;
    width: 100%;
  }
  
  .easy-input {
    margin-top: 20px;
    width: 100%;
  }
  
  .easy-autocomplete {
    margin-top: 20px;
    width: 100%;
  }
  
  .easy-button {
    margin: 8px;
    text-transform: uppercase;
  }
  
  .input-icon {
    font-size: 24px;
    height: 24px;
    width: 24px;
  }
  
  .full-width {
    width: 100vw;
  }`]
})
export class EasyContainerComponent {
    @Input() containers: EasyContainer[];
    @Input() layout: string;
    selectedTabIndex = 0;
}
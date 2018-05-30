import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EasyFabService } from '../index';
import { EasyField } from '../baseClasses/easy-field';
import { FieldOptions } from '../classes/index'

@Component({
  selector: 'easy-fab',
  template: `<div class='full-container'>
               <button [id]="action.key" *ngFor="let action of actions" mat-fab class='sticky-fab easy-button' [color]="action.color" (click)="click(action)" [matTooltip]="action.label" matTooltipPosition="left">
                <mat-icon *ngIf="action.icon !='' && action.icon != null">{{action.icon}}</mat-icon>
               </button>
               </div>`,
  styles: [`
               
               .form-row {
                margin-left: 15px;
              }
              
              .demo-card-container {
                display: flex;
                flex-flow: column nowrap;
              }
              
              .demo-card-container .mat-card {
                margin: 0 16px 16px 0;
                width: 350px;
              }
              
              .demo-card-container img {
                background-color: gray;
              }
              
              .demo-card-blue {
                background-color: #b0becc;
              }
              
              .demo-card-blue .mat-card-actions {
                display: flex;
                flex-direction: column;
              }
              
              .container {
                width: 100%;
                margin-bottom: 15px;
              }
              
              .full-container {
                position: fixed;
                height: 100vh;
                width: 56px;
                right: 30px;
                bottom: 30px;
                z-index: 9999;
                pointer-events: none;
                display: flex;
                flex-direction: column-reverse;
              }
              
              .sticky-fab {
                margin-top: 10px;
                margin-right: 30px;
                margin-left: auto;
                pointer-events: all;
              }
               
               .checkbox-group-container {
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
export class EasyFabComponent implements OnDestroy {

  actions: Array<EasyField> = [];

  subscription: any;
  easyFabSubscription: Subscription;

  constructor(private easyFabService: EasyFabService) {
    this.easyFabSubscription = easyFabService.initialized.subscribe(x => {
      this.actions = easyFabService.actions;
    });
  }

  click(field: EasyField) {
    field.action();
  }

  ngOnDestroy() {
    this.easyFabSubscription.unsubscribe();
  }
}

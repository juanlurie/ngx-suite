import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EasyFabService } from '../index';
import { EasyField } from '../baseClasses/easy-field';
import { FieldOptions } from '../classes/index';

@Component({
  selector: 'easy-fab-mobile',
  template: `<button *ngIf="actions != null && actions.length > 0" mat-icon-button [matMenuTriggerFor]="easyFabMobileMenu">
                <mat-menu #easyFabMobileMenu="matMenu">
                    <easy-button type="mat-menu-item" [displayValue]="action.label" (onClicked)="click(action)" *ngFor="let action of actions"></easy-button>
                </mat-menu>
                <mat-icon>more_vert</mat-icon>
            </button>`,
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
export class EasyFabMobileComponent implements OnDestroy {

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

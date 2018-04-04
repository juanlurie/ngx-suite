import { Component, Input } from '@angular/core';
import { EasyContainer } from '../baseClasses/easy-container';
import { EasyField } from '../baseClasses/easy-field';

@Component({
  selector: 'easy-form-content-actions',
  template: `<div fxLayout fxLayoutAlign="end" fxLayoutWrap>
              <div *ngFor="let action of actions">
                  <easy-button [key]="action.key" *ngIf="!action.hide" [icon]="action.icon" [color]="action.color" [displayValue]="action.label" [type]='action.type'
                    [showLoader]="action.showLoader" (onClicked)="click(action.action)"></easy-button>
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
export class EasyFormContentActionsComponent {
  @Input() actions: EasyField[];

  click(action: Function) {
    action();
  }
}

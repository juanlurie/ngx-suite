import { Component, Input } from '@angular/core';
import { EasyContainer } from '../baseClasses/easy-container';

@Component({
  selector: 'easy-form-content',
  template: `<div fxFlex fxLayoutWrap fxLayout style="overflow-y:hidden">
              <div *ngFor="let field of container.fields" [fxFlex.xl]="container.getXlColumnSize(field)" [fxFlex.lg]="container.getLgColumnSize(field)"
                  [fxFlex.md]="container.getMdColumnSize(field)" [fxFlex.sm]="container.getSmColumnSize(field)" [fxFlex.xs]="container.getXsColumnSize(field)"
                  fxLayoutAlign="start">
                  <easy-form-field fxFlex="auto" *ngIf="!field.hide" style="margin-left:10px" [field]="field" [containerReadonly]="container.readonly"></easy-form-field>
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
export class EasyFormContentComponent {
  @Input() container: EasyContainer;
}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EasyFabService } from '../index';
import { EasyFormService } from '../services/easy-form.service';
import { EasyForm } from '../baseClasses/easy-form';

@Component({
  selector: 'easy-form',
  template: `<div *ngFor="let toolbarContainer of form.toolbarContainers">
                          <mat-toolbar color="primary">
                            <div *ngFor="let toolbar of toolbarContainer.toolbars" class="toolbar-row">

                            <button mat-icon-button [matMenuTriggerFor]="toolbarMenu" *ngFor="let menu of toolbar.menus">
                              <mat-icon>more_vert</mat-icon>
                              <mat-menu #toolbarMenu="matMenu">
                                <button *ngFor="let field of menu" mat-menu-item [disabled]="field.show" (click)="field.action()">
                                  <span *ngIf="!field.show">{{field.label}}</span>
                                </button>
                              </mat-menu>                     
                            </button>

                            <div *ngFor="let field of toolbar.fields">
                              <div [ngSwitch]="field.controlType">
                                <easy-form-field *ngSwitchCase="'button'" [field]="field"></easy-form-field>
                                <span *ngSwitchCase="'toolbar-text'">
                                  {{field.label}}
                                </span>                            
                              </div>            
                            </div>
                            </div>
                          </mat-toolbar>
                        </div>
            
            <div fxLayout style="padding-top:10px;padding-bottom:10px;" fxLayoutAlign="center">                                      
                      
              <div [fxFlex.xl]="form.xlSize" [fxFlex.lg]="form.lgSize" [fxFlex.md]="form.mdSize" [fxFlex.sm]="form.smSize" [fxFlex.xs]="form.xsSize">
                <easy-container [layout]='form.layout' [containers]='form.getContainers()'></easy-container>
              </div>
            </div>`,
  styles: [`.checkbox-group-container {
              display: flex;
              flex-direction: column;
              margin-top: 20px;
            }

            .toolbar-row {
              display: flex;
              flex-direction: row;
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
            }`],
  providers: [EasyFormService]
})
export class EasyFormComponent implements OnInit, OnDestroy {

  @Input() form: EasyForm;

  constructor(private easyFabService: EasyFabService) { }

  ngOnInit() {
    this.easyFabService.initialize(this.form.actions);
  }

  ngOnDestroy() {
    this.easyFabService.uninitialize();
  }
}

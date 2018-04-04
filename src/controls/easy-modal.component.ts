import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { EasyField } from '../baseClasses/easy-field';
import { EasyContainer } from '../baseClasses/easy-container'
import { ObservableMedia } from "@angular/flex-layout";
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    template: `<h1 mat-dialog-title>{{header}}</h1>
                <div mat-dialog-content flex style="overflow-y: auto;">
                    <div *ngFor="let field of fields" class="form-row">
                        <easy-form-field *ngIf="!field.hide" [field]="field"></easy-form-field>
                    </div>
                </div>
                <div mat-dialog-actions fxLayout fxLayoutAlign="end" fxLayoutWrap>
                    <div *ngFor="let action of actions">
                        <easy-button [key]="action.key" *ngIf="!action.hide" [icon]="action.icon" [color]="action.color" [displayValue]="action.label" [type]='action.type' (onClicked)="click(action.action,action)"></easy-button>
                    </div>
               </div>`,
    styles: [`
               .form-row {
                margin-left: 15px;
              }`]
})
export class EasyModalDialog implements OnInit {

    header: string;
    fields: EasyField[];
    actions: EasyField[];
    container: EasyContainer;
    width: string;

    constructor(private dialogRef: MatDialogRef<EasyModalDialog>, private media: ObservableMedia, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.setResponsiveStyles();
        this.media.subscribe(x => {
            this.setResponsiveStyles();
        });

        this.setFieldValuesFromData();
    }

    setResponsiveStyles() {
        if (this.dialogRef == null || this.dialogRef.componentInstance == null)
            return;

        if (this.media != null && this.media.isActive('xs')) {
            this.dialogRef.updateSize('100vw');
        }
        else this.dialogRef.updateSize('60vw');
    }

    setFieldValuesFromData() {
        if (this.data != null && this.fields != null) {
            Object.keys(this.data).forEach(key => {
                let field = this.fields.singleOrDefault(x => x.key == key);
                if (field != null)
                    field.value = this.data[key];
            });
        }
    }

    setForm(container: EasyContainer) {
        this.header = container.header;
        this.fields = container.fields;
        this.actions = container.actions;
        this.container = container;
    }

    click(action: Function, field: EasyField) {

        if (this.data != null) {
            Object.keys(this.data).forEach(key => {
                let field = this.fields.singleOrDefault(x => x.key == key);
                if (field != null)
                    this.data[key] = field.value;
            });
        }

        if (field.skipFormValidation) {
            this.dialogRef.close(this.fields);
            if (action != null)
                action(this.fields, this.data);
        }
        else {
            let validationResult = this.container.validateFields();

            if (validationResult.valid) {
                this.dialogRef.close(this.fields);
                if (action != null)
                    action(this.fields, this.data);
            }
        }
    }
}
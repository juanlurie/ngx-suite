import { Injectable, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EasyModalDialog } from '../index';
import { EasyField } from '../baseClasses/easy-field';
import { EasyContainer } from '../baseClasses/easy-container'
import { retry } from 'rxjs/operators';

@Injectable()
export class EasyModalService {
    constructor(private modal: MatDialog) { }

    showModal(container: EasyContainer, data: any = {}, disableClose = true): MatDialogRef<EasyModalDialog> {

        if (container == null)
            return;

        let width = "60vw";

        let dialogRef = this.modal.open(EasyModalDialog,
            { width: width, disableClose: disableClose, data: data, panelClass: 'full-width-dialog' }
        );
        dialogRef.componentInstance.setForm(container);

        return dialogRef;
    }
}

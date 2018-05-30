import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class EasyNotification {
    constructor(private snackBar: MatSnackBar) { }

    public showMessage(title: string, body: string) {
        this.snackBar.open(title, body, { duration: 3000 });
    }

    public showError(title: string, body: string, action: Function = null) {
        let config = new MatSnackBarConfig();
        config.duration = 6000;
        //config.extraClasses = ['notification-error'];
        this.snackBar.open(title, body, config);
        
        let ref = this.snackBar.open(title, body, config);
        
        if (action != null)
            ref.onAction().subscribe(x => { action() });
    }
}
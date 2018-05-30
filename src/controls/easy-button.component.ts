import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'easy-button',
    template: `<div [ngSwitch]="type">
    
        <button [id]="key" *ngSwitchCase="'mat-button-toolbar'" [disabled]="show" mat-button class='easy-button' (click)="click(); $event.stopPropagation();">
            <mat-icon *ngIf="icon !='' && icon != null && !show">{{icon}}</mat-icon>
            <easy-spinner *ngIf="show" [thickness]="4" [size]="30" style="vertical-align: middle"></easy-spinner>
            <span *ngIf="!show">{{displayValue}}</span>
        </button>
    
        <button [id]="key" *ngSwitchCase="'mat-button'" [disabled]="show" mat-button [color]="color" class='easy-button' (click)="click(); $event.stopPropagation();">
            <mat-icon *ngIf="icon !='' && icon != null && !show">{{icon}}</mat-icon>
            <easy-spinner *ngIf="show" [thickness]="4" [size]="30" style="vertical-align: middle"></easy-spinner>
            <span *ngIf="!show">{{displayValue}}</span>
        </button>
    
        <button [id]="key" *ngSwitchCase="'mat-raised-button'" [disabled]="show" mat-raised-button [color]="color" class='easy-button'
            (click)="click(); $event.stopPropagation();">
            <mat-icon *ngIf="icon !='' && icon != null && !show">{{icon}}</mat-icon>
            <easy-spinner *ngIf="show" [thickness]="4" [size]="30" style="vertical-align: middle"></easy-spinner>
            <span *ngIf="!show">{{displayValue}}</span>
        </button>
    
        <button [id]="key" *ngSwitchCase="'mat-fab'" mat-fab [disabled]="show" [color]="color" class='easy-button' (click)="click(); $event.stopPropagation();">
            <mat-icon *ngIf="icon !='' && icon != null && !show">{{icon}}</mat-icon>
            <easy-spinner *ngIf="show" [thickness]="4" [size]="56" style="vertical-align: middle"></easy-spinner>
        </button>
    
        <button [id]="key" *ngSwitchCase="'mat-mini-fab'" mat-mini-fab [disabled]="show" [color]="color" class='easy-button' (click)="click(); $event.stopPropagation();">
            <mat-icon *ngIf="icon !='' && icon != null && !show">{{icon}}</mat-icon>
            <easy-spinner *ngIf="show" [thickness]="4" [size]="40" style="vertical-align: middle"></easy-spinner>
        </button>
    
        <button [id]="key" *ngSwitchCase="'mat-menu-item'" mat-menu-item [disabled]="show" (click)="click();">
            <span *ngIf="!show">{{displayValue}}</span>
        </button>
    
        <button [id]="key" *ngSwitchCase="'mat-icon-button'" mat-icon-button [disabled]="show" [color]="color" class='easy-button'
            (click)="click(); $event.stopPropagation();">
            <mat-icon *ngIf="icon !='' && icon != null && !show">{{icon}}</mat-icon>
        </button>`,
    styles: [`.easy-button {
        margin: 8px;
        text-transform: uppercase;
      }`]
})
export class EasyButtonComponent implements OnInit, OnDestroy {
    @Input() displayValue: string;
    @Input() color: string = '';
    @Input() icon: string = '';
    @Input('key') key: string = '';
    @Input() type: string = 'mat-button';
    @Input() showLoader: boolean = false;
    @Output() onClicked = new EventEmitter<boolean>();

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    click() {
        this.onClicked.emit(true);
    }
}
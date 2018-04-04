import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Colors, FieldChangeDto } from '../classes/index';
import { ValidatorService, EasyFieldValidator, ValidatorType, EasyFormComponent } from '../services/validation.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'easy-checkbox',
    template: `<div class="easy-checkbox xxxx"><mat-checkbox [id]="key" [(ngModel)]="value" (change)="onChange();" (margin-left)="marginLeft" (margin-top)="marginTop" (margin-right)="marginRight" (margin-bottom)="marginBottom" (click)="click(); $event.stopPropagation();">
                {{placeholder}}
               </mat-checkbox></div>`,
    styles: []
})
export class EasyCheckBoxComponent extends EasyFormComponent {
    @Output() fieldValueChange = new EventEmitter();
    @Input('placeholder') placeholder: string;
    @Input('value') value: string;
    @Input('key') key: string = '';
    @Input('marginLeft') marginLeft: string = '';
    @Input('marginTop') marginTop: string = '';
    @Input('marginRight') marginRight: string = '';
    @Input('marginBottom') marginBottom: string = '';

    constructor(validatorService: ValidatorService) {
        super(validatorService);
    }

    onChange() {
        this.fieldValueChange.emit(new FieldChangeDto(this.key, this.value, true));
    }

    click(){
        
    }
}

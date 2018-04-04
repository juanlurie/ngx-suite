import { Input, Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { ValidatorService, EasyFieldValidator, EasyFormComponent } from '../services/validation.service'
import { templateJitUrl } from '@angular/compiler';
import { FieldChangeDto } from '../classes/index';

@Component({
  selector: 'easy-fileupload',
  template: `<div>
                <input id={{key}} type='file' #fileUploader style='visibility:hidden' (change)=fileChanged($event)>
                <mat-form-field class='easy-input'>
                    <input id='fileDsplayLabel' type='text' [placeholder]="placeholder" matInput disabled>
                    <mat-hint>{{hint}}</mat-hint>
                    <easy-button matSuffix [color]="color" [icon]="icon" [type]="type" [displayValue]="''" (onClicked)="fileUploader.click();"></easy-button>
                </mat-form-field>
              </div>`,
  styles: [`.easy-input {
                margin-top: 20px;
                width: 100%;
              }`]
})

export class EasyFileUploadComponent extends EasyFormComponent {
  @Input() color: string = '';
  @Input() icon: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input('key') key: string = '';
  @Input('hint') hint: string = '';
  @Output() onClicked = new EventEmitter<boolean>();
  @Output() fieldValueChange = new EventEmitter<FieldChangeDto>();

  constructor(validatorService: ValidatorService) {
    super(validatorService);
  }


  ngOnInit() {
    let a = 1;
    let b = a;
  }

  uploadClick() {

  }

  click() {

  }

  fileChanged($event: any) {
    let files = $event.target.files;
    if (files[0]) {
      this.hint = files[0].name;
      this.fieldValueChange.emit(new FieldChangeDto(this.key, files[0], true));
    }
    else
      this.hint = null;
  }
}
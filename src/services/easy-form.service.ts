import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { EasyNotification } from '../notificationService/notification.service'
import { Subscription } from 'rxjs';
import { EasyModalService } from '../services/easy-modal.service'
import { ButtonTypes, Icons, Colors } from '../classes/index'
import { EasyForm } from '../baseClasses/easy-form';
import { EasyField } from '../baseClasses/easy-field';
import { EasyContainer } from '../baseClasses/easy-container'

@Injectable()
export class EasyFormService implements OnDestroy {

  private form: EasyForm;
  private errorSubscription: Subscription;
  private easyModal: EasyModalService;
  private modal: EasyContainer;
  private stackTraceField: EasyField;

  constructor(private easyNotification: EasyNotification, private http: HttpClient, matDialog: MatDialog) {

    this.easyModal = new EasyModalService(matDialog);
  }

  buildModal() {
    this.modal = this.form.addModalContainer("Error");
    this.stackTraceField = this.modal.addTextAreaField("Stack Trace", { readonly: true });
    this.modal.addAction('Back', () => { }, { key: 'Back', color: Colors.color_warn, icon: Icons.icon_arrow_back, showLoader: true, type: ButtonTypes.button_raised, columnSpan: 2 });
  }

  showErrorModal(message: string) {
    this.stackTraceField.value = message;
    this.easyModal.showModal(this.modal);
  }

  createForm() {
    this.form = new EasyForm();
    this.buildModal();
    return this.form;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}

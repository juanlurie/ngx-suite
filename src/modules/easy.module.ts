import { EasyFormService } from '../services/easy-form.service'
import { EasyFileUploadComponent } from '../controls/easy-fileupload.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EasyMaterialModule } from './easy-material.module';
import { EasyRadioButtonComponent } from '../controls/easy-radioButton.component';
import { EasySelectKeyValueComponent } from '../controls/easy-select-key-value.component';
import { EasySelectComponent } from '../controls/easy-select.component';
import { EasyButtonComponent } from '../controls/easy-button.component';
import { EasyFabComponent } from '../directives/easy-fab.component';
import { EasyFabMobileComponent } from '../directives/easy-fab-mobile.component';
import { EasyContainerComponent } from '../directives/easy-container.component';
import { EasyInputComponent } from '../controls/easy-input.component';
import { EasyRecordComponent } from '../controls/easy-record.component';
import { EasyTextAreaComponent } from '../controls/easy-text-area.component';
import { EasyCheckBoxComponent } from '../controls/easy-checkbox.component';
import { EasyCheckBoxGroupComponent } from '../controls/easy-checkbox-group.component';
import { EasyTableComponent } from '../controls/easy-table.component';
import { EasyAutocompleteComponent } from '../controls/easy-autocomplete.component';
import { EasyAutocompleteKeyValueComponent } from '../controls/easy-autocomplete-key-value.component';
import { SpinnerComponent } from '../controls/easy-spinner';
import { EasyModalDialog } from '../controls/easy-modal.component';
import { EasyDatePickerComponent } from '../controls/easy-date-picker.component';
import { CommonModule } from '@angular/common';
import { EasyFormComponent } from '../directives/easy-form.component';
import { EasyNotification } from '../notificationService/notification.service';
import { EasyModalService } from '../services/easy-modal.service';
import { ValidatorService } from '../services/validation.service'
import { FileDownloadService } from '../services/file-download-service'
import { RequiredDirective } from '../directives/easy-required.directive';
import { MaxLengthDirective } from '../directives/easy-max-length.directive';
import { EasyFormFieldComponent } from '../directives/easy-form-field.component';
import { EasyFormContentComponent } from '../directives/easy-form-content.component';
import { EasyFormContentActionsComponent } from '../directives/easy-form-content-actions.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadOptions } from '../classes/file-upload-options';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EasyDateTimePickerComponent } from '../controls/easy-date-time-picker.component';
import { EasyDividerComponent } from '../controls/easy-divider.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    entryComponents: [EasyModalDialog],
    imports: [ReactiveFormsModule, PdfViewerModule, EasyMaterialModule, CommonModule, FormsModule, FlexLayoutModule, FileUploadModule, HttpClientModule],
    declarations: [
        EasyDatePickerComponent,
        EasyButtonComponent,
        EasyFabComponent,
        EasyFabMobileComponent,
        EasyInputComponent,
        EasyRecordComponent,
        EasyCheckBoxComponent,
        EasyCheckBoxGroupComponent,
        EasyAutocompleteComponent,
        EasyAutocompleteKeyValueComponent,
        EasyFormComponent,
        EasyFormFieldComponent,
        EasyTableComponent,
        EasyModalDialog,
        SpinnerComponent,
        EasySelectComponent,
        EasySelectKeyValueComponent,
        EasyRadioButtonComponent,
        EasyFormContentComponent,
        EasyFormContentActionsComponent,
        MaxLengthDirective,
        RequiredDirective,
        EasyTextAreaComponent,
        EasyContainerComponent,
        EasyFileUploadComponent,
        EasyDateTimePickerComponent,
        EasyDividerComponent
    ],
    providers: [EasyFormService, EasyNotification, EasyModalService, ValidatorService, FileDownloadService, FileUploadModule, FileUploadOptions],
    exports: [
        EasyButtonComponent,
        EasyFabComponent,
        EasyFabMobileComponent,
        EasyInputComponent,
        EasyRecordComponent,
        EasyCheckBoxComponent,
        EasyCheckBoxGroupComponent,
        EasyAutocompleteComponent,
        EasyAutocompleteKeyValueComponent,
        EasyFormComponent,
        EasyFormFieldComponent,
        EasyTableComponent,
        EasyModalDialog,
        EasyDatePickerComponent,
        SpinnerComponent,
        EasySelectKeyValueComponent,
        EasyRadioButtonComponent,
        EasySelectComponent,
        EasyFormContentComponent,
        EasyFormContentActionsComponent,
        MaxLengthDirective,
        RequiredDirective,
        EasyTextAreaComponent,
        EasyContainerComponent,
        FileUploadModule,
        PdfViewerModule,
        EasyDateTimePickerComponent,
        EasyDividerComponent
    ]
})
export class EasyModule { }

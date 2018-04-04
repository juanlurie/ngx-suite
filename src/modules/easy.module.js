"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var easy_form_service_1 = require("../services/easy-form.service");
var easy_fileupload_component_1 = require("../controls/easy-fileupload.component");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var easy_material_module_1 = require("./easy.material.module");
var easy_radioButton_component_1 = require("../controls/easy-radioButton.component");
var easy_select_key_value_component_1 = require("../controls/easy-select-key-value.component");
var easy_select_component_1 = require("../controls/easy-select.component");
var easy_button_component_1 = require("../controls/easy-button.component");
var easy_fab_component_1 = require("../directives/easy-fab.component");
var easy_fab_mobile_component_1 = require("../directives/easy-fab-mobile.component");
var easy_container_component_1 = require("../directives/easy-container.component");
var easy_input_component_1 = require("../controls/easy-input.component");
var easy_record_component_1 = require("../controls/easy-record.component");
var easy_text_area_component_1 = require("../controls/easy-text-area.component");
var easy_checkbox_component_1 = require("../controls/easy-checkbox.component");
var easy_checkbox_group_component_1 = require("../controls/easy-checkbox-group.component");
var easy_table_component_1 = require("../controls/easy-table.component");
var easy_autocomplete_component_1 = require("../controls/easy-autocomplete.component");
var easy_autocomplete_key_value_component_1 = require("../controls/easy-autocomplete-key-value.component");
var easy_spinner_1 = require("../controls/easy-spinner");
var easy_modal_component_1 = require("../controls/easy-modal.component");
var easy_date_picker_component_1 = require("../controls/easy-date-picker.component");
var common_1 = require("@angular/common");
var easy_form_component_1 = require("../directives/easy-form.component");
var notification_service_1 = require("../notificationService/notification.service");
var easy_modal_service_1 = require("../services/easy-modal.service");
var validation_service_1 = require("../services/validation.service");
var file_download_service_1 = require("../services/file-download-service");
var easyRequired_directive_1 = require("../directives/easyRequired.directive");
var easyMaxLength_directive_1 = require("../directives/easyMaxLength.directive");
var easy_form_field_component_1 = require("../directives/easy-form-field.component");
var easy_form_content_component_1 = require("../directives/easy-form-content.component");
var easy_form_content_actions_component_1 = require("../directives/easy-form-content-actions.component");
var flex_layout_1 = require("@angular/flex-layout");
var forms_2 = require("@angular/forms");
var ng2_file_upload_1 = require("ng2-file-upload");
var file_upload_options_1 = require("../classes/file-upload-options");
var ng2_pdf_viewer_1 = require("ng2-pdf-viewer");
var easy_date_time_picker_component_1 = require("../controls/easy-date-time-picker.component");
var easy_divider_component_1 = require("../controls/easy-divider.component");
var EasyModule = (function () {
    function EasyModule() {
    }
    return EasyModule;
}());
EasyModule = __decorate([
    core_1.NgModule({
        entryComponents: [easy_modal_component_1.EasyModalDialog],
        imports: [forms_2.ReactiveFormsModule, ng2_pdf_viewer_1.PdfViewerModule, easy_material_module_1.EasyMaterialModule, common_1.CommonModule, forms_1.FormsModule, flex_layout_1.FlexLayoutModule, ng2_file_upload_1.FileUploadModule],
        declarations: [
            easy_date_picker_component_1.EasyDatePickerComponent,
            easy_button_component_1.EasyButtonComponent,
            easy_fab_component_1.EasyFabComponent,
            easy_fab_mobile_component_1.EasyFabMobileComponent,
            easy_input_component_1.EasyInputComponent,
            easy_record_component_1.EasyRecordComponent,
            easy_checkbox_component_1.EasyCheckBoxComponent,
            easy_checkbox_group_component_1.EasyCheckBoxGroupComponent,
            easy_autocomplete_component_1.EasyAutocompleteComponent,
            easy_autocomplete_key_value_component_1.EasyAutocompleteKeyValueComponent,
            easy_form_component_1.EasyFormComponent,
            easy_form_field_component_1.EasyFormFieldComponent,
            easy_table_component_1.EasyTableComponent,
            easy_modal_component_1.EasyModalDialog,
            easy_spinner_1.SpinnerComponent,
            easy_select_component_1.EasySelectComponent,
            easy_select_key_value_component_1.EasySelectKeyValueComponent,
            easy_radioButton_component_1.EasyRadioButtonComponent,
            easy_form_content_component_1.EasyFormContentComponent,
            easy_form_content_actions_component_1.EasyFormContentActionsComponent,
            easyMaxLength_directive_1.MaxLengthDirective,
            easyRequired_directive_1.RequiredDirective,
            easy_text_area_component_1.EasyTextAreaComponent,
            easy_container_component_1.EasyContainerComponent,
            easy_fileupload_component_1.EasyFileUploadComponent,
            easy_date_time_picker_component_1.EasyDateTimePickerComponent,
            easy_divider_component_1.EasyDividerComponent
        ],
        providers: [easy_form_service_1.EasyFormService, notification_service_1.EasyNotification, easy_modal_service_1.EasyModalService, validation_service_1.ValidatorService, file_download_service_1.FileDownloadService, ng2_file_upload_1.FileUploadModule, file_upload_options_1.FileUploadOptions],
        exports: [
            easy_button_component_1.EasyButtonComponent,
            easy_fab_component_1.EasyFabComponent,
            easy_fab_mobile_component_1.EasyFabMobileComponent,
            easy_input_component_1.EasyInputComponent,
            easy_record_component_1.EasyRecordComponent,
            easy_checkbox_component_1.EasyCheckBoxComponent,
            easy_checkbox_group_component_1.EasyCheckBoxGroupComponent,
            easy_autocomplete_component_1.EasyAutocompleteComponent,
            easy_autocomplete_key_value_component_1.EasyAutocompleteKeyValueComponent,
            easy_form_component_1.EasyFormComponent,
            easy_form_field_component_1.EasyFormFieldComponent,
            easy_table_component_1.EasyTableComponent,
            easy_modal_component_1.EasyModalDialog,
            easy_date_picker_component_1.EasyDatePickerComponent,
            easy_spinner_1.SpinnerComponent,
            easy_select_key_value_component_1.EasySelectKeyValueComponent,
            easy_radioButton_component_1.EasyRadioButtonComponent,
            easy_select_component_1.EasySelectComponent,
            easy_form_content_component_1.EasyFormContentComponent,
            easy_form_content_actions_component_1.EasyFormContentActionsComponent,
            easyMaxLength_directive_1.MaxLengthDirective,
            easyRequired_directive_1.RequiredDirective,
            easy_text_area_component_1.EasyTextAreaComponent,
            easy_container_component_1.EasyContainerComponent,
            ng2_file_upload_1.FileUploadModule,
            ng2_pdf_viewer_1.PdfViewerModule,
            easy_date_time_picker_component_1.EasyDateTimePickerComponent,
            easy_divider_component_1.EasyDividerComponent
        ]
    })
], EasyModule);
exports.EasyModule = EasyModule;
//# sourceMappingURL=easy.module.js.map
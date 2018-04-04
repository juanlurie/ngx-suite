
import { Colors, FieldOptions, Icons, ButtonTypes } from '../classes/index';
import { EasyField } from '../baseClasses/easy-field';

export class EasyFileUploadField extends EasyField {
    controlType = 'fileupload';
    type: string;
    key: string = '';
    icon: string = '';
    color: string = '';
    hint: string = '';

    constructor(options: FieldOptions<any> = {}) {
        super(options);
        this.type = options.type || ButtonTypes.button_icon;
        this.key = options.key || '';
        this.icon = options.icon || Icons.icon_attach_file;
        this.color = options.color || "";
        this.hint = options.hint || '';
        options.controlType = this.controlType;
    }
}
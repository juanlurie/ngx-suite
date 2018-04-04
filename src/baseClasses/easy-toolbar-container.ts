import { EasyButtonField, EasyToolbarTextField } from '../factories/index';
import { EasyForm } from '../baseClasses/easy-form';
import { EasyField } from '../baseClasses/easy-field';
import { FieldOptions, ButtonTypes } from '../classes/index'

export class EasyToolbar {

    fields: EasyField[] = [];
    menus: EasyField[][] = [];

    constructor(private form: EasyForm) { }

    addButtonField(label: string, action: Function, options: FieldOptions<any> = {}): EasyButtonField {
        options.label = label;
        options.action = action;

        let field: any = new EasyButtonField(options);

        this.addField(field);

        return field;
    }

    addTextField(label: string, options: FieldOptions<any> = {}): EasyField {
        options.label = label;

        let field: any = new EasyToolbarTextField(options);

        this.addField(field);

        return field;
    }

    addField(field: EasyField) {
        this.form.setDefaultKey(field);

        this.fields.push(field);
        this.form.addField(field);
    }

    addMenu(fields: EasyField[]) {
        this.menus.add(fields);
    }
}

export class EasyToolbarContainer {

    toolbars: Array<EasyToolbar> = [];

    addToolBar(form: EasyForm): EasyToolbar {
        let toolbar = new EasyToolbar(form);
        this.toolbars.push(toolbar);
        return toolbar;
    }
}

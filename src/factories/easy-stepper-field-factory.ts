import { EasyTabField, EasyExpansionPanelField, EasyAccordionField } from '../factories/easy-card-factory';
import { EasyCardField } from '../factories/easy-card-factory';
import { EasyForm } from '../baseClasses/easy-form';
import { EasyField } from '../baseClasses/easy-field';
import { EasyContainer } from '../baseClasses/easy-container'
import { FieldOptions } from '../classes/index'

export class EasyStepperField extends EasyContainer {
    controlType = 'stepper';
    form: EasyForm

    constructor(form: EasyForm, options: FieldOptions<any> = {}) {
        super("", options, form, 'stepper');
        this.form = form;
    }

    addStepToStepperContainer(header: string, options: FieldOptions<any> = {}): EasyCardField {
        let container = new EasyCardField(header, options, this.form)
        this.addContainer(container);
        return container;
    }
}
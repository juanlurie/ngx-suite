import { EasyForm } from '../baseClasses/easy-form';
import { EasyContainer } from '../baseClasses/easy-container'
import { IEasyContainerGroup } from '../index'
import { FieldOptions } from '../classes/index'


export class EasyAccordionField extends EasyContainer {
    controlType = 'accordion';
    form: EasyForm

    constructor(form: EasyForm, options: FieldOptions<any> = {}) {
        super("", options, form, 'accordion');
        this.form = form;
    }

    addExpansionPanel(header: string, options: FieldOptions<any> = {}): EasyExpansionPanelField {
        let container = new EasyExpansionPanelField(header, options, this.form)
        this.containers.add(container);
        return container;
    }
}

export class EasyExpansionPanelField extends EasyContainer implements IEasyContainerGroup {
    controlType = 'expansion-panel';

    constructor(header: string, options: FieldOptions<any> = {}, form: EasyForm) {
        super(header, options, form, 'expansion-panel');
    }

    addCardContainer(header: string, options: FieldOptions<any> = {}): EasyCardField {
        let container = new EasyCardField(header, options, this.form)

        this.addContainer(container);

        return container;
    }

    addTabContainer(header: string, options: FieldOptions<any> = {}): EasyTabField {
        let tabs = new EasyTabField(this.form, options);
        this.addContainer(tabs);

        return tabs;
    }

    addAccordionContainer(header: string, options: FieldOptions<any> = {}): EasyAccordionField {
        let accordion = new EasyAccordionField(this.form, options);
        this.addContainer(accordion);

        return accordion;
    }

    addExpansionPanelContainer(header: string, options: FieldOptions<any> = {}): EasyExpansionPanelField {
        let container = new EasyExpansionPanelField(header, options, this.form);
        this.addContainer(container);

        return container;
    }
}

export class EasyTabField extends EasyContainer {
    controlType = 'tabs';
    form: EasyForm

    constructor(form: EasyForm, options: FieldOptions<any> = {}) {
        super("", options, form, 'tabs');
        this.form = form;
    }

    addTabToTabContainer(header: string, options: FieldOptions<any> = {}): EasyCardField {
        let container = new EasyCardField(header, options, this.form)
        this.addContainer(container)
        return container;
    }
}

export class EasyCardField extends EasyContainer implements IEasyContainerGroup {
    controlType = 'card';

    constructor(header: string, options: FieldOptions<any> = {}, form: EasyForm) {
        super(header, options, form, 'card');
    }

    addCardContainer(header: string, options: FieldOptions<any> = {}): EasyCardField {
        let container = new EasyCardField(header, options, this.form)

        this.addContainer(container);

        return container;
    }

    addTabContainer(header: string, options: FieldOptions<any> = {}): EasyTabField {
        let tabs = new EasyTabField(this.form, options);
        this.addContainer(tabs);

        return tabs;
    }

    addAccordionContainer(header: string, options: FieldOptions<any> = {}): EasyAccordionField {
        let accordion = new EasyAccordionField(this.form, options);
        this.addContainer(accordion);

        return accordion;
    }

    addExpansionPanelContainer(header: string, options: FieldOptions<any> = {}): EasyExpansionPanelField {
        let container = new EasyExpansionPanelField(header, options, this.form);
        this.addContainer(container);

        return container;
    }
}

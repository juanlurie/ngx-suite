import { EasyTabField, EasyExpansionPanelField, EasyAccordionField } from '../factories/easy-card-factory';
import { EasyCardField } from '../factories/easy-card-factory';
import { EasyContainer } from '../baseClasses/easy-container'
import { FieldOptions } from '../classes/index'

export interface IEasyContainerGroup {
    addCardContainer(header: string, options: FieldOptions<any>): EasyCardField;
    addTabContainer(header: string, options: FieldOptions<any>): EasyTabField;
    addAccordionContainer(header: string, options: FieldOptions<any>): EasyAccordionField;
    addExpansionPanelContainer(header: string, options: FieldOptions<any>): EasyExpansionPanelField;
}
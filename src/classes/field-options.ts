import { EasyFieldValidator } from '../services/validation.service'

export class FieldOptions<T> {
    color?: string
    icon?: string
    type?: string
    format?: string
    showLoader?: boolean
    columnSpan?: number
    value?: T
    key?: string
    label?: string
    required?: boolean
    order?: number = 0
    controlType?: string
    action?: Function
    xsColumnSize?: string
    smColumnSize?: string
    mdColumnSize?: string
    lgColumnSize?: string
    xlColumnSize?: string
    xsSize?: string
    smSize?: string
    mdSize?: string
    lgSize?: string
    xlSize?: string
    hint?: string
    readonly?: boolean;
    hide?: boolean;
    maxLength?: number;
    validators?: EasyFieldValidator[]
    updateAction?: Function;
    onEnter?: Function;
    skipFormValidation?: boolean;
    items?: Array<any> = [];
    showPaginator?: boolean;
    showFilter?: boolean;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    textAlign?: string;
    url?: string;
    marginLeft?: string;
    marginRight?: string;
    marginTop?: string;
    marginBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    authorizationHeader?: string;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
}
import { FieldOptions, FieldChangeDto } from '../classes/index';
import { EasyFieldValidator, EasyValidator, ValidatorType } from '../services/validation.service'
import { Observable, Subject } from 'rxjs/Rx';

export class EasyField {
  controlType: string;
  value: any = "";
  selectedItem: any = "";
  key: any = "";
  label: string;
  required: boolean;
  order: number;
  hide: boolean = false;
  columnSpan: number = 1;
  maxLength: number;

  private validators: Array<EasyFieldValidator> = [];

  public get easyValidators(): Array<EasyFieldValidator> {
    return this.validators;
  }

  onEnter: Function;
  updateAction: Function;
  field: this;
  readonly: boolean;
  valid: boolean;
  skipFormValidation: boolean;
  pristine: boolean = true;
  items: Array<any> = [];
  action: Function;
  showLoader: boolean;
  hint: string;
  showPaginator: boolean = false;
  showFilter: boolean = false;
  url: string = "";

  xsColumnSize: string;
  smColumnSize: string;
  mdColumnSize: string;
  lgColumnSize: string;
  xlColumnSize: string;
  type: any;
  options: FieldOptions<any> = {}
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  format?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  textAlign?: string;
  totalItems?: number;
  pageIndex?: number;
  pageSize?: number;
  height?: string;
  minHeight?: string;
  maxHeight?: string;

  private subject = new Subject<EasyField>();
  public onChange = this.subject.asObservable();

  constructor(options: FieldOptions<any> = {}) {
    this.options = options;
    this.type = options.type;
    this.controlType = options.controlType;
    this.value = options.value || '';
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.columnSpan = options.columnSpan || 1;
    this.xsColumnSize = options.xsColumnSize;
    this.smColumnSize = options.smColumnSize;
    this.mdColumnSize = options.mdColumnSize;
    this.lgColumnSize = options.lgColumnSize;
    this.xlColumnSize = options.xlColumnSize;
    this.hide = options.hide;
    this.readonly = options.readonly;
    this.maxLength = options.maxLength;
    this.validators = options.validators || [];
    this.updateAction = options.updateAction;
    this.skipFormValidation = options.skipFormValidation;
    this.items = options.items;
    this.action = options.action;
    this.showLoader = options.showLoader;
    this.hint = options.hint;
    this.onEnter = options.onEnter;
    this.showFilter = options.showFilter;
    this.showPaginator = options.showPaginator;
    this.url = options.url;
    this.marginLeft = options.marginLeft;
    this.marginRight = options.marginRight;
    this.format = options.format;
    this.width = options.width;
    this.minWidth = options.minWidth;
    this.maxWidth = options.maxWidth;
    this.textAlign = options.textAlign;
    this.height = options.height;
    this.minHeight = options.minHeight;
    this.maxHeight = options.maxHeight;

    this.addAdditionalProprtiesFromValidators();
  }

  public addValidator(validator: EasyFieldValidator) {
    this.validators.add(validator);

    this.addAdditionalProprtiesFromValidators();
  }

  private addAdditionalProprtiesFromValidators() {
    if (this.maxLength == null || this.maxLength == 0) {

      if (this.validators != null && this.validators.length > 0) {
        let maxLengthValidator = this.validators.filter(x => x.validatorType == ValidatorType.maxlength);
        if (maxLengthValidator.length > 0)
          this.maxLength = maxLengthValidator[0].maxlength;

      }
    }

    if (this.required) {
      let requiredValidator = this.validators.singleOrDefault(x => x.validatorType == ValidatorType.required)
      if (requiredValidator == null)
        this.validators.add(EasyValidator.Required(this.label + " is required"));
    }
    else {
      if (this.validators.any(x => x.validatorType == ValidatorType.required))
        this.required = true;
    }
  }

  valueChanged(event: FieldChangeDto) {
    this.valid = event.valid;
    this.value = event.value;
    this.pristine = false;
    this.selectedItem = event.selectedItem;
    this.subject.next(<EasyField>{ value: this.value, key: this.key, valid: this.valid, selectedItem: this.selectedItem });
  }

  public static mapFields<T>(dto: T, fields: EasyField[]) {

    Object.keys(dto).forEach(key => {
      let field = fields.singleOrDefault(x => x.key == key);
      if (field != null)
        dto[key] = field.value;
    });
  }
}

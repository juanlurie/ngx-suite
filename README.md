# Easy-Suite for Material Design for Angular (and later ionic)

This is the home for Easy-Suite. Built for Angular using Material Design. 

Component abstraction to allow easy dynamic pages. Build pages from component or in HTML.

### Installation

The latest release of Easy-Suite can be installed from npm

`npm install --save easy-suite`

### Project status
Easy Suite is currently in beta and under active development.
During beta, new features will be added regularly and APIs will evolve based on user feedback.

#### Feature status:

| Feature          | Status                              |
|------------------|-------------------------------------|
| cards            |                           Available |
| tabs             |                           Available |
| button           |                           Available |
| checkbox         |                           Available |
| checkbox-group   |                           Available |
| radio            |                           Available |
| input            |                           Available |
| select           |                           Available |
| selectKeyValue   |                           Available |
| autocomplete     |  						             Available |
| datepicker       |                       	   Available |
| data-table       |                           Available |

 
"Available" means that the components or feature is published and available for use, but may still
be missing some behaviors or polish.

### Getting started

## Step 1: Install Easy Suite

```bash
npm install --save easy-suite
```

## Step 2: Import the component modules

Import the NgModule: 

```ts
import {EasyModule} from 'easy-suite';

@NgModule({
  ...
  imports: [EasyModule],
  ...
})
```

## Step 3: Hello World

```ts

import { Component} from '@angular/core';
import { EasyForm, EasyFormService, EasyField, EasyNotification, Colors, ButtonTypes } from 'easy-suite';

@Component({
  selector: 'hello-world',
  template: '<easy-form [form]="form"></easy-form>'
})

export class HelloWorldComponent {

  form: EasyForm;

  constructor(public easyFormService: EasyFormService) { 
  	this.form = this.easyFormService.createForm();
  	this.buildForm();
  } 

  buildForm() {
    let container = this.form.addCardContainer("Hello World Title");

    container.addInputField('helloWorldInput', 'Hello World');

    container.addButtonField('Save', () => this.save(), { key:"1", color: Colors.color_primary, type: ButtonTypes.button_fab, icon: 'done' });

    let tabs = this.form.addTabContainer("Tab 1");

    let tab1 = tabs.container;
    tab1.addInputField("Input 1");

    let tab2 = tabs.tabs.addTabToTabContainer("Tab 2");
    tab2.addInputField("Input 2");
  }

  save() {
    let fields = this.form.fields;

    let text = fields.filter(x => x.key == "helloWorldInput")[0].value;

    alert('Saving ' + text)
    }

}
```

###Validation
At runtime field names are validated to ensure only one key is added to the collection. 

One of these exceptions can be thrown

```ts
FieldWithSameKeyAlreadyExistsException 
FieldWithKeyDoesNotExistException
MultipleFieldsWithSameKeyExistException 
```

###More Methods 

####Containers : 

```ts

form.addTabContainer(header: string, options: FieldOptions = {})
form.addCardContainer(header: string, options: FieldOptions = {})
form.addModalContainer(header: string, options: FieldOptions = {})

```

####Fields:
```ts
container.addInputField(label: string, options: FieldOptions = {})
container.addAutocompleteField(label: string, options: Array<KeyValue>)
container.addAutocompleteKeyValueField(label: string, options: Array<KeyValue>)
container.addCheckBoxField(label: string)
container.addSelectField(label: string, items: Array<string>
container.addSelectKeyValueField(label: string, items: Array<string>)
container.addButtonField(label: string, action: Function, options: FieldOptions = {})
container.addDatePickerField(label: string)
container.addRadioButtonField(label: string)
container.addCheckboxGroupField(label: string,items:["AA","AB"],{value:["AA"]})
container.addTableField<T>(key: string)

```

####Floating Action Buttons (FABS):

```ts
this.form = this.easyFormService.createForm();
this.form.addAction("Save", () => this.save(), { icon: Icons.icon_done, color: Colors.color_primary });
this.form.addAction("Back", () => this.back(), { icon: Icons.icon_arrow_back, color: Colors.color_warn });
```

####Modal:

```ts

constructor( private easyModal: EasyModalService) {  }

let modal = form.addModalContainer(header: string, options: FieldOptions = {})
modal.addInputField("Test");
modal.addAction("Save", () => alert('save'));
this.easyModal.showModal(modal);

```

####FieldOptions:
```ts
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
    order?: number
    controlType?: string
    action?: Function
    items?: Array<any>
    xsColumnSize?: string
    smColumnSize?: string
    mdColumnSize?: string
    lgColumnSize?: string
    xlColumnSize?: string
    hide?: boolean;
    maxLength?: number;
    validators?: Validator[]
    updateAction?: Function;
    onEnter?:Function;
}
```

### Available static types

```ts
Icons, InputTypes, ButtonTypes, Colors, DateFormats

Usage : 

import { ButtonTypes, Icons, Colors, InputTypes } from 'easy-suite';

tab.addInputField('Test Input', { type: InputTypes.input_type_password });

```

## Step 4: Events

### OnChange

All fields expose a subscription property which can be subscribed to for field changes.
Use this when fields are dependent on one another or you just need to know when something changes.

Example :

```ts
let field = container.addInputField('Hello World');

field.onChange.subscribe(x=>{
	alert(x.value);
});
```

### OnEnter

Example :

```ts
let field = container.addInputField('Hello World',{onEnter:()=>alert('Enter Pressed')});

```

## Step 5 : Handling results

To auto map a dto to the fields collection use the mapFields method on EasyForm
NB!!! Ensure the properties on the dto have been assigned values otherwise the properties aren't accessible to TypeScript

```ts
export class TestDto {
  name: string = ''; //Default value assigned.
}

 this.form.mapFields<TestDto>(this.testDto);
```

To bind updates directly to a dto use the updateAction Function in the field options

```ts
 container.addInputField('Hello World', {updateAction:(field:EasyField) => foo = field.value;});
```

The Form object exposes a fields array. As fields are upated this KeyValue Array is also updated.

```ts
 let fields = this.form.fields;

 this.field = fields.filter(x => x.key == "helloWorldInput")[0].value;
```

## Step 7 Component Validators.

Import EasyValidator

```ts
import { EasyValidator } from 'easy-suite';
```

Add validators to field

```ts
container.addInputField('Hello World', {validators: [EasyValidator.Required("Message to display")]});
```

Available validators

```ts
EasyValidator.Required("Message to display")
EasyValidator.MinLength(5,"Message to display")
EasyValidator.MaxLength(5,"Message to display")
EasyValidator.Pattern("some regex","Message to display")

```

Prebuilt validators

```ts
EasyValidator.Email("Optional Message")
EasyValidator.IdentityNumber("Optional Message")
EasyValidator.TelephoneNumber("Optional Message")

```

Checking field validation state before submitting form

```ts
let validationResult = this.form.validateForm();
```

This will return a valid flag and an array of invalid fields. Invalid fields will also be highlighted on the webpage.

## Step 7 (Optional): Usage as component directives.

```ts
  <easy-checkbox [placeholder]="field.label" [(value)]="field.value"></easy-checkbox>

  <easy-input [placeholder]="field.label" [(value)]="field.value" (change)="valueChanged()"></easy-input>

  <easy-select [placeholder]="field.label" [(selectedValue)]="field.value" [items]="field.items" (selectedValueChange)="valueChanged()"></easy-select>

  <easy-select-key-value [placeholder]="field.label" [(selectedValue)]="field.value" [items]="field.items" (selectedValueChange)="valueChanged()"></easy-select-key-value>

  <easy-autocomplete [placeholder]="field.label" [items]="field.options"></easy-autocomplete>

  <easy-button [color]="field.color" [icon]="field.icon" [type]="field.type" [displayValue]="field.label" [showLoader]="field.showLoader" (onClicked)="executeAction(field.action)"></easy-button>

  <easy-table [rows]="field.rows" [columns]="field.columns" [actions]="field.actions"></easy-table>

  <easy-date-picker [placeholder]="field.label" [(value)]="field.value"></easy-date-picker>
```

## Adding a control

Easy suite uses containers to group controls. It also utilizes a concept called containerception (Containers in containers).
To add a control we need to add to the fluent api of the container system. 

For example
```js
let container = this.form.addCardContainer("Hello world container");
container.addCheckBoxField("Check box within container")

```

To do this lets start from the back.

### Step one
Add the physical component that will be rendered. Generally adding the html, css and typescript to one file is a good approach.
In this example I'm adding a divider control.

In the controls folder add a file called easy-divider.component.ts. Copy another component and use it as a base.

```js
import { Component } from '@angular/core';

@Component({
    selector: 'easy-divider',
    template: `<mat-divider></mat-divider>`
})
export class EasyInputComponent {

}
```

### Step two
Map the component so that easy-suite knows which component to render when the field is requested from the fluent api.

Under the directives folder open the easy-form-field.component.ts file. This is just a switch.

Let's add the mapping to the bottom of the div:

```js
  <easy-divider *ngSwitchCase="'divider'"></easy-divider>  
```

### Step three
Add the factory for the control. This is where we would add any

Under the factories folder add a file called easyDividerFieldFactory.ts

```js
import { EasyField } from '../baseClasses/easyField';
import { FieldOptions } from '../index';

export class EasyDivierField extends EasyField {
  controlType = 'divider';

  constructor(options: FieldOptions<any> = {}) {
    super(options);
    options.controlType = this.controlType;
  }
}

```

### Step four
Add the fluent method.

Open easyContainer.ts in the baseClasses folder.

Add import on top of file for your field factory.
```js
import { EasyDividerField } from '../factories/easyDividerFieldFactory';
```

Add the method
```js
 addDividerField(options: FieldOptions<any> = {}): EasyDividerField {

        let field: any = new EasyDividerField(options);

        this.addField(field);

        return field;
    }
```

### Step five
Add export to index barrels file.

Open index.ts file.

Add export

```js
export * from './factories/easyDividerFieldFactory';
```

### Step six
Update module.

Open easy.module.ts in the modules folder.

Import component 
```js
import { EasyDividerComponent } from '../controls/easy-divider.component';
```

Add Declaration to declarations section
```js
EasyDividerComponent
```

Add Export to exports sections
```js
EasyDividerComponent
```

## Appendix: Configuring SystemJS

If your project is using SystemJS for module loading, you will need to add `easy-suite`
to the SystemJS configuration:

```js
System.config({
  // existing configuration options
  map: {
    // ...
    'easy-suite': 'npm:easy-suite/src/',
    'easy-core': 'npm:easy-core/src/'
    // ...
  },

  packages: {
    // ...
      'easy-core': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'easy-suite': {
        main: 'index.js',
        defaultExtension: 'js'
      }
    // ...
    }

});
```
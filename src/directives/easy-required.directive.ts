import { Directive, ElementRef, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { EasyFieldValidator, ValidatorType } from '../services/validation.service'

@Directive({ selector: '[easy-required]' })
export class RequiredDirective implements OnInit {

    @Input('validators') validators: Array<EasyFieldValidator> = [];

    constructor(private el: ElementRef) { }

    ngOnInit() {
        if (this.validators == null || this.validators.length)
            return;

        let requiredValidators = this.validators.filter(x => x.validatorType == ValidatorType.required);

        if (requiredValidators.length > 0)
            this.el.nativeElement.required = true;
    }
}
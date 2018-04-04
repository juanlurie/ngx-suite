import { Directive, ElementRef, Input, OnInit } from '@angular/core';
@Directive({ selector: '[easy-max-length]' })
export class MaxLengthDirective implements OnInit {
  @Input('easy-max-length') easyMaxLength: number;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.easyMaxLength == 0 || this.easyMaxLength == null)
      return;

    this.el.nativeElement.maxLength = this.easyMaxLength;
  }
}
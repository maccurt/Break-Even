/* eslint-disable */
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[column]',
})
export class ColumnResponsiveDirective implements OnInit {
  // @HostBinding('class') elementClass;
  @Input() position: number = 1;

  constructor(private renderer: Renderer2, private hostElement: ElementRef) { }
  ngOnInit(): void {
    console.log('position', this.position)
    let cols = 'col-responsive col-6  col-xxl-4 mb-5'
    switch (this.position.toString()) {      
      case '3':
        cols = 'col-responsive col-12 col-md-9 col-lg-12 col-xl-4 col-xxl-3';
        break;
      default:
        this.position = 1
    }

    const elementClass = 'col-responsive  position-' + this.position.toString() + ' ' + cols;
    console.log(elementClass);
    //renderer.addClass(hostElement.nativeElement, elementClass)
    this.renderer.setAttribute(this.hostElement.nativeElement, 'class', elementClass)
  }

}
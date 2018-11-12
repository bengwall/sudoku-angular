import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]'
})
export class NumericOnlyDirective {

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent): boolean {
    return (e.keyCode === 8 || e.keyCode === 37 || e.keyCode === 39) ? true : (new RegExp('^\\d+$')).test(e.key);
  }
}

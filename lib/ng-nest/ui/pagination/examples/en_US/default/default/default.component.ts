import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  index = 5;
  size = 15;
  total = 80;
  change(index: number) {}
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selected: string = '';

  myOptions = [
    {value: '', label: 'All'},
    {value: 'a', label: 'A'},
    {value: 'b', label: 'B'},
    {value: 'c', label: 'C'},
  ]
}

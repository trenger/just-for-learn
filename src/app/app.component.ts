import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Some organizer';
  static dburl = 'https://some-organizer.firebaseio.com/'
  constructor() {
    }
}

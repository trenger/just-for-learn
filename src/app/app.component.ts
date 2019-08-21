import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Управление рабочим процессом';
  menus: string[] = ['Мониторинг рабочего процесса', 'Управление работниками'];

  constructor() {
  }
}

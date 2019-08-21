import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';

export interface Day {
  id?: string;
  date: Date;
  inMonths: boolean;
  isToday: boolean;
  selected: boolean;
}

export interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  calendar: Week[];

  monthNames: string[] = ['Январь', 'Февраль', 'Март',
    'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь'];

  constructor(private dateService: DateService) {
  }

  ngOnInit() {
    this.dateService.dateBehaviorSubject.subscribe(
      this.generateCalendar.bind(this)
    );
  }

  generateCalendar(day: Date) {
    const rebuild: boolean = (!this.dateService.prevActiveDate);

    if ((!rebuild)
        && day.getMonth() === this.dateService.prevActiveDate.getMonth()
        && day.getFullYear() === this.dateService.prevActiveDate.getFullYear()) {
      this.dateService.prevActiveDate.setHours(0, 0, 0, 0);
      this.changeSelected(this.dateService.prevActiveDate);
      this.changeSelected(day);
    } else {
      const calendar: Week[] = [];
      const today: Date = new Date();
      today.setHours(0, 0, 0, 0);
      day.setHours(0, 0, 0, 0);
      let days: Day[] = [];
      let firstday: Date = this.getFirstDateOfMonth(day);
      firstday = this.addDays(firstday, -(firstday.getDay() === 0 ? 7 : firstday.getDay()));
      let lastday: Date = this.getLastDateOfMonth(day);
      lastday = this.addDays(lastday, 7 - lastday.getDay());
      let d: Date = new Date(firstday);
      while (d.getTime() !== lastday.getTime()) {
        for (let i = 1; i <= 7; i++) {
          d = this.addDays(d, 1);
          days.push({date: d, inMonths: d.getMonth() === day.getMonth(),
            isToday: d.getTime() === today.getTime(),
            selected: d.getTime() === day.getTime()});
        }
        calendar.push({days});
        days = [];
      }
      this.calendar = calendar;
    }
    // console.log(this.calendar)
  }

  addMonth(n: number) {
    this.dateService.changeMonth(n);
  }

  selectDate(date: Date) {
    this.dateService.changeDate(date);
  }

  addDays(dt: Date, day: number): Date {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + day);
  }

  getFirstDateOfMonth(day: Date): Date {
    return new Date(day.getFullYear(), day.getMonth(), 1);
  }

  getLastDateOfMonth(day: Date): Date {
    const d: Date = new Date(day.getFullYear(), day.getMonth() + 1, 1);
    d.setDate(d.getDate() - 1);
    return d;
  }

  changeSelected(date: Date): void {
    function getWeek(dt: Date): number {
      const day: number = dt.getDate() - dt.getDay() + 1;
      let week = 0;
      while (day > week * 7 + 1) {
        week++;
      }
      return week;
    }

    const weekNum: number = getWeek(date);

    for (const day of this.calendar[weekNum].days) {
      if (day.date.getTime() === date.getTime()) {
        day.selected = !day.selected;
        break;
      }
    }
  }
}

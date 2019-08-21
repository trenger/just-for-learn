import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DateService {
  public dateBehaviorSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  public prevActiveDate: Date;

  changeMonth(dir: number) {
    const value = new Date(this.dateBehaviorSubject.value.getFullYear(),
      this.dateBehaviorSubject.value.getMonth() + dir,
      this.dateBehaviorSubject.value.getDate());
    this.prevActiveDate = this.dateBehaviorSubject.value;
    this.dateBehaviorSubject.next(value);
  }

  changeDate(date: Date) {
    this.prevActiveDate = this.dateBehaviorSubject.value;
    this.dateBehaviorSubject.next(date);
  }
}

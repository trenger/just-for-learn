import {Injectable} from '@angular/core';
import {DateService} from './date.service';
import {DbProvider} from './db.provider';
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';
import {environment} from '../../environments/environment';

export interface Task {
  id?: string;
  title: string;
  desc: string;
  owner: string;
  date: Date;
  isdone: boolean;
}

@Injectable({providedIn: 'root'})
export class TaskService {
  static url = environment.dbUrl + 'tasks/';
  public tasks: Task[] = [];
  public tasksByDate: Task[] = [];

  constructor(private dateService: DateService, private db: DbProvider) {
  }

  load(date: Date): Observable<Task[]> {
    return this.db
      .read(TaskService.url + formatDate(date, 'dd-MM-yyyy', 'en-En'));
  }

  create(task: Task): Observable<Task> {
    return this.db.create(task, TaskService.url + formatDate(this.dateService.dateBehaviorSubject.value, 'dd-MM-yyyy', 'en-En'));
  }

  update(task: Task): Observable<Task> {
    return this.db.update(task.id, task, TaskService.url + formatDate(this.dateService.dateBehaviorSubject.value, 'dd-MM-yyyy', 'en-En'));
  }

  delete(id: string): void {
    this.db.delete(id, TaskService.url + formatDate(this.dateService.dateBehaviorSubject.value, 'dd-MM-yyyy', 'en-En'))
      .subscribe(() => {
        },
        err => console.log('error', err),
        () => {
          this.tasks = this.tasks.filter(value => value.id !== id);
          this.tasksByDate = this.tasksByDate.filter(value => value.id !== id);
        });
  }
}

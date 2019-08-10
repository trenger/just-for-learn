import {Injectable} from '@angular/core';
import {DateService} from './date.service';
import {DbProvider} from './db.provider';
import {AppComponent} from '../app.component';
import {Observable} from 'rxjs';
import {Worker, WorkerService} from './worker.service';
import {formatDate} from '@angular/common';

export interface Task {
  id?: string
  title: string
  desc: string
  owner: string
  workers?: string[]
  date: Date
  isdone: boolean
}

@Injectable({providedIn: 'root'})
export class TaskService {
  static url = AppComponent.dburl + 'tasks'
  public tasks: Task[] = []
  public tasksByDate: Task[] = []

  constructor(private dateService: DateService, private db: DbProvider) {}

  changeState(id: string) {
    const idx = this.tasks.findIndex(task => task.id === id);
    this.tasks[idx].isdone = !this.tasks[idx].isdone;
  }

  load(date: Date): Observable<Task[]> {
    return this.db
      .read(TaskService.url+'/'+formatDate(date, "dd-MM-yyyy", "en-En"))
  }

  create(task: Task): Observable<Task> {
    return this.db.create(task, TaskService.url+'/'+formatDate(this.dateService.dateBehaviorSubject.value, "dd-MM-yyyy", "en-En"))
  }
}

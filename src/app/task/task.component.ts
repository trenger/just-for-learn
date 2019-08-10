import { Component, OnInit } from '@angular/core';
import { TaskService} from '../shared/task.service';
import {DateService} from '../shared/date.service';
import {WorkerService} from '../shared/worker.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs'
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService,
              private dateService: DateService,
              private workerService: WorkerService) { }

  ngOnInit() {
    // не обновляет tasks
    this.dateService.dateBehaviorSubject.pipe(
      switchMap(value => this.taskService.load(value))
      ).subscribe(tasks => {
        this.taskService.tasksByDate = tasks
        if (this.workerService.workerBehaviorSubject.value !== null) {
          this.taskService.tasks = this.taskService.tasksByDate
            .filter(t => t.owner === this.workerService.workerBehaviorSubject.value.id)
        }
      })

    this.workerService.workerBehaviorSubject
      .pipe(switchMap(worker => {
        return of(this.taskService.tasksByDate.filter(t => t.owner == worker.id))}))
      .subscribe(tasks => {this.taskService.tasks = tasks})
  }

  onClick(id: string) {
    this.taskService.changeState(id)
  }

}

import { Component, OnInit } from '@angular/core';
import {Task, TaskService} from '../shared/task.service';
import {DateService} from '../shared/date.service';
import {WorkerService} from '../shared/worker.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ConfirmComponent} from '../dialog/confirm.component';
import {MatDialog} from '@angular/material';
import {ActionTaskComponent} from '../dialog/action-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService,
              private dateService: DateService,
              private workerService: WorkerService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.dateService.dateBehaviorSubject.pipe(
      switchMap(value => this.taskService.load(value))
      ).subscribe(tasks => {
        this.taskService.tasksByDate = tasks;
        if (this.workerService.workerBehaviorSubject.value !== null) {
          this.taskService.tasks = this.taskService.tasksByDate
            .filter(t => t.owner === this.workerService.workerBehaviorSubject.value.id);
        }
      });

    this.workerService.workerBehaviorSubject
      .pipe(switchMap(worker => {
        return of(this.taskService.tasksByDate.filter(t => t.owner === worker.id));
      }))
      .subscribe(tasks => {this.taskService.tasks = tasks;
      });
  }

  onCheck(task: Task) {
    task.isdone = !task.isdone;
    const idx = this.taskService.tasksByDate.findIndex(value => value.id === task.id);
    this.taskService.update(task)
      .subscribe(value => this.taskService.tasksByDate[idx] = value,
        err => console.log(err));
  }

  update(task: Task) {
    const dialogRef = this.dialog.open(ActionTaskComponent, {
      data: {title: 'Редактировать задачу', task},
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.taskService.update({...value, id: task.id, isdone: task.isdone, owner: task.owner, date: task.date})
          .subscribe(result => {
            let idx = this.taskService.tasks.findIndex(t => t.id === task.id);
            if (idx !== -1) {
              this.taskService.tasks[idx] = {...result, id: task.id};
            }
            idx = this.taskService.tasksByDate.findIndex(t => t.id === task.id);
            if (idx !== -1) {
              this.taskService.tasksByDate[idx] = {...result, id: task.id};
            }
        });
      }
    });
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {data: {title: 'Удалить задачу?'}});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.taskService.delete(id);
      }
    });
  }
}

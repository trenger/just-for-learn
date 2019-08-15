import { Component, OnInit, Inject } from '@angular/core';
import {Worker, WorkerService} from '../shared/worker.service';
import {ConfirmDialog} from '../shared/dialog/confirm.dialog';
import {MatDialog} from '@angular/material';
import {ActionWorkerDialog} from '../shared/dialog/action-worker.dialog';
import {ActionTaskDialog} from '../shared/dialog/action-task.dialog';
import {TaskService} from '../shared/task.service';
import {DateService} from '../shared/date.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  private filterText = '';
  private workerLoading: boolean = true;

  constructor(private workerService: WorkerService,
              private taskService: TaskService,
              private dateService: DateService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.workerService.load()
      .pipe()
      .subscribe(workers => {
        this.workerService.workers = workers;
        this.workerLoading = false
      }, err => {}, () => {
        if (this.workerService.workers.length > 0) {
          this.select(this.workerService.workers[0])
        }
      })
  }

  select(worker: Worker) {
    if (this.workerService.workerBehaviorSubject.value !== null) {
      const idx: number = this.workerService.workers
        .findIndex(t => t === this.workerService.workerBehaviorSubject.value);
      if (idx !== -1) {
        this.workerService.workers[idx].selected = false
      }
    }
    this.workerService.workers.find(t => t === worker).selected = true;
    this.workerService.changeWorker(worker)
  }

  remove(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {data: {title: 'Удалить работника?'}});
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.workerService.remove(id)
      }
    })
  }

  change(worker: Worker): void {
    const dialogRef = this.dialog.open(ActionWorkerDialog, {
      data: {title: 'Изменение данных работника', worker},
      width: "300px"});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workerService.update({...result, id: worker.id})
          .subscribe(value => {
            const idx = this.workerService.workers.findIndex(t => t.id == worker.id);
            if (idx !== -1) {
              this.workerService.workers[idx] = {...value, selected: worker.selected}
            }
        })
      }
    })
  }

  newWorker(): void {
    const dialogRef = this.dialog.open(ActionWorkerDialog, {
      data: {title: 'Новый работник', worker: {}},
      width: "300px"});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workerService.create(result)
          .subscribe(worker => {
            this.workerService.workers.push(worker)
          }, err => console.error(err))
      }
    })
  }

  newTask(): void {
    const dialogRef = this.dialog.open(ActionTaskDialog, {
      data: {title: 'Новая задача', task: {}},
      width: "300px"
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService
          .create({...result,
            date: this.dateService.dateBehaviorSubject.value,
            owner: this.workerService.workerBehaviorSubject.value.id,
            isdone: false})
          .subscribe(task => {
            this.taskService.tasksByDate.push(task);
            this.taskService.tasks.push(task);
          }, err => console.error(err))
      }
    })
  }
}



import {Component, OnInit} from '@angular/core';
import {Worker, WorkerService} from '../../shared/worker.service';
import {ConfirmComponent} from '../../dialog/confirm.component';
import {MatDialog} from '@angular/material';
import {ActionWorkerComponent} from '../../dialog/action-worker.component';
import {ActionTaskComponent} from '../../dialog/action-task.component';
import {TaskService} from '../../shared/task.service';
import {DateService} from '../../shared/date.service';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {

  private filterText = '';
  private workerLoading = true;
  public workers: Worker[] = [];

  constructor(private workerService: WorkerService,
              private taskService: TaskService,
              private dateService: DateService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.workerService.load()
      .pipe()
      .subscribe(workers => {
        this.workers = workers;
        this.workerLoading = false;
      }, err => {}, () => {
        if (this.workers.length > 0) {
          this.select(this.workers[0]);
        }
      });
  }

  select(worker: Worker) {
    if (this.workerService.workerBehaviorSubject.value !== null) {
      const idx: number = this.workers
        .findIndex(t => t === this.workerService.workerBehaviorSubject.value);
      if (idx !== -1) {
        this.workers[idx].selected = false;
      }
    }
    this.workers.find(t => t === worker).selected = true;
    this.workerService.selectWorker(worker);
  }

  remove(id: string): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {data: {title: 'Удалить работника?'}});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.workerService.remove(id)
          .subscribe(() => {},
              err => {console.log(err); },
            () => {this.workers = this.workers.filter(t => t.id !== id); });
      }
    });
  }

  change(worker: Worker): void {
    const dialogRef = this.dialog.open(ActionWorkerComponent, {
      data: {title: 'Изменение данных работника', worker},
      width: '450px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workerService.update({...result, id: worker.id})
          .subscribe(value => {
            const idx = this.workers.findIndex(t => t.id === worker.id);
            if (idx !== -1) {
              this.workers[idx] = {...value, selected: worker.selected};
              this.workerService.workerBehaviorSubject.next(this.workers[idx]);
            }
        });
      }
    });
  }

  newWorker(): void {
    const dialogRef = this.dialog.open(ActionWorkerComponent, {
      data: {title: 'Новый работник', worker: {}},
      width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workerService.create(result)
          .subscribe(worker => {
            this.workers.push(worker);
          }, err => console.error(err));
      }
    });
  }

  newTask(): void {
    const dialogRef = this.dialog.open(ActionTaskComponent, {
      data: {title: 'Новая задача', task: {}},
      width: '300px'
    });
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
          }, err => console.error(err));
      }
    });
  }
}

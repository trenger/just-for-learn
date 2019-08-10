import { Component, OnInit } from '@angular/core';
import {Worker, WorkerService} from '../shared/worker.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  private filterText = ''
  private workerLoading: boolean = true

  constructor(private workerService: WorkerService) {
  }

  ngOnInit() {
    this.workerService.load()
      .pipe()
      .subscribe(workers => {
        this.workerService.workers = workers
        this.workerLoading = false
      }, err => {}, () => {
        if (this.workerService.workers.length > 0) {
          this.select(this.workerService.workers[0])
          //this.workerService.workerBehaviorSubject.next(this.workerService.workers[0])
        }
      })
  }

  select(worker: Worker) {
    if (this.workerService.workerBehaviorSubject.value !== null) {
      this.workerService.workers.find(t => t === this.workerService.workerBehaviorSubject.value, null).selected = false
    }
    this.workerService.workers.find(t => t === worker).selected = true
    this.workerService.changeWorker(worker)
  }

  remove(id: string) {
    this.workerService.remove(id)
    this.workerService.workers = this.workerService.workers.filter(worker => worker.id !== id)
  }
}


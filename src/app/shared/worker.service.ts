import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DbProvider} from './db.provider';
import {AppComponent} from '../app.component';

export interface Worker {
  id?: string
  name: string
  salary: number
  job: string
  selected?: boolean
}

@Injectable({providedIn: 'root'})
export class WorkerService{
  public workerBehaviorSubject: BehaviorSubject<Worker> = new BehaviorSubject<Worker>(null);
  static url = AppComponent.dburl + 'workers';
  public workers: Worker[] = [];

  constructor(private db: DbProvider) {
  }

  load(): Observable<Worker[]> {
    return this.db.read(WorkerService.url)
  }

  create(worker: Worker): Observable<Worker>{
    return this.db.create(worker, WorkerService.url)
  }

  update(worker: Worker): Observable<Worker> {
    return this.db.update(worker.id, worker, WorkerService.url)
  }

  remove(id: string): void {
    this.db.delete(id, WorkerService.url)
      .subscribe(() =>  {},
        err => console.log('error', err),
        () => {this.workers = this.workers.filter(worker => worker.id !== id)
        })
  }

  filterWorker(search: string) {
  }

  changeWorker(worker: Worker) {
    this.workerBehaviorSubject.next(worker)
  }
}

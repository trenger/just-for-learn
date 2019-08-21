import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DbProvider} from './db.provider';
import {environment} from '../../environments/environment';

export interface Worker {
  id?: string;
  surname: string;
  name: string;
  job: string;
  salary: number;
  selected?: boolean;
}

@Injectable({providedIn: 'root'})
export class WorkerService {

  constructor(private db: DbProvider) {
  }
  static url = environment.dbUrl + 'workers';
  public workerBehaviorSubject: BehaviorSubject<Worker> = new BehaviorSubject<Worker>(null);

  load(): Observable<Worker[]> {
    return this.db.read(WorkerService.url);
  }

  create(worker: Worker): Observable<Worker> {
    return this.db.create(worker, WorkerService.url);
  }

  update(worker: Worker): Observable<Worker> {
    return this.db.update(worker.id, worker, WorkerService.url);
  }

  remove(id: string): Observable<{}> {
    return this.db.delete(id, WorkerService.url);
  }

  filterWorker(search: string) {
  }

  selectWorker(worker: Worker) {
    this.workerBehaviorSubject.next(worker);
  }
}

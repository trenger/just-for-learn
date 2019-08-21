import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Worker, WorkerService} from '../../shared/worker.service';
import {Observable} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.scss']
})
export class WorkerDetailComponent implements OnInit {

  public worker$: Observable<Worker>;

  constructor(private activatedRoute: ActivatedRoute,
              private workerService: WorkerService,
              private router: Router) {
  }

  ngOnInit() {

    this.worker$ =
    this.activatedRoute.params
      .pipe(switchMap(
        param => this.workerService.load()
          .pipe
          (map((w: Worker[]) => w.find(t => t.id === param.id)))
        )
      ); // .subscribe(value => {console.log(value)})
  }

  back() {
    this.router.navigate(['workers']);
  }
}



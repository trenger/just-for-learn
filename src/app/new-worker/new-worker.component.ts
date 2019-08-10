import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WorkerService} from '../shared/worker.service';

@Component({
  selector: 'app-new-worker',
  templateUrl: './new-worker.component.html',
  styleUrls: ['./new-worker.component.scss']
})
export class NewWorkerComponent implements OnInit {

  worker: FormGroup

  constructor(private fb: FormBuilder, private workerService: WorkerService) { }

  ngOnInit() {
    this.worker = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      job: ['', Validators.required]})
  }

  submit(){
    this.workerService.create(this.worker.value)
      .subscribe(worker => {
        this.workerService.workers.push(worker)
        this.worker.reset()
      }, err => console.error(err))
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TaskService} from '../shared/task.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {DateService} from '../shared/date.service';
import {WorkerService} from '../shared/worker.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  task: FormGroup

  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              private dateService: DateService,
              private workerService: WorkerService) { }

  ngOnInit() {
    this.task = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      desc: ['', [Validators.required]]
    })
  }

  submit() {
    let newTask: Task = {title: this.task.value.title, desc: this.task.value.desc,
                         date: this.dateService.dateBehaviorSubject.value, isdone: false,
                         owner: this.workerService.workerBehaviorSubject.value.id}

    this.taskService.create(newTask)
      .subscribe(task => {
        this.taskService.tasks.push(task)
        this.task.reset()
      }, err => console.error(err))
  }

}

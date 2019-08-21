import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-action-worker',
  templateUrl: './action-worker.component.html'
})
export class ActionWorkerComponent {

  title: string;
  form: FormGroup;
  worker: Worker;

  constructor(public matDialogRef: MatDialogRef<ActionWorkerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      surname: [data.worker.surname, [Validators.required]],
      name: [data.worker.name, [Validators.required]],
      salary: [data.worker.salary, [Validators.required, Validators.min(0)]],
      job: [data.worker.job, [Validators.required]]
    });
    this.title = data.title;
    this.worker = data.worker;
  }

  // not working
  getErrorMsg(controlName: string): string {
    console.log(controlName, 'touched');
    if (this.form.get(controlName).touched) {
      return this.form.get(controlName).hasError('required') ? 'Укажите' :
        this.form.get(controlName).hasError('min') ? 'min' : ''; }
  }
}

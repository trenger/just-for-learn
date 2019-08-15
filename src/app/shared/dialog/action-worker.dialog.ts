import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'action-worker-dialog',
  templateUrl: './action-worker.dialog.html'
})
export class ActionWorkerDialog {

  title: string;
  form: FormGroup;

  constructor(public matDialogRef: MatDialogRef<ActionWorkerDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [data.worker.name, [Validators.required, Validators.minLength(3)]],
      salary: [data.worker.salary, [Validators.required, Validators.min(0)]],
      job: [data.worker.job, [Validators.required]]
    });
    this.title = data.title
  }

  // not working
  getErrorMsg(controlName: string): string {
    console.log(controlName, 'touched');
    if (this.form.get(controlName).touched) {
      return this.form.get(controlName).hasError('required') ? "Укажите" :
        this.form.get(controlName).hasError('minlength') ? "length" :
          this.form.get(controlName).hasError('min') ? "min" : ""
    }
  }
}

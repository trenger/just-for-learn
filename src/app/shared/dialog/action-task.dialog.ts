import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'action-task-dialog',
  templateUrl: './action-task.dialog.html'
})
export class ActionTaskDialog {

  title: string;
  form: FormGroup;

  constructor(public matDialogRef: MatDialogRef<ActionTaskDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [data.task.title, [Validators.required, Validators.minLength(3)]],
      desc: [data.task.desc, [Validators.required]]
    });
    this.title = data.title
  }
}

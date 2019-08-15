import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'confrim-dialog',
  templateUrl: 'confirm.dialog.html'
})
export class ConfirmDialog {

  title: string = 'Подтвердите действие!';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) data) {
    if (data) {
      this.title = data.title
    }
  }
}

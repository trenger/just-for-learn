import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confrim',
  templateUrl: 'confirm.component.html'
})
export class ConfirmComponent {

  title = 'Подтвердите действие!';

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    if (data) {
      this.title = data.title;
    }
  }
}

import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkersProcessComponent } from './workers-process.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { TaskComponent } from '../task/task.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmComponent} from '../dialog/confirm.component';
import {ActionWorkerComponent} from '../dialog/action-worker.component';
import {ActionTaskComponent} from '../dialog/action-task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkersModule} from '../workers/workers.module';

@NgModule({
  declarations: [
    WorkersProcessComponent,
    ConfirmComponent,
    ActionWorkerComponent,
    ActionTaskComponent,
    CalendarComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    WorkersModule
  ]
})
export class WorkersProcessModule { }

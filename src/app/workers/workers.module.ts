import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersRoutingModule } from './workers-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkerDetailComponent} from './worker-detail/worker-detail.component';
import {WorkersListComponent} from './workers-list/workers-list.component';
import {WorkersFilterPipe} from '../shared/workers.filter.pipe';
import {SpinnerComponent} from '../spinner/spinner';
import {ActionWorkerComponent} from '../dialog/action-worker.component';
import {ConfirmComponent} from '../dialog/confirm.component';
import {ActionTaskComponent} from '../dialog/action-task.component';
import {
  MatListModule, MatToolbarModule
} from '@angular/material';


@NgModule({
  declarations: [
    WorkersFilterPipe,
    WorkerDetailComponent,
    WorkersListComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkersRoutingModule,
    MatListModule,
    MatToolbarModule
  ],
  exports: [
    WorkersListComponent
  ],
  entryComponents: [
  ConfirmComponent,
  ActionWorkerComponent,
  ActionTaskComponent
 ]
})
export class WorkersModule { }

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkersListComponent} from './workers-list/workers-list.component';
import {WorkerDetailComponent} from './worker-detail/worker-detail.component';

export const workersRoutes: Routes = [
  {path: 'workers', component: WorkersListComponent},
  {path: 'workers/:id', component: WorkerDetailComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(workersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkersRoutingModule {}

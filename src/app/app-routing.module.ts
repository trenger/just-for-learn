import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkersProcessComponent} from './workers-process/workers-process.component';


export const appRoutes: Routes = [
  {path: 'main', component: WorkersProcessComponent},
  {path: 'workers', redirectTo: '/workers', pathMatch: 'full'},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { WorkersComponent } from './workers/workers.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';
import { registerLocaleData } from '@angular/common';
import localeRU from '@angular/common/locales/ru';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewWorkerComponent } from './new-worker/new-worker.component';
import { DialogComponent } from './dialog/dialog.component';
import { WorkersFilterPipe } from './shared/workers.filter.pipe';
import { NewTaskComponent } from './new-task/new-task.component';


registerLocaleData(localeRU)

@NgModule({
  declarations: [
    AppComponent,
    WorkersComponent,
    CalendarComponent,
    TaskComponent,
    NewWorkerComponent,
    DialogComponent,
    WorkersFilterPipe,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru-RU" }, //replace "en-US" with your locale
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

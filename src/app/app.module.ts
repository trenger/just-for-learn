import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { WorkersComponent} from './workers/workers.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';
import { registerLocaleData } from '@angular/common';
import localeRU from '@angular/common/locales/ru';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WorkersFilterPipe } from './shared/workers.filter.pipe';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmDialog} from './shared/dialog/confirm.dialog';
import {ActionWorkerDialog} from './shared/dialog/action-worker.dialog';
import {ActionTaskDialog} from './shared/dialog/action-task.dialog';


registerLocaleData(localeRU);

@NgModule({
  declarations: [
    AppComponent,
    WorkersComponent,
    CalendarComponent,
    TaskComponent,
    WorkersFilterPipe,
    ConfirmDialog,
    ActionWorkerDialog,
    ActionTaskDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru-RU" }, //replace "en-US" with your locale
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialog,
    ActionWorkerDialog,
    ActionTaskDialog
  ]
})
export class AppModule {}

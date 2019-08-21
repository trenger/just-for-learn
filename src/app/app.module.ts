import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {WorkersProcessModule} from './workers-process/workers-process.module';
import {MatButtonModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {WorkersModule} from './workers/workers.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    WorkersProcessModule,
    WorkersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

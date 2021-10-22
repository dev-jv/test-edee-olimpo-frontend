import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './views/shared/navbar/navbar.component';
import { RecordComponent } from './views/pages/dashboard/record/record.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { FormRecordComponent } from './views/components/form-record/form-record.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecordComponent,
    DashboardComponent,
    FormRecordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

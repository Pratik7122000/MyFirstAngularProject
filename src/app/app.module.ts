import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { DummyformComponent } from './dummyform/dummyform.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeedetailService } from './service/employeedetail.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
 
    FooterComponent,
    HomeComponent,
    SideNavComponent,
    DashboardComponent,
    HeaderComponent,
    DummyformComponent,
    EmployeeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [EmployeedetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }

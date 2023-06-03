import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeedetailService } from '../service/employeedetail.service';
import { EmployeeInterface } from '../interfaces/employee';
import { HomeComponent } from '../home/home.component';
import * as alertify from 'alertifyjs'
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform: any;
  //Defining the constructor
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: EmployeedetailService,
    private router: Router, private route: ActivatedRoute) {
    //Clearing Session storage
    sessionStorage.clear();
    //Building the login form
    this.loginform = this.builder.group({
      id: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    });
  }
  username: any;
  inputid: any;
  userdata!: EmployeeInterface;
  exportdata = 123;
  sendName: any;
  //userdata: any;

  @Output() event = new EventEmitter<any>();


  sendid: any;
  data: any;
  //Function defination for proceedlogin() that checks the user provided credentials
  proceedlogin() {
    if (this.loginform.valid) {
      //Calling the service that searcehs a specific employee and returns its data
      this.api.GetEmployeebycode(this.loginform.value.id).subscribe((response: EmployeeInterface[]) => {
        // this.userdata = JSON.parse(response);
        // this.userdata=JSON.parse(response[0]);
        this.userdata = response[0];
        //this.exportdata = this.userdata.id
        //console.log("userdsta  "+this.userdata.id);
        console.log("response  " + JSON.stringify(response[0]));
        //Checking the creds provided by the user to the creds provided by the service
        if (this.userdata.id == this.loginform.value.id && this.userdata.password == this.loginform.value.password)
        {
          if (this.userdata.isactive) {
            //Setting value in the session storage
            sessionStorage.setItem('id', String(this.userdata.id));
            sessionStorage.setItem('role', this.userdata.role);
            console.log("the user id: " + this.userdata.id);
            console.log("the user pasas: " + this.userdata.password);
            //Setting value in the local storage
            localStorage.setItem("EmpName", String(this.userdata.name))
            this.router.navigate([''], {
              queryParams: { data: this.userdata.id }
            });
            this.username = this.userdata.name;
            console.log("this.username " + this.username);
          } else {
            // alert("Inactive User");
            alertify.set('notifier', 'position', 'top-center');
            alertify.error('Inactive User');
            console.log("the user id: " + this.userdata.id);
            console.log("the user pasas: " + this.userdata.password);
          }

        } else {
          alertify.set('notifier', 'position', 'top-center');
          alertify.error('Invalid Credentials');
        }
      });



    }
  }


  sendToHeader() {
    this.event.emit(this.username);
  }

}

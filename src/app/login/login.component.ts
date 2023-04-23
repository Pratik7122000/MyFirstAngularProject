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
  loginform:any;
  constructor(private builder: FormBuilder,private dialog: MatDialog, private api: EmployeedetailService,
    private router: Router, private route: ActivatedRoute) {
    sessionStorage.clear();
    this.loginform = this.builder.group({
      id: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required)
    });
  }
  username:any;
  inputid:any;
  //userdata!:EmployeeInterface[];
  userdata: any;
@Output() event= new EventEmitter<any>();
  
  // loginform = this.builder.group({
  //   id: this.builder.control('', Validators.required),
  //   password: this.builder.control('', Validators.required)
  // });
sendid:any;
 data:any;
  proceedlogin() {
    if (this.loginform.valid) {

      this.api.GetEmployeebycode(this.loginform.value.id).subscribe(res => {
        this.userdata = res;
        console.log(this.userdata);
        if (this.userdata.id === this.loginform.value.id && this.userdata.password === this.loginform.value.password) {
          if (this.userdata.isactive) {
            sessionStorage.setItem('id', this.userdata.id);
            sessionStorage.setItem('role', this.userdata.role);


            this.router.navigate([''],{
              queryParams:{data:this.loginform.value.id}
            });
           this.username=this.userdata.name;
            console.log("this.username "+this.username);
          } else {
            alertify.error('Inactive User');
          }

        } else {
          alertify.error('Invalid Credentials');
        }
      });

    }
  }

 
sendToHeader(){
  this.event.emit(this.username);
}





}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeedetailService } from '../service/employeedetail.service';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';
import { EmployeeInterface } from '../interfaces/employee';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //Defining the constructor
  constructor(private builder: FormBuilder, private service: EmployeedetailService, private router: Router) { }
  //Creating the Registration Form
  registerform = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    //Pattern provided for name that will accept only alphabets
    name: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.pattern('^[A-Za-z]+([\ A-Za-z]+)*')])),
    //passing default values in the time of user creation
    project: this.builder.control('Solutions', Validators.required),
    taskDetails: this.builder.control('None', Validators.required),
    taskGiven: this.builder.control(0, Validators.required),
    taskCompleted: this.builder.control(0, Validators.required),
    manager: this.builder.control('Alex', Validators.required),
    skill: this.builder.control('Java',),
    //Pattern provided for password that will accept alpha numeric input with minimum 8 chartaters
    password: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  employeedata!: EmployeeInterface[];
  proceedregister() {
    if (this.registerform.valid) {
      //If there is valid data in the form, Calling the service that makes a post call to create the entry
      this.service.CreateEmployee(this.registerform.value).subscribe(result => { });
      //Code to show the user his/her employee id at the time of user creation
      this.service.GetallEmployee().subscribe((response: EmployeeInterface[]) => {
        this.employeedata = response;
        console.log("last" + this.employeedata[(this.employeedata.length) - 1].id);
        //alert("Use this Employee ID to Login: "+(this.employeedata[(this.employeedata.length)-1].id+1));
        alertify.confirm("Registered successfully",
          "Please contact admin for enable access. Use this Employee ID to Login: " +
          (this.employeedata[(this.employeedata.length) - 1].id + 1),
          () => {
            //this.router.navigate(['login'])
          }, function () { })
      });
    } else {
      alertify.set('notifier', 'position', 'top-center');
      alertify.warning('Please enter valid data.')
    }
  }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeedetailService } from '../service/employeedetail.service';

import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

constructor(private builder:FormBuilder, private service:EmployeedetailService, private router: Router){

}

registerform=this.builder.group({
  id: this.builder.control({value:'', disabled: true }),
  name: this.builder.control('', Validators.required),
  project: this.builder.control('Solutions', Validators.required),
  taskDetails: this.builder.control('None', Validators.required),
  taskGiven: this.builder.control(0, Validators.required),
  taskCompleted: this.builder.control(0, Validators.required),
  manager: this.builder.control('Alex', Validators.required),
  skill: this.builder.control('Java', ),

 
  password: this.builder.control('', Validators.compose([
    Validators.required,
     Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
 
 
  role: this.builder.control(''),
  isactive: this.builder.control(false)
});

employeedata:any;
proceedregister() {
  if (this.registerform.valid) {
    this.service.CreateEmployee(this.registerform.value).subscribe(result => {
      alertify.success('Please contact admin for enable access.','Registered successfully')
      this.router.navigate(['login'])
    });
    this.service.GetallEmployee().subscribe(res=>{
      this.employeedata=res;
      console.log("last"+this.employeedata[(this.employeedata.length)-1].id);
      alert("Use this Employee ID to Login: "+this.employeedata[(this.employeedata.length)-1].id);
    });
  } else {
    alertify.warning('Please enter valid data.')
  }
}

}

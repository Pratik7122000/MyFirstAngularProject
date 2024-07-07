/*
This is the popup component. This components deals with the creation and modification of employee data. 
This component is a form that allows the user based on its role to create and modify employee details.
Patterns are used in this component.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmployeedetailService } from '../service/employeedetail.service';
import { EmployeeInterface } from '../interfaces/employee';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  editdata!: EmployeeInterface;
roleSelect:any;
  isadmin=false;
//Injecting necessary dependencies in the constructor
  constructor(private builder: FormBuilder, private route:Router,
     private dialog: MatDialog, private api: EmployeedetailService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.api.GetUserRole().subscribe(res => {
      this.rolelist = res;
    });
    console.log("GetUserRole");
    //setting role in the session storage
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
    }
    console.log("is admin role "+this.isadmin)
  }

  ngOnInit(): void {
    console.log("inside void 1");
    if (this.data.id != '' && this.data.id != null) {
      console.log("inside GetEmployeebycode "+this.data.id);
      //Setting values in the form
      this.employeeform.setValue({
        id: this.data.id, name: this.data.name, project: this.data.project,
        taskDetails: this.data.taskDetails, taskGiven: this.data.taskGiven,
        taskCompleted: this.data.taskCompleted, manager: this.data.manager,
        skill: this.data.skill,
        password: this.data.password,
        role: this.data.role, isactive: this.data.isactive
      })
      console.log("Data migrate done");
    }


  }
  rolelist: any;
  //creating the form with requirements and validations
  employeeform = this.builder.group({
    id: this.builder.control({ value:0,disabled: true }),
    name: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.pattern('^[A-Za-z]+([\ A-Za-z]+)*')])),
    // name: this.builder.control('', Validators.required),
    project: this.builder.control('Solutions', Validators.required),
    taskDetails: this.builder.control('None', Validators.required),
    taskGiven: this.builder.control(0, Validators.required),
    taskCompleted: this.builder.control(0, Validators.required),
    manager: this.builder.control('Alex', Validators.required),

    skill: this.builder.control('Java',),
    password: this.builder.control('Tech@2023', Validators.compose([
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)

  });


  SaveEmployee() {

//patching manager's name
    this.employeeform.patchValue({

      manager: "Alex",

    });
    //validating form details and saving the details in the data base
    if (this.employeeform.valid) {

      const editid = this.employeeform.getRawValue().id;
      if ( editid != 0) {
        this.api.UpdateEmployee(editid, this.employeeform.getRawValue()).subscribe(response => {
          alertify.set('notifier','position','top-center');
          alertify.success("Updated successfully");

        });
        this.closepopup();
      } 
      else {
        this.api.CreateEmployee(this.employeeform.value).subscribe(response => {
          alertify.set('notifier','position','top-center');
          alertify.success("saved successfully");

        });
        this.closepopup();
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
    console.log("Close pop done");
  }


}



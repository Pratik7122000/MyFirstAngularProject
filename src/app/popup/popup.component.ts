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

  constructor(private builder: FormBuilder, private route:Router,
     private dialog: MatDialog, private api: EmployeedetailService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.api.GetUserRole().subscribe(res => {
      this.rolelist = res;
    });
    console.log("GetUserRole");
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
    }
    console.log("is admin role "+this.isadmin)
  }

  ngOnInit(): void {
    console.log("inside void 1");
    // console.log("Inisiated");
    // console.log("Inisiated emp: "+this.data);

    if (this.data.id != '' && this.data.id != null) {
      console.log("inside GetEmployeebycode "+this.data.id);

      // this.api.GetEmployeebycode(this.data.id).subscribe((response:EmployeeInterface[]) => {
      //   this.editdata = response[0];
      //   console.log("getEmpId:" + this.editdata.id);
      //   this.employeeform.setValue({
      //     id: this.editdata.id, name: this.editdata.name, project: this.editdata.project,
      //     taskDetails: this.editdata.taskDetails, taskGiven: this.editdata.taskGiven,
      //     taskCompleted: this.editdata.taskCompleted, manager: this.editdata.manager,
      //     skill: this.editdata.skill,
      //     password: this.editdata.password,
      //     role: this.editdata.role, isactive: this.editdata.isactive

      //   })
      //   // if(this.editdata.role=='admin'){
      //   //   this.isadmin=true;
      //   //   this.roleSelect=this.editdata.role;
      //   // }
      //   console.log("role "+this.isadmin);
      // });
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


    this.employeeform.patchValue({

      manager: "Alex",

    });
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



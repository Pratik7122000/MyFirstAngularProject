import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmployeedetailService } from '../service/employeedetail.service';
import { EmployeeInterface } from '../interfaces/employee';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  editdata: any;

  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: EmployeedetailService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.api.GetUserRole().subscribe(res => {
      this.rolelist = res;
    });
  }

  ngOnInit(): void {
    // console.log("Inisiated");

    // console.log("Inisiated emp: "+this.data);

    if (this.data.id != '' && this.data.id != null) {

       this.api.GetEmployeebycode(this.data.id).subscribe(response => {
        this.editdata = response;
        console.log("getEmpId:" + this.editdata.id);
        this.employeeform.setValue({
          id: this.editdata.id, name: this.editdata.name, project: this.editdata.project,
          taskDetails: this.editdata.taskDetails, taskGiven: this.editdata.taskGiven,
          taskCompleted: this.editdata.taskCompleted, manager: this.editdata.manager,
          skill: this.editdata.skill,
          password: this.editdata.password,
          role: this.editdata.role, isactive: this.editdata.isactive

        })
      });

    }


  }
  rolelist: any;
  employeeform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
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
      if (editid != "" && editid != null) {
        this.api.UpdateEmployee(editid, this.employeeform.getRawValue()).subscribe(response => {

          this.closepopup();
          alertify.success("Updated successfully");

        });
      } else {
        this.api.CreateEmployee(this.employeeform.value).subscribe(response => {

          this.closepopup();
          alertify.success("saved successfully");

        });
      }


    }
  }

  closepopup() {

    this.dialog.closeAll();
  }


}



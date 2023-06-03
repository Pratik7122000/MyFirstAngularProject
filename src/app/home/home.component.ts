import { Component, EventEmitter, AfterViewInit, Output, ViewChild, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeedetailService } from '../service/employeedetail.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeInterface } from '../interfaces/employee';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { count } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() emplyeeid!: any;
  data: any;
  responsevalue!: number;
  employeedata!: EmployeeInterface;
  datasource: any;
  //sendName:any;
  //Defining the constructor
  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private api: EmployeedetailService) { }
  ngOnInit(): void {
    console.log("value from Login: " + this.emplyeeid);
    // Getting the data(employeeid) from the url
    this.route.queryParams.subscribe((params: any) => {
      console.log("PARAMS HOME " + params.data);
      this.data = params.data;
      console.log(this.data);
    });
    // Setting the value of employee id in EmpID in local storage
    localStorage.setItem('EmpId', String(this.data));
    this.data = localStorage.getItem('EmpId');
    // localStorage.setItem("EmpName", String(this.sendName))
    console.log("local storage:" + this.data);
    //Loading the data for the employee id
    this.LoadEmployee(this.data);
  }
  //popup component to edit the data
  Openpopup(employeedata: any) {
    console.log("emp:")
    const _popup = this.dialog.open(PopupComponent, {
      width: '800px',
      exitAnimationDuration: '800ms',
      enterAnimationDuration: '800ms',
      data: employeedata
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadEmployee(employeedata.id);
    });
  }
  // EditEmployee function calls the popup component
  EditEmployee(employeedata: any) {

    this.Openpopup(employeedata);
  }
  //Loading data using the 
  LoadEmployee(data: any) {
    this.api.GetallEmployee().subscribe((response: EmployeeInterface[]) => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].id == data) {
          console.log("responsevalue inside i: " + i)
          this.responsevalue = i
        }
      }
      console.log("responsevalue: " + this.responsevalue)
      this.employeedata = response[this.responsevalue];
      const id = this.employeedata.id;
      const name = this.employeedata.name;
      //this.sendName=name;
      const project = this.employeedata.project;
      console.log("insidew home " + id + ":" + name + ":" + project)
    });
  }
}

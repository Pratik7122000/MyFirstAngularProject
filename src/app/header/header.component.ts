/*
The Header componets contains the slider button that either hides or unhides the side nav
and also displays the logged in user's name along with a logout option
 */
import { Component, EventEmitter, AfterViewInit, Output, Input, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeedetailService } from '../service/employeedetail.service';
import { LoginComponent } from '../login/login.component';
import { EmployeeInterface } from '../interfaces/employee';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any;
  employeedata: any;
  datasource: any;
  constructor(private router: Router, private route: ActivatedRoute, private api: EmployeedetailService) {

  }
  userdata!: EmployeeInterface;
  responsevalue!: number;
  name: any;
  ngOnInit(): void {
    //getting data(employee id) from login page
    this.route.queryParams.subscribe((params: any) => {
      console.log("PARAMS " + params.data);
      this.data = params.data;
      console.log("header data value " + this.data);
    });
    this.name = localStorage.getItem('EmpName');
    // this.LoadEmployee(this.data);

    console.log("header ")
  }

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  username: any;
  receiveName($event: any) {
    this.username = $event;
  }
  //function that gets all the employees and gets the data whose employee id matches the id 
  //sent from login page
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
      //INterpolation the name variable 
      this.name = this.employeedata.name;
    });
  }
  Getid(id: any) {
    this.username = id
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}

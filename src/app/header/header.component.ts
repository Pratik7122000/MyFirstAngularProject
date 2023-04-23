import { Component, EventEmitter, AfterViewInit, Output,Input, ViewChild, OnInit } from '@angular/core';
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
data:any;
employeedata:any;
datasource: any;
constructor(private router: Router, private route: ActivatedRoute,private api: EmployeedetailService){

}
  ngOnInit(): void {
  this.route.queryParams.subscribe((params:any)=>{
    console.log("PARAMS "+params.data);
    this.data=params.data;
    console.log(this.data);
  });
  this.LoadEmployee(this.data);
  console.log("header ")
  }
 
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
username:any;
receiveName($event: any){
  this.username=$event;
}
name:any;
LoadEmployee(data:any) {

  this.api.GetEmployeebycode(data).subscribe(response => {
    this.employeedata = response;
    this.name=this.employeedata.name;
    console.log("name "+this.name);
 
  });

}

Getid(id:any){
  this.username=id
}
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
 
}

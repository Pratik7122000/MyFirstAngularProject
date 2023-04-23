import { Component, EventEmitter, AfterViewInit, Output,Input, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeedetailService } from '../service/employeedetail.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeInterface } from '../interfaces/employee';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  data:any;
  employeedata: any;
  datasource: any;
  constructor(private dialog: MatDialog,private router: Router, private route: ActivatedRoute,private api: EmployeedetailService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      console.log("PARAMS HOME "+params.data);
      this.data=params.data;
      console.log(this.data);
    });

    this.LoadEmployee(this.data);
  }
  // displayedColumns: string[] = ['id', 'name', 'project', 'taskDetails', 'taskGiven',
  //   'taskCompleted', 'manager', 'role', 'status', 'action']

    
  Openpopup(id: any) {
    console.log("emp:")
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '800ms',
      enterAnimationDuration: '800ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadEmployee(id);
    });

  }
  EditEmployee() {

    this.Openpopup(this.employeedata.id);
  }
  LoadEmployee(data:any) {

    this.api.GetEmployeebycode(data).subscribe(response => {

      this.employeedata = response;
      const id= this.employeedata.id;
      const name= this.employeedata.name;
      const project= this.employeedata.project;
      console.log(id+":"+name+":"+project)    
    });
  
  }
}

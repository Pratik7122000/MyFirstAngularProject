// import { Component, } from '@angular/core';

// import {MatTableDataSource} from '@angular/material/table';


import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeedetailService } from '../service/employeedetail.service';
import { EmployeeInterface } from '../interfaces/employee';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: EmployeedetailService) { }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  employeedata!: EmployeeInterface[];
  datasource: any;

  ngOnInit(): void {

    this.LoadEmployee();

  }

  displayedColumns: string[] = ['id', 'name', 'project', 'taskDetails', 'taskGiven',
    'taskCompleted', 'manager', 'role', 'status', 'action']

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
      this.LoadEmployee();
    });

  }

  LoadEmployee() {

    this.api.GetallEmployee().subscribe(response => {
      this.employeedata = response;
      this.datasource = new MatTableDataSource<EmployeeInterface>(this.employeedata);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;

    });

  }

  EditEmployee(id: any) {

    this.Openpopup(id);
  }

  RemoveEmployee(id: any) {
    alertify.confirm("Remove Employee", "do you want remove this employee?", () => {
      this.api.RemoveEmployeebycode(id).subscribe(r => {
        this.LoadEmployee();
        alertify.success("Removed successfully");
      });
    }, function () { })

  }

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    //const filvalue = 100001;
    this.datasource.filter = filvalue;
  }


}




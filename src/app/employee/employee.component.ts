/* 
This component creates and displays the table that holds all the
 necesary employee details and also allows the user to implement
 the CRUD(Create Read Update and Delete)  functionalities. Angular Material 
 table is used here along with sorting, pagination and search option
*/

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
  //setting up the constructor
  constructor(private dialog: MatDialog, private api: EmployeedetailService) { }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  employeedata!: EmployeeInterface[];
  datasource: any;
  //declaring the column names to be displayed
  displayedColumns: string[] = ['id', 'name', 'project', 'taskDetails', 'taskGiven',
    'taskCompleted', 'manager', 'role', 'skill', 'status', 'action']
  ngOnInit(): void {
    //calling the functio to load all the employee data
    this.LoadEmployee();
  }
  //opening popup and going to popup component and also sending employee data
  Openpopup(elementdata: any) {
    console.log("emp:" + elementdata)
    const _popup = this.dialog.open(PopupComponent, {
      width: '800px',
      exitAnimationDuration: '800ms',
      enterAnimationDuration: '800ms',
      data: elementdata
    })
    _popup.afterClosed().subscribe(r => {
      console.log("Called after close");
      this.LoadEmployee();
    });
  }
  //function declaration to load all the employees 
  LoadEmployee() {
    //Calling GetallEmployee service that gets all the employee data from the db
    this.api.GetallEmployee().subscribe((response: EmployeeInterface[]) => {
      this.employeedata = response;
      //putting the data in a MatTableDataSource variable inorder to display it in the table
      this.datasource = new MatTableDataSource<EmployeeInterface>(this.employeedata);
      //declaring paginators and sorting functionalities
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }
  //function declaration for editing employee, this calls the Openpopup and passes the employee data
  EditEmployee(elementdata: any) {
    console.log("test: " + JSON.stringify(elementdata))
    this.Openpopup(elementdata);
  }
  //Function declaration to delete a specific employee using employee ID
  RemoveEmployee(id: any) {
    alertify.confirm("Remove Employee", "do you want remove this employee?", () => {
      this.api.RemoveEmployeebycode(id).subscribe(r => {
        console.log("r.id:" + r.id);
        this.LoadEmployee();
        alertify.set('notifier', 'position', 'top-center');
        alertify.success("Removed successfully");
      });
    }, function () { })
  }
  //Function declaration for filter operation
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filvalue;
  }
}




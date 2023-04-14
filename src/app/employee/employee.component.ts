// import { Component, } from '@angular/core';

// import {MatTableDataSource} from '@angular/material/table';


import {OnInit, AfterViewInit , Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeedetailService } from '../service/employeedetail.service';
import { EmployeeInterface } from '../interfaces/employee';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
 
  constructor(private service: EmployeedetailService) { }
  dataSource:any;
  userdata!: EmployeeInterface[];
 // userdata: any;



  ngAfterViewInit() {
    
    
  }

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  ngOnInit(): void {
    this.Getallemployee();
  }

  displayedColumns: string[] = ['empID', 'name', 'project', 'taskDetails', 'taskGiven',
  'taskCompleted', 'manager','skill'];
 

  //data :EmployeeInterface;

  Getallemployee() {
    this.service.GetallEmployee().subscribe((data : EmployeeInterface[]) => {
      console.log(data);
      this.userdata = data;
      this.dataSource = new MatTableDataSource(this.userdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.userdata);
    });
  }




  

  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
 

  
}



// export interface userdata {
 
//   empID: number;
//   name: string;
//   project: string;
//   manager: string;
//   skill: string;
//   gender: string;

// }

// const ELEMENT_DATA: EmployeeData[] = [
  
//   {
//     name:"John",
//     empID: 123456,
//     skill:"React",
//     project:"Cognizant internal",
//     manager:"Alex",
//     gender:"M"
//     },
//     {
//       name:"Jolly",
//         empID: 123466,
//         skill:"Angular",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"F"
//     },
//     {
//       name:"James",
//         empID:123454,
//         skill:"Java",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"M"
//     },
//     {
//       name:"Jonas",
//         empID:123416,
//         skill:"Angular",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"M"
//     },
//     {
//       name:"Jammie",
//       empID:123459,
//         skill:"Database",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"M"
//     },
//     {
//       name:"Jasmine",
//         empID:123256,
//         skill:"React",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"F"
//     },
//     {
//       name:"Jarred",
//         empID:193456,
//         skill:"Java",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"M"
//     },
//     {
//       name:"Jacob",
//         empID:123156,
//         skill:"Python",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"M"
//     },
//     {
//       name:"Jane",
//         empID:123856,
//         skill:"React",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"F"
//     },
//     {
//       name:"Julia",
//         empID:173456,
//         skill:"Javascript",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"F"
//     },
//     {
//       name:"Donald",
//         empID:173434,
//         skill:"Python",
//         project:"Cognizant internal",
//         manager:"Alex",
//         gender:"M"
//     }
// ];
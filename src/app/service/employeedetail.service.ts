import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { EmployeeInterface } from '../interfaces/employee';
import { RoleInterface } from '../interfaces/role';
import { DYNAMIC_TYPE } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmployeedetailService {

  constructor(private http:HttpClient) { }

  url:string="http://localhost:3000/employees"

//  service to fetch all employee data
  GetallEmployee(): Observable<EmployeeInterface[]>{
    return this.http.get<EmployeeInterface[]>(this.url);
  }
// service to fetch specific employee data
  GetEmployeebycode(id: any): Observable<EmployeeInterface[]> {
    let value = this.http.get<EmployeeInterface[]>(this.url+'/'+id);
    console.log("Json: "+JSON.stringify(value))
    console.log("value of id: "+value)
    return value

//    return this.http.get<EmployeeInterface[]>(this.url+'/'+id);
  }
//service to remove an employee
  RemoveEmployeebycode(id: any) {
    return this.http.delete<EmployeeInterface>(this.url+'/'+id);
  }
//service to create an employee
  CreateEmployee(employeedata: any) {
    const j1 = JSON.stringify(employeedata)
    console.log("createEmployee:"+j1)
    const headers = { 'content-type': 'application/json'}
    var response = this.http.post(this.url+'/adduser',employeedata,{'headers':headers})
    console.log("response:"+response);
    return response;

  }
//service to update an employee
  UpdateEmployee(id: any, employeedata: any) {
    console.log("UpdateEmployee: "+employeedata);
    return this.http.put(this.url+'/'+id,employeedata);
  }
//putting value in session storage
  IsLoggedIn(){
    return sessionStorage.getItem('id')!=null;
  }
  GetRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  //fetching roles
  GetUserRole(): Observable<RoleInterface[]>{
    return this.http.get<RoleInterface[]>('http://localhost:3000/role');
  }

  Getaccessbyrole(role:any,menu:any){
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }

}

// addPerson(person:Person): Observable<any> {

//       const headers = { 'content-type': 'application/json'}  
  
//       const body=JSON.stringify(person);
  
//       console.log(body)
  
//       return this.http.post(this.baseURL + 'people', body,{'headers':headers})
  
//     }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { EmployeeInterface } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeedetailService {

  constructor(private http:HttpClient) { }

  url:string="http://localhost:3000/employees"

 
  GetallEmployee(): Observable<EmployeeInterface[]>{
    return this.http.get<EmployeeInterface[]>(this.url);
  }

  GetEmployeebycode(id: any): Observable<EmployeeInterface[]> {
    return this.http.get<EmployeeInterface[]>(this.url+'/'+id);
  }

  RemoveEmployeebycode(id: any) {
    return this.http.delete(this.url+'/'+id);
  }

  CreateEmployee(employeedata: any) {
    const j1 = JSON.stringify(employeedata)
    console.log("createEmployee:"+j1)
    const headers = { 'content-type': 'application/json'}
    var response = this.http.post(this.url,j1,{'headers':headers})
    console.log("response:"+response);
    return response;

  }

  UpdateEmployee(id: any, employeedata: any) {
    return this.http.put(this.url+'/'+id, employeedata);
  }
}

// addPerson(person:Person): Observable<any> {

//       const headers = { 'content-type': 'application/json'}  
  
//       const body=JSON.stringify(person);
  
//       console.log(body)
  
//       return this.http.post(this.baseURL + 'people', body,{'headers':headers})
  
//     }
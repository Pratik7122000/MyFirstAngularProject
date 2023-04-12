import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeInterface } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeedetailService {

  url:string="../assets/employeeList.json/"

  constructor(private http:HttpClient) { }
  GetallEmployee(): Observable<EmployeeInterface[]>{
    return this.http.get<EmployeeInterface[]>(this.url);
  }
}

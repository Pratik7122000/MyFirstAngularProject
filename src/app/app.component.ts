import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeedetailService } from './service/employeedetail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'admin-panel-layout';
  ismenurequired:boolean=false;
  sideBarOpen :boolean= true;
  isadminuser=false;
  constructor(private router: Router, private api: EmployeedetailService){}
ngDoCheck(): void {
  let currenturl=this.router.url;
  if(currenturl=='/login' ||currenturl=='/register' ){
    this.ismenurequired=false;
  }else{
    this.ismenurequired=true;
  }
  
}
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}

/*This is the side nav component. This component holds the routing links to the 
dashboard and employee pages. These navigation links will only be visible to the admin login.
 */
import { Component, DoCheck, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  isadmin = false;
  empid : any;
  constructor(private route: Router) { }
  //Checking role to restrict featurs foe non admin users
  ngDoCheck(): void {
    let currentroute = this.route.url;
    // getting role and employee ID values from session and local storage
    let role = sessionStorage.getItem('role');
    this.empid = localStorage.getItem('EmpId');
    
    //Checking if the role of the logged in user is admin or not
    if (role == 'admin') {
      this.isadmin = true;
    } else {
      this.isadmin = false;
    }
  }
}


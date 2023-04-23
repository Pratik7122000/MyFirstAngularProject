import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeedetailService } from '../service/employeedetail.service';
import * as alertify from 'alertifyjs'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: EmployeedetailService, private router: Router,) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    if (this.service.IsLoggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'employee' || menu == 'dashboard') {
          if (this.service.GetRole() == 'admin') {
            return true;
          } else {
            this.router.navigate(['']);
              alertify.error('You dont have access.')
            return false;
          }
        }else{
          return true;
        }
      } else {
        return true;
      }
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { DummyformComponent } from './dummyform/dummyform.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  
  { path:'', component:HomeComponent, canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate:[AuthGuard] },
 //{ path: 'employee', component: EmployeeComponent,  },
  { path: 'login', component:LoginComponent },
  {path:'register',component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

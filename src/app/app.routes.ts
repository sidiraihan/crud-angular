import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employee', component: EmployeeListComponent,  canActivate: [AuthGuard] },
  { path: 'employee/new', component: EmployeeAddComponent,  canActivate: [AuthGuard] },
  { path: 'employee/:id', component: EmployeeDetailComponent,  canActivate: [AuthGuard] },
];

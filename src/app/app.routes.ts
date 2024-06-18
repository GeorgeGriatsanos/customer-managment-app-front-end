import { Routes } from '@angular/router';
import { authGuard } from './_service/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { AddcustomerComponent } from './component/addcustomer/addcustomer.component';
import { RegisterComponent } from './component/register/register.component';
import { CustomerComponent } from './component/customer/customer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'customer',
    canActivate: [authGuard],
    children: [
      { path: 'all', component: CustomerComponent, canActivate: [authGuard] },
      { path: 'edit/:id', component: AddcustomerComponent, canActivate: [authGuard] }
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'customer-add', component: AddcustomerComponent, canActivate: [authGuard] },
];

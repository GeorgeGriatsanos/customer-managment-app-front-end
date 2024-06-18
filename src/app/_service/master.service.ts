import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../../_model/customer';
import { Router } from '@angular/router';
import { Observable, tap, map, throwError, catchError } from 'rxjs';
import { LoginUser } from '../../_model/loginUser';
import { RegisterUser } from '../../_model/regiterUser';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllCustomer(userId: string): Observable<Customer[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Customer[]>('http://localhost:8080/api/customer/all', {
      params,
    });
  }

  createCustomer(customer: Customer): Observable<Customer> {
   
    return this.http
      .post<Customer>('http://localhost:8080/api/customer/add', customer)
      .pipe(
        tap(() => {
          this.router.navigate(['customer/all']);
        })
      );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http
      .put<Customer>('http://localhost:8080/api/customer/update', customer)
      .pipe(
        tap(() => {
          this.router.navigate(['customer/all']);
        })
      );
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(
      'http://localhost:8080/api/customer/delete/' + id
    );
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      'http://localhost:8080/api/customer/find/' + id
    );
  }

  loginUser(loginUser: LoginUser): Observable<any> {
    return this.http.post<{ success: boolean; userId?: string }>(
      'http://localhost:8080/api/user/login',
      loginUser
    );
  }
  registerUser(registerUser: RegisterUser): Observable<boolean> {
    return this.http
      .post<boolean>('http://localhost:8080/api/user/register', registerUser)
      .pipe(
        tap((response) => {
          if (response) {
            localStorage.setItem('isRegistered', 'true');
            this.router.navigate(['login']);
          }
        })
      );
  }

  addCustomerToUser(userId: number, customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `http://localhost:8080/api/user/${userId}/customer`,
      customer
    );
  }

  haveAccess(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }

  private apiUrl = 'http://localhost:8080/api/user'; 

  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/checkUsername/${username}`);
  }

   
  checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.apiUrl}/check-email/${email}`;
    return this.http.get<boolean>(url).pipe(
      catchError((error) => {
        console.error('Error checking email existence', error);
        return throwError(error);
      })
    );
  }

}

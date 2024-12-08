import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

// import { ToastrService } from 'ngx-toastr';
import { Customer } from '../models/customer.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class customerService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('currentUser')!)
  );

  private apiUrl = 'http://localhost:8080/api/customers'; // Updated API URL for localhost

  constructor(private _router: Router, private _http: HttpClient, private _toastrService: ToastrService) {
    // Check if Logged in Or Not
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }





  login(email: string, password: string): Observable<any> {
    console.log('LOGIN TRIGGERED');
    return this._http
      .post<Customer>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response: Customer) => {
          if (response) {
            // Store user details
            this.storeUser(response);
            // Navigate to home
            this._router.navigate(['/home']);

            return { success: true, user: response };
          } else {
            // Handle invalid login
            return { success: false, message: 'Invalid email or password' };
          }
        }),
        catchError((error) => {
          console.error(error);
          return of({ success: false, message: error?.error?.message || 'An error occurred' });
        })
      );

  }

  register(email: string, username: string, password: string) {
    const newUser: Customer = {
      email,
      username,
      password,
      id: '',
      phoneNumber: 0,
      isActive: false,
      role: 'vendor',
      shippingAddress: '',
      orderHistory: [],
    };

    return this._http.post<any>(`${this.apiUrl}/register`, newUser).pipe(
      catchError((error) => {
        return of({ success: false, message: 'Registration failed' });
      }),
      map(() => {
        // this.storeUser(newUser);
        console.log(typeof newUser);

        this._router.navigate(['/order']);
        return { success: true, user: newUser };
      })
    );
  }

  storeUser(user: Customer) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this._toastrService.success(
      "Logged Out", "", {
      timeOut: 1000, positionClass: "toast-top-right",
    });
    this._router.navigate(['/home']);

  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser() {
    return this.currentUserSubject.asObservable();
  }
}

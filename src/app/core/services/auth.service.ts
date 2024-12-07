import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';




@Injectable({
  providedIn: 'root'
})



export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  // public currentUser = this.currentUserSubject.asObservable();
  
  private apiUrl = 'https://673df6120118dbfe86098e84.mockapi.io/login/users';


  constructor(private router: Router,private _toastr : ToastrService , private _http : HttpClient) {
    //Check if Logged in Or Not
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<any> { 
    return this._http.get<User>(this.apiUrl).pipe(
      catchError((error) => {
        console.log(error); 
        return of({ success: false, message: error });
        
      }),
      map((response: any) => {
        console.log(response);
        if (Array.isArray(response)) {
          const user = response.find(u => u.email === email && u.password === password);
          if (user) {
            this.storeUser(user); 
            this._toastr.success(
              'Continue Shopping',
              `Welcome ${user.username}`,
            )
            this.router.navigate(['/home']);  
            return { success: true, user };
          } else {
            return { success: false, message: 'Invalid email or password' };
          }
        } else {
          return { success: false, message: 'Invalid response from server' };
        }
      })
    );
  }

  register(email: string, username: string, password: string){
  // Observable<any> {
    // const newUser: User = { email, username, password };
  
    // return this._http.post(this.apiUrl, newUser).pipe(
    //   catchError((error) => {
    //     return of({ success: false, message: 'Registration failed' });
    //   }),
    //   map(() => {
    //     this.storeUser(newUser); 
    //     this.router.navigate(['/order']); 
    //     return { success: true, user: newUser }; 
    //   })
    // );
  }

  
  private storeUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
    this._toastr.success(
      'User Logged Out',
    )
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
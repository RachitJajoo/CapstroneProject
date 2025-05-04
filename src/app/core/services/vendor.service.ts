import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Vendor } from '../models/vendor.model'; // Assume there's a Vendor model defined.
import { Order } from '../models/order.model';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private currentVendorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('currentVendor')!)
  );

  private apiUrl = 'https://ecommerce-app-backend-j51c.onrender.com/api/vendors'; // API URL for vendor endpoints

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _toastrService: ToastrService
  ) {
    const storedVendor = localStorage.getItem('currentVendor');
    if (storedVendor) {
      this.currentVendorSubject.next(JSON.parse(storedVendor));
    }
  }

  login(email: string, password: string): Observable<any> {
    //consle.log('Vendor LOGIN TRIGGERED');
    return this._http
      .post<Vendor>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response: Vendor) => {
          if (response) {
            this.storeVendor(response);
            this._router.navigate(['/vendor/home']);
            return { success: true, vendor: response };
          } else {
            return { success: false, message: 'Invalid email or password' };
          }
        }),
        catchError((error) => {
          console.error(error);
          return of({ success: false, message: error?.error?.message || 'An error occurred' });
        })
      );
  }

  register(vendorData:any): Observable<any> {
    const newVendor: Vendor = {
      ...vendorData,
      isActive: false,
      role: 'vendor',
      productList: [],
    };

    return this._http.post<any>(`${this.apiUrl}/register`, newVendor).pipe(
      map((response) => {
        this._toastrService.success(
          'Registration successful! Please login.',
          'Success',
          { timeOut: 2000, positionClass: 'toast-top-right' }
        );
        this._router.navigate(['/vendor/home']);
        return { success: true, vendor: response };
      }),
      catchError((error) => {
        console.error(error);
        return of({ success: false, message: 'Registration failed' });
      })
    );
  }


  
  /**
   * Fetch vendor information by vendor ID
   * @param vendorId - The ID of the vendor
   * @returns Observable containing vendor information
  */
 getVendorInfo(vendorId: string): Observable<any> {
    return this._http.get<Vendor>(`${this.apiUrl}/${vendorId}/info`);
  }
  
  /**
   * Fetch vendor orders by vendor ID
   * @param vendorId - The ID of the vendor
   * @returns Observable containing vendor orders
   */
  
  
  getVendorProducts(vendorId : string) : Observable<any[]>{
    return this._http.get<Item[]>(`https://ecommerce-app-backend-j51c.onrender.com/api/items/vendor/${vendorId}`);
  }
  
  
  
  storeVendor(vendor: Vendor) {
    this.currentVendorSubject.next(vendor);
    localStorage.setItem('currentVendor', JSON.stringify(vendor));
  }
  
  
  
  logout() {
    this.currentVendorSubject.next(null);
    localStorage.removeItem('currentVendor');
    this._toastrService.success('Logged Out', '', {
      timeOut: 1000,
      positionClass: 'toast-top-right',
    });
    this._router.navigate(['/vendor-login']);
  }
  
  isLoggedIn(): boolean {
    return !!this.currentVendorSubject.value;
  }
  
  get currentVendor() {
    return this.currentVendorSubject.asObservable();
  }



  getCategories() :Observable<any>{
    return this._http.get(`${this.apiUrl}/categories/get`);
  }

}

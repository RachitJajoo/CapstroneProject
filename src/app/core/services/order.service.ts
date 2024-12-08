import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private getVendorHeaders(): { headers: { Authorization: string } } {
    const adminString = localStorage.getItem('currentVendor');
    let token = '';
    if (adminString) {
      token = JSON.parse(adminString).jwtToken;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  private getCustomerHeaders(): { headers: { Authorization: string } } {
    const adminString = localStorage.getItem('currentUser');
    let token = '';
    if (adminString) {
      token = JSON.parse(adminString).jwtToken;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  constructor(private _http : HttpClient ) { }


  private baseUrl:string = "http://localhost:8080/api/orders";


  getOrderByCustomerId(customerId : string) : Observable<any>{
    return this._http.get<Order[]>(`${this.baseUrl}/customer/${customerId}` , this.getCustomerHeaders());
  }


  getOrderByVendorId(vendorId : string) : Observable<any>{
    return this._http.get<Order[]>(`${this.baseUrl}/vendor/${vendorId}` , this.getVendorHeaders());
  }



  
}

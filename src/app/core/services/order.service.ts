import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cartItem.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private _http: HttpClient, private _authService: AuthService) { }


  private baseUrl: string = "http://localhost:8080/api/orders";


  getOrderByCustomerId(customerId: string): Observable<any> {
    return this._http.get<Order[]>(`${this.baseUrl}/customer/${customerId}`, this._authService.getCustomerHeaders());
  }


  getOrderByVendorId(vendorId: string): Observable<any> {
    return this._http.get<Order[]>(`${this.baseUrl}/vendor/${vendorId}`, this._authService.getVendorHeaders());
  }

  addOrder(cartItems: CartItem[]): Observable<any> {
    return this._http.post(`${this.baseUrl}/add`, cartItems, this._authService.getVendorHeaders());
  }


}

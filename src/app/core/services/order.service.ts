import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http : HttpClient ) { }


  private baseUrl:string = "http://localhost:8080/api/orders";


  getOrderByCustomerId(customerId : string) : Observable<any>{
    return this._http.get<Order[]>(`${this.baseUrl}/customer/${customerId}`);
  }


  getOrderByVendorId(vendorId : string) : Observable<any>{
    return this._http.get<Order[]>(`${this.baseUrl}/vendor/${vendorId}`);
  }



  
}

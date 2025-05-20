import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = "http://localhost:8080/api/cart"; // Base URL for cart-related APIs

  constructor(private http: HttpClient , private _authService : AuthService ) { }



  /**
   * Get all cart items for a specific customer.
   * @param customerId The ID of the customer.
   */
  getCartItems(customerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${customerId}` , this._authService.getCustomerHeaders());
  }


  addCartItem(customerId :string , cartItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add/${customerId}`, cartItem ,this._authService.getCustomerHeaders());
  }


  updateCartItem(customerId: string, cartItemId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${customerId}/update/${cartItemId}`, quantity ,this._authService.getCustomerHeaders());
  }


  clearCart(customerId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear/${customerId}` ,this._authService.getCustomerHeaders());
  }

}

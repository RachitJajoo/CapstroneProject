import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = "http://localhost:8080/api/cart"; // Base URL for cart-related APIs

  constructor(private http: HttpClient) { }


  private getHeaders(): { headers: { Authorization: string } } {
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

  /**
   * Get all cart items for a specific customer.
   * @param customerId The ID of the customer.
   */
  getCartItems(customerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${customerId}` , this.getHeaders());
  }


  addCartItem(cartItem: any): Observable<any> {
    // console.log(`${this.baseUrl}/add`);

    return this.http.post<any>(`${this.baseUrl}/add`, cartItem);
  }


  updateCartItem(customerId: string, cartItemId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${customerId}/update/${cartItemId}`, quantity );
  }


  clearCart(customerId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clear/${customerId}`);
  }




}

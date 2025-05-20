import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = "http://localhost:8080/api/wishlist";

  constructor(
    private http: HttpClient,
    private _authService: AuthService
  ) { }

  /**
   * Add an item to the wishlist
   * @param userId The ID of the user
   * @param itemId The ID of the item to add
   */
  addToWishlist(userId: string, itemId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/add?userId=${userId}&itemId=${itemId}`,
      {},
      this._authService.getCustomerHeaders()
    );
  }

  /**
   * Get all items in the user's wishlist
   * @param userId The ID of the user
   */
  getWishlistItems(userId: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/${userId}`,
      this._authService.getCustomerHeaders()
    );
  }

  /**
   * Remove an item from the wishlist
   * @param userId The ID of the user
   * @param itemId The ID of the item to remove
   */
  removeFromWishlist(userId: string, itemId: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/remove?userId=${userId}&itemId=${itemId}`,
      this._authService.getCustomerHeaders()
    );
  }
} 
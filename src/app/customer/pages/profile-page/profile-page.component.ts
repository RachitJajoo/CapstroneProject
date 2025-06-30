import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { customerService } from 'src/app/core/services/customer.service';
import { OrderService } from 'src/app/core/services/order.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  currentUser: any = null; // Holds user data
  orderHistory: any[] = []; 
  currentSection='orderHistory';
  expandedOrderId: string | null = null;
  id : string = '';
  wishlistItems: any[] = [];
  wishlistLoading: boolean = false;

  constructor(
    private _customerService : customerService ,
    private _orderService: OrderService,
    private _wishlistService: WishlistService,
    private _toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getCurrentUser();
    this.loadOrderHistory();
    if (this.currentSection === 'Wishlist') {
      this.loadWishlistItems();
    }
  }

  ngDoCheck(): void {
    // Load wishlist when section changes
    if (this.currentSection === 'Wishlist' && this.wishlistItems.length === 0 && !this.wishlistLoading) {
      this.loadWishlistItems();
    }
  }

  // Fetch current user from localStorage
  getCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.id = this.currentUser.id;
    } else {
      console.error('No user found in localStorage!');
      // Redirect or handle unauthenticated user case here, e.g.,
      // this.router.navigate(['/login']);
    }
  }

  // Mock method to load order history (replace with actual service call)
  loadOrderHistory(): void {
    this._orderService.getOrderByCustomerId(this.id).subscribe({
        next:(res)=>{
          //consle.log(res);
          this.orderHistory = res;
        }
    })
    
  }

  // Mock method to log the user out
  logout(): void {
    this._customerService.logout();
  }

  toggleDetails(orderId: string) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  onUpdateDetails(){}

  loadWishlistItems() {
    if (this.currentUser) {
      this.wishlistLoading = true;
      this._wishlistService.getWishlistItems(this.currentUser.id).subscribe({
        next: (items) => {
          this.wishlistItems = items;
          this.wishlistLoading = false;
        },
        error: (error) => {
          this._toastr.error('Failed to load wishlist items');
          this.wishlistLoading = false;
        }
      });
    }
  }

  removeFromWishlist(itemId: string) {
    if (this.currentUser) {
      this._wishlistService.removeFromWishlist(this.currentUser.id, itemId).subscribe({
        next: () => {
          this._toastr.success('Item removed from wishlist');
          this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
        },
        error: () => {
          this._toastr.error('Failed to remove item from wishlist');
        }
      });
    }
  }

  navigateToItem(itemId: string) {
    // Implement navigation logic if needed
  }
}

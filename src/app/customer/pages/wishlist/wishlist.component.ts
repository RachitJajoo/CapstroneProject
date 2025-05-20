import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/core/models/customer.model';
import { Item } from 'src/app/core/models/item.model';
import { customerService } from 'src/app/core/services/customer.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  currentUser!: Customer | null;
  wishlistItems: Item[] = [];
  loading: boolean = true;

  constructor(
    private _wishlistService: WishlistService,
    private _customerService: customerService,
    private _router: Router,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._customerService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadWishlistItems();
      } else {
        this._router.navigate(['/login']);
      }
    });
  }

  loadWishlistItems() {
    if (this.currentUser) {
      this.loading = true;
      this._wishlistService.getWishlistItems(this.currentUser.id).subscribe({
        next: (items) => {
          this.wishlistItems = items;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading wishlist:', error);
          this._toastr.error('Failed to load wishlist items');
          this.loading = false;
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
        error: (error) => {
          console.error('Error removing from wishlist:', error);
          this._toastr.error('Failed to remove item from wishlist');
        }
      });
    }
  }

  navigateToItem(itemId: string) {
    this._router.navigate(['/item', itemId]);
  }
} 
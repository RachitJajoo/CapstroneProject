import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/core/models/cartItem.model';
import { Customer } from 'src/app/core/models/customer.model';
import { Item } from 'src/app/core/models/item.model';
import { CartService } from 'src/app/core/services/cart.service';
import { customerService } from 'src/app/core/services/customer.service';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  addToWishlist() {
    throw new Error('Method not implemented.');
  }

  currentuser!: Customer | null;
  currentItem: Item | null = null;
  id: string | null = null;
  route = inject(ActivatedRoute);
  cart: any[] = [];
  quantity: number = 0;

  reviews: any[] = [];


  constructor(private _itemService: ItemService, private _toastr: ToastrService, private _router: Router,private _cartService: CartService, private _customerService: customerService , private _http : HttpClient) { }

  

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      
      this.id = params.get('id');  // Get the dynamic id from the URL
      this._itemService.getItemById(this.id || '').subscribe({
        next: (res) => {
          //consle.log(res);

          this.currentItem = res;
          this.reviews = res.reviews;
        },
        error: (e) => {
          //consle.log(e);
        },
      });
    });

    this._customerService.currentUser.subscribe(user => {
      this.currentuser = user;
    });

    if (typeof window !== 'undefined') {
      this.cart = localStorage.getItem('Cart') ? JSON.parse(localStorage?.getItem('Cart') as string) : [] as Item[];
    }
  }

  increaseCount() {
    if(this.currentItem && this.quantity < this.currentItem?.stockQuantity )this.quantity++;
  }
  decreaseCount() {
    if (this.quantity >= 1) this.quantity--;
  }


  addToCart(): void {
    
    if (!this.currentuser) {
      this._toastr.error(
        "You need to login first"
      );
      this._router.navigate(["login"]);
      return;
    };
    
    const newCartItem: CartItem = {
      customerId: this.currentuser?.id || '',
      itemId: this.currentItem?.id || '',
      quantity: this.quantity,
      addedAt: new Date(),
    }
    //consle.log(newCartItem);
    this._cartService.addCartItem( this.currentuser.id , newCartItem).subscribe({
      next: () => {
        this._toastr.success(
          "ITEM ADDED TO CART", "CONTINE SHOPPING", {
          timeOut: 1000
        }
        )
      },
      error: (err) => {
        console.error('Error adding item to cart:', err);
      },
    });
  }


  newReview = {
    review: '',
    rating: 0
  };
  submitReview() {
    if (this.newReview.review && this.newReview.rating > 0) {
      const review = {
        ...this.newReview,
        customerId: this.currentuser?.id,  // You can dynamically set this if needed
      };

      // Add the new review to the list of reviews
      this._http.post(`https://ecommerce-app-backend-j51c.onrender.com/api/reviews/add/${this.id}` , review).subscribe({
        next:(res)=>{
          window.location.reload();
        }
      });

      // Reset the form values
      this.newReview = { review: '', rating: 0 };
    }
  }

}

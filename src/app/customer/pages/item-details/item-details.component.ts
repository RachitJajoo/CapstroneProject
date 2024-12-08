import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class ItemDetailsComponent implements OnInit{
addToWishlist() {
throw new Error('Method not implemented.');
}


  currentuser!: Customer | null;
  currentItem: Item | null = null;
  id: string | null = null;
  route = inject(ActivatedRoute);
  cart: any[] = [];
  quantity : number = 0;



  constructor(private _itemService : ItemService, private _toastr : ToastrService , private _cartService : CartService , private _customerService : customerService ){}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');  // Get the dynamic id from the URL
        this._itemService.getAllItems().subscribe({
          next: (res) => {
            this.currentItem = res.find(item => item.id === this.id) || null;
          },
          error: (e) => {
            console.log(e);
          },
        });
      });

  
      if (typeof window !== 'undefined') {
        this.cart = localStorage.getItem('Cart') ? JSON.parse(localStorage?.getItem('Cart') as string) : [] as Item[];
      }
    }
    
    increaseCount() {
      this.quantity++;
    }
    decreaseCount(){
      if(this.quantity>=1)this.quantity--;
    }
    
  
    addToCart() : void{
      this._customerService.currentUser.subscribe(user => {
        this.currentuser = user;
      });
      if(!this.currentuser){
        return;
      }
      const newCartItem : CartItem = {
        customerId : this.currentuser?.id || '',
        itemId: this.currentItem?.id || '',
        quantity : this.quantity,
        addedAt : new Date(),
      }
      console.log(newCartItem);
      this._cartService.addCartItem(newCartItem).subscribe({
        next: () => {
           this._toastr.success(
            "ITEM ADDED TO CART" , "CONTINE SHOPPING" ,{
              timeOut:1000
            }
           )
        },
        error: (err) => {
            console.error('Error adding item to cart:', err);
        },
    });
    }

}

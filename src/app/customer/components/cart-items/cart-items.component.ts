import { Component, EventEmitter, Input ,Output } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent {
  @Input() item!: any;
  @Output() changedQuantity: EventEmitter<any> = new EventEmitter<any>();

  userData = localStorage.getItem('currentUser');
  customer = this.userData ? JSON.parse(this.userData) : null;
  constructor(private _cartService : CartService){}

  decreaseQuantity(item: any) {
    if (item.quantity >= 1) item.quantity--;
    this.changedQuantity.emit(item);
  }
  increaseQuantity(item: any) {
    item.quantity++;
    this.changedQuantity.emit(item);
  }


  removeItem(item : any){
    item.quantity=0;
    this.changedQuantity.emit(item);

  }

}

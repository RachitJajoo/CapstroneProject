import { Component, EventEmitter, Input ,Output } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent {
  @Input() item!: any;
  @Output() changedQuantity: EventEmitter<any> = new EventEmitter<any>();

  decreaseQuantity(item: any) {
    if (item.quantity >= 1) item.quantity--;
    this.changedQuantity.emit(item);
  }
  increaseQuantity(item: any) {
    item.quantity++;
    this.changedQuantity.emit(item);
  }
}

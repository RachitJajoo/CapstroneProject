import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import { CartItem } from 'src/app/core/models/cartItem.model';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  total_price = 0;
  cartItems: CartItem[] = [];
  customer: any;

  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _toastr: ToastrService,
    private _orderService: OrderService
  ) {
    this.customer = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngOnInit(): void {
    this._cartService.getCartItems(this.customer.id).subscribe({
      next: (response) => {
        this.cartItems = response;
        this.total_price = response.reduce((total: number, cartItem: { item: { original_price: number; }; quantity: number; }) => {
          return total + (cartItem.item.original_price * cartItem.quantity);
        }, 0);
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
      }
    });
  }

  onSubmit(): void {
    this._orderService.addOrder(this.cartItems).subscribe(() => {
      this._cartService.clearCart(this.customer.id).subscribe(() => {
        this._toastr.success("Thank you for choosing Flipkart", "Visit Again", {
          timeOut: 2000
        });
        this._router.navigate(["home"]);
      });
    });
  }
}
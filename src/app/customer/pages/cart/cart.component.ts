import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/core/models/customer.model';
import { Item } from 'src/app/core/models/item.model';
import { CartService } from 'src/app/core/services/cart.service';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  constructor(private _cartService: CartService, private _itemService: ItemService) { }

  cartItems: any[] = [];


  userData = localStorage.getItem('currentUser');
  customer = this.userData ? JSON.parse(this.userData) : null;

  total_price: number = 0;



  handleChangeQuantity(item: any) {

    //consle.log("Handle change triggered");

    const currentCustomerId = this.customer?.id; // Get the current customer's ID

    if (!currentCustomerId) {
      console.error('No current customer ID available');
      return;
    }


    // Update the quantity in the backend
    this._cartService.updateCartItem(currentCustomerId, item.id, item.quantity).subscribe({
      next: () => {
        //consle.log(`Quantity of item with ID ${item.id} updated to ${item.quantity} for customer ${currentCustomerId}.`);
        this.updateTotalPrice();
        if (item.quantity === 0) {
          // Remove the item from the cartItems array
          this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
          //consle.log(`Item with ID ${item.id} removed from the cart.`);
        }
      },
      error: (error) => {
        console.error('Error updating item quantity:', error);
      }
    });

  }

  // Helper method to update total price
  updateTotalPrice() {
    this.total_price = this.cartItems.reduce((sum, item) => sum + (item.original_price * item.quantity), 0);
  }



  ngOnInit() {
    this.loadCartItems();
  }


  loadCartItems() {
    
    this._cartService.getCartItems(this.customer.id).subscribe({
      next: (response) => {
        const cartResponse = response; 
        //consle.log("CART PAGE");
        //consle.log(cartResponse);
        
        
        if (!cartResponse || cartResponse.length === 0) return;

        this.cartItems = []; // Reset cart items array
        this.total_price = 0; // Reset total price

        cartResponse.forEach((cartItem: any) => {
          const item = cartItem.item; // Populated Item object
          //consle.log(item);
          
          const quantity = cartItem.quantity; // Assuming quantity is now directly in the CartItem model

          if (item) {
            // Add item to the cart with quantity
            const currItem = { ...item, quantity: quantity }; // Add quantity to item
            this.cartItems.push(currItem);

            // Update total price
            this.total_price += (item.original_price * quantity);
          }
        });

        //consle.log('Updated Cart Items:', this.cartItems);
        //consle.log('Total Price:', this.total_price);
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
      }
    });
  }
}
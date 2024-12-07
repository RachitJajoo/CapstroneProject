import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  currentCart = JSON.parse(localStorage.getItem('Cart') || '[]');
  sum : number = 0;

  handleChangeQuantity(item : any){
    if (item.quantity === 0) {
      this.currentCart = this.currentCart.filter((cartItem: any) => cartItem !== item);
    }
    this.sum = 0
    for(let item of this.currentCart){
      this.sum +=  (item.original_price * item.quantity) * (1 - (item.discount / 100)); 
    }
    localStorage.setItem('Cart', JSON.stringify(this.currentCart));
  }


  ngOnInit(){
    console.log(this.currentCart);
    for(let item of this.currentCart){
      this.sum +=  (item.original_price * item.quantity) * (1 - (item.discount / 100)); 
    }
  }

  

  checkOut(){
    localStorage.removeItem('Cart');
    this.currentCart = JSON.parse(localStorage.getItem('Cart') || '[]');
  }
}

import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { customerService } from 'src/app/core/services/customer.service';
import { OrderService } from 'src/app/core/services/order.service';

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


  constructor(private _customerService : customerService , private _orderService: OrderService){}

  
  ngOnInit(): void {
    this.getCurrentUser();
    this.loadOrderHistory();
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
          console.log(res);
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
}

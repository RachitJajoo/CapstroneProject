import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { customerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  currentUser: any = null; // Holds user data
  orderHistory: any[] = []; // Array to hold order history

  constructor(private _customerService : customerService){}

  ngOnInit(): void {
    this.getCurrentUser();
    this.loadOrderHistory();
  }

  // Fetch current user from localStorage
  getCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    } else {
      console.error('No user found in localStorage!');
      // Redirect or handle unauthenticated user case here, e.g.,
      // this.router.navigate(['/login']);
    }
  }

  // Mock method to load order history (replace with actual service call)
  loadOrderHistory(): void {
    // Example data - Replace this with your service call
    this.orderHistory = [
      {
        id: 101,
        date: '2024-11-15',
        total: 5000,
      },
      {
        id: 102,
        date: '2024-11-22',
        total: 3000,
      },
    ];
  }

  // Mock method to log the user out
  logout(): void {
    this._customerService.logout();
  }
}

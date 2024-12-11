import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { Customer } from 'src/app/core/models/customer.model';
import { Item } from 'src/app/core/models/item.model';
import { Order } from 'src/app/core/models/order.model';
import { Vendor } from 'src/app/core/models/vendor.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.loadData();
  }
  categories: Category[] = [];
  customers: Customer[] = [];
  items: Item[] = [];
  orders: Order[] = [];
  vendors: Vendor[] = [];

  loadData() {
    this._adminService.getCategories().subscribe({
      next: (res) => (this.categories = res),
      // next :(res) =>//consle.log(res),
      error: (err) => console.error(err),
    });
    this._adminService.getCustomers().subscribe({
      next: (res) => (this.customers = res),
      error: (err) => console.error(err),
    });
    this._adminService.getItems().subscribe({
      next: (res) => (this.items = res),
      error: (err) => console.error(err),
    });
    this._adminService.getOrders().subscribe({
      next: (res) => (this.orders = res),
      error: (err) => console.error(err),
    });
    this._adminService.getVendors().subscribe({
      next: (res) => {
        this.vendors = res;
        // console.log(this.vendors);
 
      },
      error: (err) => console.error(err),
    });

  }


  isAddingCategory: boolean = false; // To track if a new category is being added
  newCategoryName: string = ''; // To hold the new category name

  addCategory() {
    this.isAddingCategory = true; // Show the new category input box
  }
  saveCategory() {
    const categoryName = this.newCategoryName.trim(); // Ensure no trailing/leading spaces
    if (categoryName) {
      this._adminService.addCategory(categoryName , '').subscribe({
        next: (res) => {
          //consle.log('Category added:', res);
          // Add the new category to the local list (assuming the backend responds with the created category)
          this.categories.push(res);
          this.isAddingCategory = false;
          this.newCategoryName = ''; // Clear the input field
        },   
        error: (err) => {
          console.error('Error saving category:', err);
        }
      });
    } else {
      console.error('Category name cannot be empty.');
    }
  }
  

  cancelAddCategory() {
    this.newCategoryName = ''; // Reset the input field
    this.isAddingCategory = false; // Hide the input box
  }


  approveVendor(id: string) {
    this._adminService.approveVendor(id , true).subscribe({
      next: (res) => {
      //consle.log(res);
      // Reload the page to reflect the new category
      window.location.reload();
    },
    error: (err) => {
      console.error('Error saving category:', err);
    }
  });
}
}

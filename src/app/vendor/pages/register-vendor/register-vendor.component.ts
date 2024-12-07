import { Component } from '@angular/core';

@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.scss']
})
export class RegisterVendorComponent {
  vendorData = {
    vendorName: '',
    storeName: '',
    email: '',
    phoneNumber: '',
  };
  error: string | null = null;
  
  onRegisterSubmit() {
    if (!this.vendorData.email || !this.vendorData.vendorName || !this.vendorData.storeName || !this.vendorData.phoneNumber) {
      this.error = 'All fields are required!';
      return;
    }
    console.log('Vendor Data Submitted:', this.vendorData);
    this.error = null;
    alert('Registration Successful!');
    // Add your API call logic here
  }
}

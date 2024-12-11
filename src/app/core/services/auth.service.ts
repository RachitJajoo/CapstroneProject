import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
   getCustomerHeaders(): { headers: { Authorization: string } } {
    const adminString = localStorage.getItem('currentUser');
    let token = '';
    if (adminString) {
      token = JSON.parse(adminString).jwtToken;
    }
    return {
      headers: {
        Authorization: `${token}`
      }
    };
  }
   getVendorHeaders(): { headers: { Authorization: string } } {
    const adminString = localStorage.getItem('currentVendor');
    let token = '';
    if (adminString) {
      token = JSON.parse(adminString).jwtToken;
    }
    return {
      headers: {
        Authorization: `${token}`
      }
    };
  }
   getAdminHeaders(): { headers: { Authorization: string } } {
    const adminString = localStorage.getItem('currentAdmin');
    let token = '';
    if (adminString) {
      token = JSON.parse(adminString).jwtToken;
    }
    return {
      headers: {
        Authorization: `${token}`
      }
    };
  }
}

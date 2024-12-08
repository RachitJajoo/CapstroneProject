import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = route.data['role'];  // role could be 'customer', 'vendor', 'admin'
    const routeId = route.paramMap.get('id'); // Get the 'id' from the route params
    
    // Check the localStorage for the current user, vendor, or admin
    const currentUser = localStorage.getItem('currentUser');
    const currentVendor = localStorage.getItem('currentVendor');
    const currentAdmin = localStorage.getItem('currentAdmin');

    let isAuthenticated = false;
    let isIdCorrect = false;

    if (userRole === 'customer' && currentUser) {
      const user = JSON.parse(currentUser);
      if (!routeId || user.id === routeId) {
        isAuthenticated = true;
        
      }
    } else if (userRole === 'vendor' && currentVendor) {
      const vendor = JSON.parse(currentVendor);
      if (!routeId || vendor.id === routeId) {
        isAuthenticated = true;
      }
    } else if (userRole === 'admin' && currentAdmin) {
      isAuthenticated = true;  // Admin routes don't require a specific ID
    }

    if (isAuthenticated) {
      return true;
    }

    // If not authenticated, show error toastr message and redirect
    this.toastr.error('You are not authorized to access this page. Please log in first.', 'Access Denied');
    
    // Redirect to the appropriate login page based on the role
    // if (userRole === 'customer') {
    //   this.router.navigate(['/login']);
    // } else if (userRole === 'vendor') {
    //   this.router.navigate(['/vendor/login']);
    // } else if (userRole === 'admin') {
    //   this.router.navigate(['/admin/login']);
    // }

    this.router.navigate(['home']);
    return false;
  }
}

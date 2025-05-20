import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  showVendorNavbar = false; // Flag to toggle between headers
  isAdminRoute = false;
  isBackendHealthy = true;
  private healthCheckSubscription: Subscription;

  constructor(
    private _router: Router,
    private http: HttpClient
  ) {
    // Start health check immediately
    this.checkBackendHealth();
    
    // Then check every 30 seconds
    this.healthCheckSubscription = interval(30000).subscribe(() => {
      this.checkBackendHealth();
    });
  }

  private checkBackendHealth() {
    this.http.get('https://ecommerce-app-backend-j51c.onrender.com/health', { 
      observe: 'response',
      responseType: 'text'  // Specify that we expect text response
    })
    .subscribe({
      next: (response) => {
        // console.log('Health check response:', response.status);
        this.isBackendHealthy = response.status === 200;
      },
      error: (error) => {
        console.error('Health check error:', error);
        this.isBackendHealthy = false;
      }
    });
  }

  ngOnInit(): void {
    this._router.events.subscribe(() => {
      // Check if the current route starts with '/vendor'
      this.showVendorNavbar = this._router.url.startsWith('/vendor');
    });
    this._router.events.subscribe(() => {
      // Check if the current route starts with '/vendor'
      this.isAdminRoute = this._router.url.startsWith('/admin');
    });
  }

  ngOnDestroy() {
    if (this.healthCheckSubscription) {
      this.healthCheckSubscription.unsubscribe();
    }
  }
}
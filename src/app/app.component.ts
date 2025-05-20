import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HealthCheckService } from './core/services/health-check.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  showVendorNavbar = false; // Flag to toggle between headers
  isAdminRoute = false;
  isBackendHealthy = true;
  private healthSubscription: Subscription;

  constructor(
    private _router: Router,
    private healthCheckService: HealthCheckService
  ) {
    this.healthSubscription = this.healthCheckService.getHealthStatus()
      .subscribe(status => {
        this.isBackendHealthy = status;
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
    if (this.healthSubscription) {
      this.healthSubscription.unsubscribe();
    }
  }
}
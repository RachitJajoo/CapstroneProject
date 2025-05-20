import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BackendStatusService } from './core/services/backend-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  showVendorNavbar = false; // Flag to toggle between headers
  isAdminRoute = false;
  isBackendAvailable = true;
  private statusSubscription: Subscription;

  constructor(
    private _router: Router,
    private backendStatusService: BackendStatusService
  ) {
    this.statusSubscription = this.backendStatusService.getBackendStatus()
      .subscribe(status => {
        this.isBackendAvailable = status;
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
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }
}

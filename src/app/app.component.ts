import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showVendorNavbar = false; // Flag to toggle between headers

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.events.subscribe(() => {
      // Check if the current route starts with '/vendor'
      this.showVendorNavbar = this._router.url.startsWith('/vendor');
    });
  }
}

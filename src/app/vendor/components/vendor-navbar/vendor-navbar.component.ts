import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/core/models/vendor.model';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-vendor-navbar',
  templateUrl: './vendor-navbar.component.html',
  styleUrls: ['./vendor-navbar.component.scss']
})
export class VendorNavbarComponent{
 
  constructor(private _vendorService : VendorService){}
  
  currentVendor!: Vendor | null;

  isLoggedIn: boolean = false;


  ngOnInit() {

    this._vendorService.currentVendor.subscribe(user => {
      this.currentVendor= user;
      if (this.currentVendor) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });
  }
}

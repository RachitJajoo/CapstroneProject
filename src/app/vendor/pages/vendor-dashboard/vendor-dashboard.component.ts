import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/models/order.model';
import { Vendor } from 'src/app/core/models/vendor.model';
import { VendorService } from 'src/app/core/services/vendor.service';


@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss'],
})
export class VendorDashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _vendorService: VendorService
  ) { }

 
  vendorId: string = '';
  activeSection: string = 'orders'; // Default section
  vendorInfo: Vendor | null = null;
  orders: Order[] = [];
  stats: any = null;

  ngOnInit(): void {
    this.vendorId = this.route.snapshot.paramMap.get('id') || '';
    this.loadVendorData();
    
  }

  loadVendorData(): void {
    this._vendorService.getVendorInfo(this.vendorId).subscribe((info) => {
      this.vendorInfo = info;
    });

    this._vendorService.getVendorOrders(this.vendorId).subscribe((orders) => {
      this.orders = orders;
    });

    // this._vendorService.getVendorStats(this.vendorId).subscribe((stats) => {
    //   this.stats = stats;
    // });
  }

  onUpdateDetails(): void {
    console.log('Updated Details:', this.vendorInfo);
    alert('Details updated successfully!');
    // Add API call to save updated vendor details
  }


  logout() : void {
    this._vendorService.logout();
  }

}

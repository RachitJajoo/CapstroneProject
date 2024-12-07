import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss'],
})
export class VendorDashboardComponent implements OnInit {
logout() {
throw new Error('Method not implemented.');
}
  
  vendorId: string = '';
  activeSection: string = 'orders'; // Default section
  vendorInfo: any = {};
  orders: any[] = [];
  stats: any = null;

  constructor(
    private route: ActivatedRoute,
    // private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.vendorId = this.route.snapshot.paramMap.get('id') || '';
    if (this.vendorId) {
      this.loadVendorData();
    }
  }

  loadVendorData(): void {
    // this.vendorService.getVendorInfo(this.vendorId).subscribe((info) => {
    //   this.vendorInfo = info;
    // });

    // this.vendorService.getVendorOrders(this.vendorId).subscribe((orders) => {
    //   this.orders = orders;
    // });

    // this.vendorService.getVendorStats(this.vendorId).subscribe((stats) => {
    //   this.stats = stats;
    // });
  }

  onUpdateDetails(): void {
    console.log('Updated Details:', this.vendorInfo);
    alert('Details updated successfully!');
    // Add API call to save updated vendor details
  }
}

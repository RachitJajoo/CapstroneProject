import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/core/models/item.model';
import { Order } from 'src/app/core/models/order.model';
import { Vendor } from 'src/app/core/models/vendor.model';
import { OrderService } from 'src/app/core/services/order.service';
import { VendorService } from 'src/app/core/services/vendor.service';


@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss'],
})
export class VendorDashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _vendorService: VendorService,
    private _orderService : OrderService
  ) { }


  vendorId: string = '';
  activeSection: string = 'orders'; // Default section
  vendorInfo: Vendor | null = null;
  products : Item[] = [];
  orders: Order[] = [];
  stats: any = null;

  ngOnInit(): void {
    this.vendorId = this.route.snapshot.paramMap.get('id') || '';
    this.loadVendorData();

  }

  loadVendorData(): void {
    this._vendorService.getVendorInfo(this.vendorId).subscribe({
      next: (info) => {
        this.vendorInfo = info;

      }
    });

    this._orderService.getOrderByVendorId(this.vendorId).subscribe((orders) => {
      
      this.orders = orders;
      for(let o of this.orders)console.log(o.customer);
      
    });

    this._vendorService.getVendorProducts(this.vendorId).subscribe({
      next:(res)=>{
        console.log("PRODCUTS" + res);
        this.products=res;
      }
        
    })

    // this._vendorService.getVendorStats(this.vendorId).subscribe((stats) => {
    //   this.stats = stats;
    // });
  }

  onUpdateDetails(): void {
    console.log('Updated Details:', this.vendorInfo);
    alert('Details updated successfully!');
    // Add API call to save updated vendor details
  }
  expandedOrderId: number | null = null;


  toggleDetails(orderId: number): void {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  logout(): void {
    this._vendorService.logout();
  }

}

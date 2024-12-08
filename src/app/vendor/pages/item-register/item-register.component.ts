import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/models/category.model';
import { ItemService } from 'src/app/core/services/item.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.scss']
})
export class ItemRegisterComponent implements OnInit {


  id: string = '';
  categories: Category[] = [];

  constructor(private _itemServices: ItemService, private _vendorService: VendorService, private _router: Router, private _toastr: ToastrService) { }



  ngOnInit(): void {
    this._vendorService.currentVendor.subscribe({
      next: (res) => {
        // console.log(res.id);
        this.id = res.id;
        // console.log(this.id);

      },
      error: (err) => {
        console.log(err);

      }
    });



    this._vendorService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        // console.log(this.categories);
      }, error: (err) => {
        console.log(err);
        this._router.navigate(['/vendor/home']);
      }
    })
  }




  productData = {
    vendorId: '',
    name: '',
    category: '',
    original_price: null,
    stockQuantity: null,
    description: '',
    img_url: '',
  };


  onRegisterProduct() {
    this.productData.vendorId = this.id;
    console.log('Product Data:', this.productData);


    this._itemServices.addItem(this.productData).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.success(
          "Item Registered ", "Thank you for using Flipkart",
          {
            timeOut: 1000,
          });
        this._router.navigate(['/vendor/home']);
      }
    });
  }







  onFileSelected(event: Event) {

  }
}

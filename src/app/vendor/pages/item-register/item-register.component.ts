import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/core/services/item.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.scss']
})
export class ItemRegisterComponent implements OnInit {


  id : string = '';

  constructor(private _itemServices : ItemService , private _vendorService : VendorService){}



  ngOnInit(): void {
    this._vendorService.currentVendor.subscribe({
      next:(res)=>{
        console.log(res.id);
        this.id = res.id;
        console.log(this.id);
        
      },
      error:()=>{

      }
    });
  }
  
  
 
 
  productData = {
    vendorId:'',
    name: '',
    category: '',
    original_price: null,
    stockQuantity: null,
    description: '',
    img_url: '',
  };

  categories = ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Other'];

  onRegisterProduct() {
    this.productData.vendorId = this.id;
    console.log('Product Data:', this.productData);

    
    this._itemServices.addItem(this.productData).subscribe({
      next : (res)=>{
        console.log(res);
      }
    })
  }

  
  
  
  
  
  
  onFileSelected(event: Event) {

  }
}

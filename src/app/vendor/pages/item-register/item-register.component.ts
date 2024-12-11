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
  isverified = false;
  constructor(private _itemServices: ItemService, private _vendorService: VendorService, private _router: Router, private _toastr: ToastrService) { }



  ngOnInit(): void {
    this._vendorService.currentVendor.subscribe({
      next: (res) => {
        // //consle.log(res.id);
        this.id = res.id;
        this.isverified = res.active;
        // //consle.log(this.id);

      },
      error: (err) => {
        //consle.log(err);

      }
    });

    this._vendorService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
        // //consle.log(this.categories);
      }, error: (err) => {
        //consle.log(err);
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


  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onRegisterProduct() {

    if(!this.isverified){
      this._toastr.error(
        "Admin has not approved your profile yet ",
        "Cannot upload items"
      )
    }

    // Validate if the file is selected
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    // Prepare FormData for the image
    const formData = new FormData();
    formData.append('image', this.selectedFile);

    // Upload the image and chain the addItem call
    this._itemServices.addImage(formData).subscribe({
      next: (res) => {
        //consle.log('Image Upload Response:', res);

        // Set the image URL in productData
        this.productData.img_url = res.url;

        // Set vendorId and other details
        this.productData.vendorId = this.id;
        //consle.log('Final Product Data:', this.productData);

        // Call the addItem API
        this._itemServices.addItem(this.productData).subscribe({
          next: (res) => {
            //consle.log('Item Registration Response:', res);
            this._toastr.success(
              'Item Registered',
              'Thank you for using Flipkart',
              { timeOut: 1000 }
            );
            this._router.navigate(['/vendor/home']);
          },
          error: (err) => {
            //consle.log('Error during item registration:', err);
          },
        });
      },
      error: (err) => {
        //consle.log('Error during image upload:', err);
      },
    });
  }
}

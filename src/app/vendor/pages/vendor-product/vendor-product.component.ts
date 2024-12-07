import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.scss']
})
export class VendorProductComponent {
  product = {
    name: '',
    price: null,
    description: '',
    stock: null,
    imageUrl: ''
  };

  // constructor(private productService: ProductService) {}

  onSubmit() {
    // this.productService.addProduct(this.product).subscribe(
    //   (response) => {
    //     console.log('Product added successfully', response);
    //     // Handle success (e.g., redirect or display a success message)
    //   },
    //   (error) => {
    //     console.error('Error adding product', error);
    //     // Handle error (e.g., display an error message)
    //   }
    // );
  }
}

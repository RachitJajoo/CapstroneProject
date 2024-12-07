import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/core/models/item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit{
  currentItem: Item | null = null;
  id: string | null = null;
  route = inject(ActivatedRoute);
  totalPrice: number = 0;
  cart: any[] = [];
  countInput : number = 0;
  AllItems: Item[] = [
    {
      id: 101,
      name: 'Laptop',
      description: 'A powerful laptop for all your needs',
      price: 799,
      stockQuantity: 50,
      category: 'Electronics',
      imageUrl: 'https://example.com/laptop.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 12,
    },
    {
      id: 102,
      name: 'Smartphone',
      description: 'Latest model with advanced features',
      price: 599,
      stockQuantity: 75,
      category: 'Electronics',
      imageUrl: 'https://example.com/smartphone.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 15,
    },
    {
      id: 103,
      name: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones',
      price: 199,
      stockQuantity: 100,
      category: 'Audio',
      imageUrl: 'https://example.com/headphones.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 7,
    },
    {
      id: 104,
      name: 'Coffee Maker',
      description: 'Programmable 12-cup coffee machine',
      price: 89,
      stockQuantity: 60,
      category: 'Kitchen Appliances',
      imageUrl: 'https://example.com/coffeemaker.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 23,
    },
    {
      id: 105,
      name: 'Smart Watch',
      description: 'Fitness tracker with heart rate monitor',
      price: 129,
      stockQuantity: 90,
      category: 'Wearables',
      imageUrl: 'https://example.com/smartwatch.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 18,
    },
    {
      id: 106,
      name: 'Bluetooth Speaker',
      description: 'Portable waterproof bluetooth speaker',
      price: 79,
      stockQuantity: 120,
      category: 'Audio',
      imageUrl: 'https://example.com/speaker.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 9,
    },
    {
      id: 107,
      name: 'Digital Camera',
      description: 'High-resolution mirrorless camera',
      price: 899,
      stockQuantity: 40,
      category: 'Electronics',
      imageUrl: 'https://example.com/camera.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 14,
    },
    {
      id: 108,
      name: 'Blender',
      description: 'High-power smoothie blender',
      price: 129,
      stockQuantity: 55,
      category: 'Kitchen Appliances',
      imageUrl: 'https://example.com/blender.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 26,
    },
    {
      id: 109,
      name: 'Tablet',
      description: 'Lightweight tablet with HD display',
      price: 299,
      stockQuantity: 65,
      category: 'Electronics',
      imageUrl: 'https://example.com/tablet.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 11,
    },
    {
      id: 110,
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with RGB lighting',
      price: 59,
      stockQuantity: 80,
      category: 'Computer Accessories',
      imageUrl: 'https://example.com/gaming-mouse.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 6,
    },
    {
      id: 111,
      name: 'Air Purifier',
      description: 'HEPA filter air purifier for large rooms',
      price: 249,
      stockQuantity: 45,
      category: 'Home Appliances',
      imageUrl: 'https://example.com/air-purifier.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 20,
    },
    {
      id: 112,
      name: 'Wireless Charger',
      description: 'Fast charging pad for multiple devices',
      price: 39,
      stockQuantity: 110,
      category: 'Electronics Accessories',
      imageUrl: 'https://example.com/wireless-charger.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 16,
    },
    {
      id: 113,
      name: 'Stand Mixer',
      description: 'Professional-grade kitchen stand mixer',
      price: 349,
      stockQuantity: 30,
      category: 'Kitchen Appliances',
      imageUrl: 'https://example.com/stand-mixer.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 25,
    },
    {
      id: 114,
      name: 'External SSD',
      description: 'Portable 1TB solid-state drive',
      price: 149,
      stockQuantity: 70,
      category: 'Computer Accessories',
      imageUrl: 'https://example.com/external-ssd.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 8,
    },
    {
      id: 115,
      name: 'Robot Vacuum',
      description: 'Smart robotic vacuum with app control',
      price: 279,
      stockQuantity: 50,
      category: 'Home Appliances',
      imageUrl: 'https://example.com/robot-vacuum.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 22,
    },
    {
      id: 116,
      name: 'Fitness Tracker',
      description: 'Slim fitness band with sleep monitoring',
      price: 79,
      stockQuantity: 95,
      category: 'Wearables',
      imageUrl: 'https://example.com/fitness-tracker.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 17,
    },
    {
      id: 117,
      name: 'Noise-Cancelling Earbuds',
      description: 'True wireless earbuds with active noise cancellation',
      price: 199,
      stockQuantity: 85,
      category: 'Audio',
      imageUrl: 'https://example.com/earbuds.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 10,
    },
    {
      id: 118,
      name: 'Smart Home Hub',
      description: 'Central control for smart home devices',
      price: 129,
      stockQuantity: 60,
      category: 'Smart Home',
      imageUrl: 'https://example.com/smart-hub.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 19,
    },
    {
      id: 119,
      name: 'Electric Kettle',
      description: 'Quick-boil temperature control kettle',
      price: 69,
      stockQuantity: 100,
      category: 'Kitchen Appliances',
      imageUrl: 'https://example.com/electric-kettle.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 24,
    },
    {
      id: 120,
      name: 'Gaming Headset',
      description: 'Surround sound gaming headphones',
      price: 129,
      stockQuantity: 70,
      category: 'Audio',
      imageUrl: 'https://example.com/gaming-headset.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 5,
    },
    {
      id: 121,
      name: 'Smart Thermostat',
      description: 'Wi-Fi enabled learning thermostat',
      price: 249,
      stockQuantity: 55,
      category: 'Smart Home',
      imageUrl: 'https://example.com/thermostat.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 13,
    },
    {
      id: 122,
      name: 'Portable Power Station',
      description: 'High-capacity portable battery pack',
      price: 299,
      stockQuantity: 40,
      category: 'Electronics Accessories',
      imageUrl: 'https://example.com/power-station.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 21,
    },
    {
      id: 123,
      name: 'True Wireless Earphones',
      description: 'Compact bluetooth earphones with charging case',
      price: 89,
      stockQuantity: 105,
      category: 'Audio',
      imageUrl: 'https://example.com/wireless-earphones.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 7,
    },
    {
      id: 124,
      name: 'Mechanical Keyboard',
      description: 'Customizable RGB mechanical keyboard',
      price: 149,
      stockQuantity: 65,
      category: 'Computer Accessories',
      imageUrl: 'https://example.com/mechanical-keyboard.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      vendorId: 16,
    },
  ];


  // constructor(private _itemService : ItemService ,private toastr: ToastrService){}/
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id');  // Get the dynamic id from the URL
        // console.log('Electronics ID:', this.id);  // Log the id to the console
        // console.log(this._itemService.AllItems);
        // this._itemService.getData().subscribe({
        //   next: (res) => {
        //     this.currentItem = res.find(item => item.id === this.id) || null;
        //   },
        //   error: (e) => {
        //     console.log(e);
        //   },
        // });
        this.currentItem = this.AllItems.find(item => item.id.toString() == this.id) || null;
        console.log(this.currentItem);
        
      });

  
      if (typeof window !== 'undefined') {
        this.cart = localStorage.getItem('Cart') ? JSON.parse(localStorage?.getItem('Cart') as string) : [] as Item[];
      }
    }
    
    increaseCount() {
      this.countInput++;
    }
    decreaseCount(){
      if(this.countInput>=1)this.countInput--;
    }
    
    
    addToCart(): void {
      const existingCartItem = this.cart.find(cartItem => cartItem.name === this.currentItem?.name);
      if (existingCartItem) {
        existingCartItem.quantity += this.countInput
      } else {
        const newCartItem = { ...this.currentItem , quantity: this.countInput };
        this.cart.push(newCartItem);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('Cart', JSON.stringify(this.cart));
      }
      console.log('Cart:', this.cart); // For debugging
      // this.toastr.success(
      //   "ITEM ADDED", "Continue Shopping", {
      //       timeOut:1000 , positionClass : "toast-top-right",
      //   });
    }   

}

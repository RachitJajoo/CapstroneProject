import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/core/models/item.model';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  AllItems : Item[] = [];

  constructor(private _itemservice: ItemService) { }

  ngOnInit(): void {
    this._itemservice.getAllItems().subscribe({
      next: (data) => {
        // console.log(data);
        // console.log('Items fetched successfully:' );
        this.AllItems = data; 
      }
    })
  }
  categories = [
    {
      name: 'Grocery',
      image: 'https://rukminim1.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100'
    },
    {
      name: 'Mobiles',
      image: 'https://rukminim1.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100'
    },
    {
      name: 'Fashion',
      image: 'https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png?q=100'
    },
    {
      name: 'Electronics',
      image: 'https://rukminim1.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100'
    },
    {
      name: 'Furniture',
      image: 'https://rukminim1.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100'
    },
    {
      name: 'Flight Booking',
      image: 'https://rukminim1.flixcart.com/flap/64/64/image/71050627a56b4693.png?q=100'
    },
    {
      name: 'Appliances',
      image: 'https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100'
    },
    {
      name: 'Toys',
      image: 'https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100'
    }
  ];

}

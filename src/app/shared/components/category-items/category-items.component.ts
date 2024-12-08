import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/models/item.model';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
})
export class CategoryItemsComponent  {
addToWishlist(_t4: Item) {
throw new Error('Method not implemented.');
}
  @Input() item! : Item[] ;

  // ngOnInit(): void {}
}

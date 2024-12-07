import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/models/item.model';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
})
export class CategoryItemsComponent  {
  @Input() item! : Item[] ;

  // ngOnInit(): void {}
}

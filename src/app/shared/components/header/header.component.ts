import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/core/models/item.model';
import { Customer } from 'src/app/core/models/customer.model';
import { customerService } from 'src/app/core/services/customer.service';
import { ItemService } from 'src/app/core/services/item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private _customerService: customerService, 
    private _itemService: ItemService, 
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  allItems: Item[] = [];
  filteredItems: Item[] = [];
  currentuser!: Customer | null;

  isLoggedIn: boolean = false;
  focus: boolean = false;
  filterText: string = '';

  ngOnInit() {
    this._customerService.currentUser.subscribe(user => {
      this.currentuser = user;
      if (this.currentuser) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });

    this._itemService.getAllItems().subscribe({
      next: (data) => {
        this.allItems = data;
      }
    });
  }

  onFilterTextChange(value: string) {
    if (value.trim() === '') {
      this.filteredItems = [];
      return;
    }
    this.filteredItems = this.allItems.filter((x) => {
      return x.name.toLowerCase().includes(value.toLowerCase())
    });
  }

  onInputFocus() {
    this.focus = true;
  }

  onInputBlur() {
    // Delay hiding the dropdown to allow click events to complete
    setTimeout(() => {
      this.focus = false;
    }, 200);
  }

  navigateToItem(itemId: string) {
    this._router.navigate(['/item', itemId]);
    this.filterText = '';
    this.filteredItems = [];
    this.focus = false;
  }
}

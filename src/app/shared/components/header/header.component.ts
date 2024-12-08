import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  constructor(private _customerService: customerService, private _itemService: ItemService, private _toastrService: ToastrService) { }


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
        // //consle.log(data);
        this.allItems = data;
        // this.Allitems= res; 
        //consle.log('Items fetched successfully:');
      }
    })

  }

  onFilterTextChange(value: string) {
    if (value.trim() === '') {
      this.filteredItems = [];
      // //consle.log(this.filteredItems);
      return;
    }
    this.filteredItems = this.allItems.filter((x) => {
      return x.name.toLowerCase().includes(value.toLowerCase())
    });
    //consle.log(this.filteredItems);
  }


  onInputFocus() {
    this.focus = true;
  }

  onInputBlur() {
    setTimeout(() => {
      this.focus = false;
    }, 500);
  }

}

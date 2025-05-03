import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/core/models/item.model';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
})
export class CategoryItemsComponent implements OnChanges {
  @Input() item!: Item[];
  
  page = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15, 20, 25];
  totalItems = 0;
  Math = Math; // Make Math available in template

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item']) {
      this.totalItems = this.item.length;
      // Reset to first page when items change
      this.page = 1;
    }
  }

  get paginatedItems() {
    if (!this.item) return [];
    const start = (this.page - 1) * this.pageSize;
    return this.item.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }

  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.page = 1; // Reset to first page when changing page size
  }

  shouldShowPageButton(pageNumber: number): boolean {
    // Always show first and last pages
    if (pageNumber === 1 || pageNumber === this.totalPages) return true;
    
    // Show current page and adjacent pages
    const range = 2;
    return Math.abs(pageNumber - this.page) <= range;
  }

  shouldShowEllipsis(pageNumber: number): boolean {
    // Show ellipsis between non-consecutive page numbers
    return pageNumber === 2 && this.page > 4 ||
           pageNumber === this.totalPages - 1 && this.page < this.totalPages - 3;
  }

  addToWishlist(product: Item) {
    // TODO: Implement wishlist functionality
    console.log('Adding to wishlist:', product);
  }
}

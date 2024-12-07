import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-cell',
  templateUrl: './carousel-cell.component.html',
  styleUrls: ['./carousel-cell.component.scss']
})
export class CarouselCellComponent {
  carouselUrls=[
    'https://fastly.picsum.photos/id/80/1000/170.jpg?hmac=x67wUbp13ulsrH5QHUsAJhIWBx0GCs01C0yMSSYhnjE',
    'https://fastly.picsum.photos/id/528/1000/170.jpg?hmac=3rgo4NPeUf27tysQtyVEp1-ciSlUUmK2TSDUU2vt5ko',
    'https://fastly.picsum.photos/id/344/1000/170.jpg?hmac=B89oTqBycQmHopSr2xufBpwpKWKuxPfNZtIj0DLuabA'
  ]
}

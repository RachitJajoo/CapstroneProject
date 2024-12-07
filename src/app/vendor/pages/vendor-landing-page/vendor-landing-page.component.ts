import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-landing-page',
  templateUrl: './vendor-landing-page.component.html',
  styleUrls: ['./vendor-landing-page.component.scss']
})
export class VendorLandingPageComponent {
  currentIndex = 0; // Current slide index
  totalSlides = 3; // Total number of slides

  // Getter for the transform style
  get transformStyle(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  // Navigate to the previous slide
  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
  }

  // Navigate to the next slide
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
  }
}

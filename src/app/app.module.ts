import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './shared/pages/home/home.component';
import { CarouselCellComponent } from './shared/components/carousel-cell/carousel-cell.component';
import { CategoryItemsComponent } from './shared/components/category-items/category-items.component';
import { LoginComponent } from './customer/pages/login/login.component';
import { CartComponent } from './customer/pages/cart/cart.component';
import { CartItemsComponent } from './customer/components/cart-items/cart-items.component';
import { ItemDetailsComponent } from './customer/pages/item-details/item-details.component';
import { ProfilePageComponent } from './customer/pages/profile-page/profile-page.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { VendorLandingPageComponent } from './vendor/pages/vendor-landing-page/vendor-landing-page.component';
import { VendorNavbarComponent } from './vendor/components/vendor-navbar/vendor-navbar.component';
import { VendorDashboardComponent } from './vendor/pages/vendor-dashboard/vendor-dashboard.component';
import { LoginVendorComponent } from './vendor/pages/login-vendor/login-vendor.component';
import { ItemRegisterComponent } from './vendor/pages/item-register/item-register.component';
import { RegisterAdminComponent } from './admin/pages/register-admin/register-admin.component';
import { AdminHomeComponent } from './admin/pages/admin-home/admin-home.component';
import { StarRatingModule } from 'angular-star-rating';
import { PaymentGatewayComponent } from './customer/pages/payment-gateway/payment-gateway.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CarouselCellComponent,
    CategoryItemsComponent,
    LoginComponent,
    CartComponent,
    CartItemsComponent,
    ItemDetailsComponent,
    ProfilePageComponent,
    VendorLandingPageComponent,
    VendorNavbarComponent,
    VendorDashboardComponent,
    LoginVendorComponent,
    ItemRegisterComponent,
    RegisterAdminComponent,
    AdminHomeComponent,
    PaymentGatewayComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    StarRatingModule.forRoot(),
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



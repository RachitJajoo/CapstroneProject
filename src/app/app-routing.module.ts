import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { LoginComponent } from './customer/pages/login/login.component';
import { CartComponent } from './customer/pages/cart/cart.component';
import { ItemDetailsComponent } from './customer/pages/item-details/item-details.component';
import { ProfilePageComponent } from './customer/pages/profile-page/profile-page.component';
import { VendorLandingPageComponent } from './vendor/pages/vendor-landing-page/vendor-landing-page.component';
import { RegisterVendorComponent } from './vendor/pages/register-vendor/register-vendor.component';
import { VendorDashboardComponent } from './vendor/pages/vendor-dashboard/vendor-dashboard.component';
import { VendorProductComponent } from './vendor/pages/vendor-product/vendor-product.component';

const routes: Routes = [
  // Home and Public Routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'item/:id', component: ItemDetailsComponent },

  // User Profile Routes
  { path: 'user/:id', component: ProfilePageComponent },

  // Vendor Routes
  { path: 'vendor', children: [
    { path: 'home', component: VendorLandingPageComponent },
    { path: 'register', component: RegisterVendorComponent },
    { path: 'dashboard/:id', component: VendorDashboardComponent },
    { path: 'add/product', component: VendorProductComponent }
  ]},

  // Wildcard Route
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

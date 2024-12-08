import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { LoginComponent } from './customer/pages/login/login.component';
import { CartComponent } from './customer/pages/cart/cart.component';
import { ItemDetailsComponent } from './customer/pages/item-details/item-details.component';
import { ProfilePageComponent } from './customer/pages/profile-page/profile-page.component';
import { VendorLandingPageComponent } from './vendor/pages/vendor-landing-page/vendor-landing-page.component';

import { VendorDashboardComponent } from './vendor/pages/vendor-dashboard/vendor-dashboard.component';
import { VendorProductComponent } from './vendor/pages/vendor-product/vendor-product.component';
import { LoginVendorComponent } from './vendor/pages/login-vendor/login-vendor.component';
import { ItemRegisterComponent } from './vendor/pages/item-register/item-register.component';
import { RegisterAdminComponent } from './admin/pages/register-admin/register-admin.component';
import { AdminHomeComponent } from './admin/pages/admin-home/admin-home.component';

const routes: Routes = [
  // Home and Public Routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'item/:id', component: ItemDetailsComponent },
  { path: 'user/:id', component: ProfilePageComponent },

  { path: 'vendor', children: [
    { path: 'home', component: VendorLandingPageComponent },
    { path: 'login', component: LoginVendorComponent },
    {path :'additems' , component : ItemRegisterComponent},
    { path: 'dashboard/:id', component: VendorDashboardComponent },
    { path: 'add/product', component: VendorProductComponent },
  ]},

  {path : 'admin' , children:[
    {path : 'home' , component: AdminHomeComponent},
    {path:'login' , component:RegisterAdminComponent},
  ]},
  // Wildcard Route
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

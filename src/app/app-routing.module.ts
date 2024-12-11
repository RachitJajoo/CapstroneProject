import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { LoginComponent } from './customer/pages/login/login.component';
import { CartComponent } from './customer/pages/cart/cart.component';
import { ItemDetailsComponent } from './customer/pages/item-details/item-details.component';
import { ProfilePageComponent } from './customer/pages/profile-page/profile-page.component';
import { VendorLandingPageComponent } from './vendor/pages/vendor-landing-page/vendor-landing-page.component';
import { VendorDashboardComponent } from './vendor/pages/vendor-dashboard/vendor-dashboard.component';
import { LoginVendorComponent } from './vendor/pages/login-vendor/login-vendor.component';
import { ItemRegisterComponent } from './vendor/pages/item-register/item-register.component';
import { RegisterAdminComponent } from './admin/pages/register-admin/register-admin.component';
import { AdminHomeComponent } from './admin/pages/admin-home/admin-home.component';

import { AuthGuard } from '../app/core/guards/auth.guard';
import { PaymentGatewayComponent } from './customer/pages/payment-gateway/payment-gateway.component';

const routes: Routes = [
  // Public Routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  
  // Customer Routes (with AuthGuard applied)
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: { role: 'customer' } },
  { path: 'payment', component: PaymentGatewayComponent, canActivate: [AuthGuard], data: { role: 'customer' } },
  { path: 'user/:id', component: ProfilePageComponent, canActivate: [AuthGuard], data: { role: 'customer' } },
  { path: 'item/:id', component: ItemDetailsComponent },

  // Vendor Routes (with AuthGuard applied)
  { path: 'vendor', children: [
    { path: 'home', component: VendorLandingPageComponent },
    { path: 'login', component: LoginVendorComponent },
    { path: 'additems', component: ItemRegisterComponent, canActivate: [AuthGuard], data: { role: 'vendor' }},
    { path: 'dashboard/:id', component: VendorDashboardComponent, canActivate: [AuthGuard], data: { role: 'vendor' }},
  ]},

  // Admin Routes
  { path: 'admin', children: [
    { path: 'home', component: AdminHomeComponent, canActivate: [AuthGuard], data: { role: 'admin' }},
    { path: 'login', component: RegisterAdminComponent },
  ]},

  // Wildcard Route
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

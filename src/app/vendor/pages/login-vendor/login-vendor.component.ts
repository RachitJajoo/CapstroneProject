import { Component } from '@angular/core';
import { VendorService } from 'src/app/core/services/vendor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-vendor',
  templateUrl: './login-vendor.component.html',
  styleUrls: ['./login-vendor.component.scss']
})
export class LoginVendorComponent {

  constructor(
    private _vendorService: VendorService,
    private _toastrService: ToastrService,
  ) { }



  isRegisterMode: boolean = false;

  registerData = {
    email: '',
    username: '',
    password:'',
    storeName: '',
    phoneNumber: '',
  };

  loginData = {
    email: '',
    password: '',
  };
  error: string | null = null;

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onRegisterSubmit() {
    console.log('Register Data:', this.registerData);
    // Handle registration logic
    this._vendorService.register(this.registerData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.error = '';
          this._vendorService.storeVendor(res.vendor);
          this._toastrService.success(
            "Logged In", `Welcome ${res.vendor.username}`, {
            timeOut: 1000, positionClass: "toast-top-right",
          });
        }
        else {
          this.error = res.message;
        }
      },
      error: (err) => {
        console.log(err);
        this.error = err;
      }
    });
  }


    onLoginSubmit() {
      this._vendorService.login(this.loginData.email, this.loginData.password).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            this.error = '';
            this._vendorService.storeVendor(res.vendor);
            this._toastrService.success(
              "Logged In", `Welcome ${res.vendor.username}`, {
              timeOut: 1000, positionClass: "toast-top-right",
            });
          }
          else {
            this.error = res.message;
          }
        },
        error: (err) => {
          console.log(err);
          this.error = err;
        }
      });
    }
  }

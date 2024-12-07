import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { customerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLogin: boolean = true; 

  error ='';

  registerData = {
    email: '',
    userName: '',
    storeName: '',
    phoneNumber: '',
    password:'',
  };

  loginData = {
    email: '',
    password: '', 
  };

  constructor(private _customerService: customerService , private _toastrService : ToastrService) {}

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.error = ''; 
  }

  onLoginSubmit() {

    this._customerService.login(this.loginData.email , this.loginData.password).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.success){
          this.error='';
          this._customerService.storeUser(res.user);
          this._toastrService.success(
            "Logged In" , `Welcome ${res.user.username}`, {
                timeOut:1000 , positionClass : "toast-top-right",
            });
        }
        else{
          this.error = res.message; 
        }
      },
      error:(err)=>{
        console.log(err);
        this.error = err;
      }
    })
      
  }

  onRegisterSubmit() {
    // if (this.email && this.username && this.password) {
    //   this._customerService.register(this.email, this.username, this.password).subscribe({
    //     next:(response) => {
    //       if (response.success) {
    //         this.error = '';
    //         this.toggleForm();
    //       } else {
    //         this.error = response.message;
    //       }
    //     },
    //     error: (err) => {
    //       this.error = 'An error occurred during registration.';
    //     }
    //   });
    // } else {
    //   this.error = 'All fields are required!';
    // }
  }
}

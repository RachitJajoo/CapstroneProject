import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLogin: boolean = true; 
  email: string = '';
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private _authService: AuthService) {}

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.error = ''; 
  }

  onLoginSubmit() {
    console.log(this.email);
    console.log(this.password);
    console.log(this.username);
    
    this._authService.login(this.email , this.password).subscribe({
      next:(res)=>{
        if(res.success){
          this.error='';
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
    //   this._authService.register(this.email, this.username, this.password).subscribe({
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

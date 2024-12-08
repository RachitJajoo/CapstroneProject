import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/core/models/admin.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent {
 
  constructor(private _adminService : AdminService , private _router : Router){}
  
  // Login form model

    email:string = '';
    password:string = ''
  // Handle Login Submission
  handleLoginSubmit(): void {
    
    this._adminService.login(this.email , this.password).subscribe({
      next:(res)=>{
        //consle.log(res);
        localStorage.setItem('currentAdmin', JSON.stringify(res));
        this._router.navigate(['/admin/home']);

      },
      error:(err)=>{
        //consle.log(err);
        
      }
    })
  }
}
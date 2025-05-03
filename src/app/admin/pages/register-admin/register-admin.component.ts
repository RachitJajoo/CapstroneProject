import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {

  constructor(private _adminService: AdminService, private _router: Router) { }


  email: string = '';
  password: string = ''

  ngOnInit(): void {
    if(localStorage.getItem('currentAdmin')){
      this._router.navigate(['admin/home']);
    }
  }



  handleLoginSubmit(): void {

    this._adminService.login(this.email, this.password).subscribe({
      next: (res) => {
        //consle.log(res);
        localStorage.setItem('currentAdmin', JSON.stringify(res));
        this._router.navigate(['/admin/home']);

      },
      error: (err) => {
        //consle.log(err);

      }
    })
  }
}
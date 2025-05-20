import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient, private _authservice: AuthService) { }

  baseUrl: String = "http://localhost:8080/api/admins"

  addCategory(name: string, parentId: string): Observable<any> {
    return this._http.post(`${this.baseUrl}/category`, { name, parentId }, this._authservice.getAdminHeaders());
  }

  getCustomers(): Observable<any> {
    return this._http.get(`${this.baseUrl}/customers`, this._authservice.getAdminHeaders());
  }

  getItems(): Observable<any> {
    return this._http.get(`${this.baseUrl}/items`, this._authservice.getAdminHeaders());
  }

  getOrders(): Observable<any> {
    return this._http.get(`${this.baseUrl}/orders`, this._authservice.getAdminHeaders());
  }

  getCategories(): Observable<any> {
    return this._http.get(`${this.baseUrl}/categories`, this._authservice.getAdminHeaders());
  }

  getVendors(): Observable<any> {
    return this._http.get(`${this.baseUrl}/vendors`, this._authservice.getAdminHeaders());
  }

  approveVendor(id: string, approvalStatus: boolean): Observable<any> {
    return this._http.put<Admin>(`${this.baseUrl}/vendor/${id}`, { isActive: approvalStatus }, this._authservice.getAdminHeaders());
  }

  login(email: string, password: string): Observable<any> {
    return this._http.post<Admin>(`${this.baseUrl}/login`, { email, password });
  }

}

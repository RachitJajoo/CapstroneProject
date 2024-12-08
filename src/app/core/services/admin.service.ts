import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  baseUrl: String = "http://localhost:8080/api/admins"

  private getHeaders(): { headers: { Authorization: string } } {
    const adminString = localStorage.getItem('currentAdmin');
    let token = '';
    if (adminString) {
      token = JSON.parse(adminString).jwtToken;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  addCategory(name: string, parentId: string): Observable<any> {
    return this._http.post(`${this.baseUrl}/category`, { name, parentId }, this.getHeaders());
  }

  getCustomers(): Observable<any> {
    return this._http.get(`${this.baseUrl}/customers`, this.getHeaders());
  }

  getItems(): Observable<any> {
    return this._http.get(`${this.baseUrl}/items`, this.getHeaders());
  }

  getOrders(): Observable<any> {
    return this._http.get(`${this.baseUrl}/orders`, this.getHeaders());
  }

  getCategories(): Observable<any> {
    return this._http.get(`${this.baseUrl}/categories`, this.getHeaders());
  }

  getVendors(): Observable<any> {
    return this._http.get(`${this.baseUrl}/vendors`, this.getHeaders());
  }

  approveVendor(id: string, approvalStatus: boolean): Observable<any> {
    return this._http.put<Admin>(`${this.baseUrl}/vendor/${id}`, { isActive: approvalStatus }, this.getHeaders());
  }
  
  login(email: string, password: string): Observable<any> {
    return this._http.post<Admin>(`${this.baseUrl}/login`, { email, password });
  }
  
}

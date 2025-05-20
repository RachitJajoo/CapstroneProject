import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  
  private apiUrl = 'https://ecommerce-app-backend-j51c.onrender.com/api/items';

  constructor(private _http: HttpClient) {}


  addItem(formData : any): Observable<any> {
    const item : Item = {...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    //consle.log(item);
    
    return this._http.post(`${this.apiUrl}/add`, item);
  }
  

  addImage(formData : FormData):Observable<any> {
    return this._http.post(`${this.apiUrl}/add/image` , formData);
  }


  getAllItems(): Observable<Item[]> {
    return this._http.get<any>(`${this.apiUrl}/getItems`);
  }

  getItemById(id : string):Observable<Item> {
    return this._http.get<any>(`${this.apiUrl}/${id}`);
  }

}

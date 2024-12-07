import { User } from './user.model';

export interface Vendor extends User {
  vendorId:number,
  storeName: string;
  productList: number[];  // List of product IDs
  reviews: number;        // Average customer review score
}

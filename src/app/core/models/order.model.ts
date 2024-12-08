import { Customer } from "./customer.model";
import { Item } from "./item.model";
import { Vendor } from "./vendor.model";


export interface Order {
  id: number;
  customerId: string;
  vendorId: string;
  itemId : string,
  item : Item,
  vendor : Vendor,
  customer : Customer,
  totalAmount: number; 
  orderDate: Date;
  estimatedDeliveryDate: Date; 
  orderStatus: string;
}

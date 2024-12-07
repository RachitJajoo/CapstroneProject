import { Item } from './item.model';
import { Customer } from './customer.model';

export interface Order {
  id: number;
  orderDate: Date;
  customer: Customer;
  items: Item[];
  trackingNumber: string;
  estimatedDeliveryDate: Date;
  totalAmount: number;
  shippingAddress: string;
  paymentStatus: string;  
  orderStatus: string; 
}

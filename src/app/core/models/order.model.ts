// import { Item } from './item.model';


export interface Order {
  id: number;
  orderDate: Date;
  customerId: string;
  vendorId : string;
  itemId : string;
  trackingNumber: string;
  estimatedDeliveryDate: Date;
  totalAmount: number;
  shippingAddress: string;
  paymentStatus: string;  
  orderStatus: string; 
}

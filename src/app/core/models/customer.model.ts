import { User } from './user.model';

export interface Customer extends User {
  shippingAddress: string;
  orderHistory: number[];  // List of order IDs
}

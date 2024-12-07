export interface User {
    id: number;
    name: string;
    phoneNumber:number;
    email: string;
    isActive: boolean;
    role: 'vendor' | 'customer' | 'admin';
  }
  
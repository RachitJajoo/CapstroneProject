export interface User {
    id: string;
    username: string;
    password:string;
    phoneNumber:number;
    email: string;
    isActive: boolean;
    role: 'vendor' | 'customer' | 'admin';
  }
  
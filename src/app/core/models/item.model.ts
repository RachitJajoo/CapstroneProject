

export interface Item{
    id: string;
    name: string;
    description: string;
    original_price: number;
    stockQuantity: number;
    reviews : any[]
    category: string;
    img_url: string;
    createdAt: Date;
    updatedAt: Date;
    vendorId : number,
  }
  
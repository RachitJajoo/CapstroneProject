

export interface Item{
    id: string;
    name: string;
    description: string;
    original_price: number;
    stockQuantity: number;
    category: string;
    img_url: string;
    createdAt: Date;
    updatedAt: Date;
    vendorId : number,
  }
  
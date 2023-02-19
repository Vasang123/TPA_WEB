export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role_id: number;
  isBanned: string;
  isSubscribed: string;
  role?: {
    id?: number;
    name?: string;
  }
}

export interface Brand{
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  rating: number;
  description: string;
  category_id: number;
  user_id: number;
  user: {
    id: number;
    firstName: string;
  };
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
}

export interface Voucher {
  id: number;
  name: string;
  quantity: number;
  description: string;
}
export interface Promo {
  id: number;
  name: string;
  image: string;
  status: string;
}
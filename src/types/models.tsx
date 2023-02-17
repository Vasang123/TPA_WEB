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

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  rating: number;
  description: string;
  category_id: number;
  store_id: number;
  store: {
    id: number;
    name: string;
  };
  category: {
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
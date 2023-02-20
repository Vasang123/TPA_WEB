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

export interface Brand {
  id: number;
  name: string;
}
export interface Review {
  id: number;
  user_id: number;
  rating: number;
  comment: string;
  product_id: number;
  created_at: Date;
  modified_at: Date;
  user?: {
    id?: number;
    firstName?: string;
  };
}
export interface Cart {
  id: number;
  user_id: number;
  quantity: number; // requested item
  product_id: number;
  is_like: string;
  user?: {
    id?: number;
    firstName?: string;
  };
  product?: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
    rating: number;
    description: string;
    category_id: number;
    user_id: number; // shop
    user?: {
      id?: number;
      firstName?: string;
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
  user?: {
    id?: number;
    firstName?: string;
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
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
  money?: number;
}

export interface Brand {
  id: number;
  name: string;
}
export interface AddressData {
  id?: number;
  name: string;
  user_id: number;
}
export interface Order {
  id?: number;
  invoice?: string;
  created_at?: Date;
  modified_at: Date;
  payment: string;
  delivery: string;
  total: number;
  address_id: number;
  user_id: number;
  address?: {
    id?: number;
    name: string;
  }
  status?: string;
  buy_again?: string;
}
export interface Review {
  id: number;
  user_id: number;
  rating: number;
  comment: string;
  product_id: number;
  created_at?: Date;
  modified_at: Date;
  user?: {
    id?: number;
    firstName?: string;
  };
}
export interface Category {
  id: number;
  name: string;
}
export interface Cart {
  id: number;
  user_id: number;
  quantity?: number; // requested item
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
  order_id?: number;
}
export interface Wishlist {
  id: number;
  name: string;
  user_id: number;
  user?: {
    id?: number;
    firstName?: string;
  };
  privacy: string;
  image?: string;
  note?: string;
}
export interface WishlistDetail {
  id: number;
  wishlist_id: number;
  product_id: number;
  wishlist?: {
    user_id: number;
    id: number;
    name: string;
    user?: {
      id?: number;
      firstName?: string;
    };
    privacy: string;
    image: string;
    note?: string;
  }
  product?: {
    id?: number;
    name?: string;
    quantity?: number;
    price?: number;
    image?: string;
    rating?: number;
    description?: string;
    category_id?: number;
    user_id?: number; // shop
    user?: {
      id?: number;
      firstName?: string;
    };
    category?: {
      id: number;
      name: string;
    };
    brand?: {
      id: number;
      name: string;
    };
  }
  quantity: number;

}
export interface Product {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  rating?: number;
  description: string;
  category_id: number;
  user_id: number;
  brand_id: number;
  sold?: number;
  user?: {
    id?: number;
    firstName?: string;
    isBanned?: string;
  };
  category?: {
    id: number;
    name: string;
  };
  brand?: {
    id: number;
    name: string;
  };
}

export interface Voucher {
  id: number;
  name: string;
  bonus: number;
  quantity: number;
  description: string;
}
export interface Promo {
  id: number;
  name: string;
  image: string;
  status: string;
}

export interface FavoriteList {
  id: number;
  user_id: number;
  wishlist?: {
    id: number;
    name: string;
    user?: {
      id?: number;
      firstName?: string;
    };
    privacy: string;
    image: string;
  }
  wishlist_id: number;
}

export interface WishlistReview {
  id: number;
  name: string;
  title: string;
  comment: string;
  rating: number;
  user_id?: number;
  wishlist_id: number
  created_at?: Date;
  modified_at: Date;
  wishlist?: {

  }
  user?: {

  }
}
export interface HelpList {
  id: number;
  user_id: number;
  review_id: number;
  status: string;
}
export interface Newsletter {
  title: string;
  content: string;
}

export type LangType = {
  [key: string]: {
    is_eng: boolean;
  };
};

export interface Shop {
  id: number;
  image: string;
  about: string;
  user_id: number;
  user?: {
    id?: number;
    firstName?: string;
    isBanned?: string;
  };
}

export interface SearchFilter {
  price: boolean;
  sold: boolean;
  search1: string;
  search2: string;
  asc: boolean;
  desc: boolean;
}

export interface UpdatePhone {
  user_id: number;
  new_phone_number: string;
}
export interface UpdatePassword {
  email: string;
  old_password: string;
  new_password: string;
}
export interface UpdateStoreReq {
  shop_id: number;
  role_id: number;
  user_id: number;
  new_name: string;
}

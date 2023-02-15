export interface User {
    id: number;
    firstName : string;
    lastName : string;
    email : string;
    phoneNumber : string;
    role : string;
    password : string;
}

export interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
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
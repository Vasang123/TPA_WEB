import axios from 'axios';
import { storage } from '@/firebase'
import { ref, uploadBytes } from "firebase/storage";
import { getStorage, getDownloadURL } from "firebase/storage";
import { AddressData, Order, Product, UpdateStoreReq, User } from '@/types/models';
const register = async (user: any, router: any) => {
  axios.post('http://localhost:8000/api/register', user)
    .then(response => {
      if (response.data.message === 'Email already exists') {
        alert("Email already exists")
      } else {
        // localStorage.setItem('token', response.data.token);
        // localStorage.setItem('user', JSON.stringify(user));
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        alert("Success")
        router.push("/signin");
      }
    })
    .catch(response => {
      console.log(response);
    });
};
export const add_user = async (user: any, router: any) => {
  axios.post('http://localhost:8000/api/register', user)
    .then(response => {
      if (response.data.message === 'Email already exists') {
        alert("Email already exists")
      } else {
        alert("Shop successfuly added")
        router.push("/admin/home");
      }
    })
    .catch(response => {
      console.log(response);
    });
};
export const add_cart = async (cart: any) => {
  const response = await fetch(`http://localhost:8000/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};
export const cart_quantity_controller = async (cart: any) => {
  const response = await fetch(`http://localhost:8000/api/cart/quantity`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    // alert(JSON.stringify(data.message));
  }
};
export const wish_quantity_controller = async (cart: any) => {
  const response = await fetch(`http://localhost:8000/api/wishlist/quantity`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    // alert(JSON.stringify(data.message));
  }
};
export const wish_note_controller = async (wish: any) => {
  const response = await fetch(`http://localhost:8000/api/wishlist/private/note`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wish)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};

export const update_cart = async (cart: any) => {
  const response = await fetch(`http://localhost:8000/api/cart/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};

export const add_review = async (review: any) => {
  const response = await fetch(`http://localhost:8000/api/review/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};
export const add_wishlist_review = async (review: any) => {
  const response = await fetch(`http://localhost:8000/api/wishlist/review/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};
export const update_review = async (review: any) => {
  const response = await fetch(`http://localhost:8000/api/review/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};
export const add_promo = async (promo: any, imageFile: File, router: any) => {
  let loading = true;
  const storageRef = ref(storage, `images/${imageFile.name}`);
  await uploadBytes(storageRef, imageFile)
  let starsRef = ref(storage, `images/${imageFile.name}`);

  const downloadURL = await getDownloadURL(starsRef);

  promo.image = downloadURL;

  axios.post('http://localhost:8000/api/create_promo', promo)
    .then(response => {
      if (response.data.message == 'Success') {
        alert("Promo successfully added")
        router.push("/admin/home");
      } else {
        alert("Failed to insert promo")
      }
    })
    .catch(response => {
      console.log(response);
    }).finally(() => {
      // Set loading state to false
      loading = false;
    });

  return loading;
};

export const add_voucher = async (voucher: any, router: any) => {
  axios.post('http://localhost:8000/api/create_voucher', voucher)
    .then(response => {
      if (response.data.message == 'Success') {
        alert("Voucher successfully added")
        router.push("/admin/home");
      } else {
        alert("Failed to insert voucher")
      }
    })
    .catch(response => {
      console.log(response);
    });
};
export const send_news = async (news: any, router: any) => {
  axios.post('http://localhost:8000/api/send_news', news)
    .then(response => {
      if (response.data.message == 'Success') {
        alert("Voucher successfully added")
        router.push("/admin/home");
      } else {
        alert("Failed to insert voucher")
      }
    })
    .catch(response => {
      console.log(response);
    });
};
export const login = async (user: any, router: any) => {
  axios.post('http://localhost:8000/api/login', user)
    .then(response => {
      if (response.data.message == 'Invalid Credential') {
        alert("Incorret Email or Password")

      } else if (response.data.message == 'Your Account Is Banned') {
        alert("Your Account Is Banned")

      } else {

        localStorage.setItem('token', response.data.token);
        user.id = response.data.user.id
        user.email = response.data.user.email
        user.firstName = response.data.user.firstName
        user.lastName = response.data.user.lastName
        user.password = response.data.user.password
        user.role = response.data.user.role
        user.role_id = response.data.user.role_id
        user.isBanned = response.data.user.isBanned
        user.isSubscribed = response.data.user.isSubscribed
        user.phoneNumber = response.data.user.phoneNumber
        user.money = response.data.user.money
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        router.push("/");

      }

      // console.log(response.data);
    })
    .catch(response => {
      console.log(response);
    });
};
export const create_wishlist = async (wishlist: any) => {
  const response = await fetch(`http://localhost:8000/api/wishlist/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wishlist)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};
export const help_handle = async (help: any) => {
  const response = await fetch(`http://localhost:8000/api/shop/helplist/insert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(help)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};

export const handle_cart_later = async (cart: any) => {
  const response = await fetch(`http://localhost:8000/api/cart/change/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};
export const update_phone = async (data: any) => {
  const response = await fetch(`http://localhost:8000/api/profile/phone/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};
export const update_password = async (data: any) => {
  const response = await fetch(`http://localhost:8000/api/profile/password/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};
export const update_shop_name = async (data1: UpdateStoreReq, user: User) => {
  const response = await fetch(`http://localhost:8000/api/shop/name/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data1)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    if (data.message == "Success") {
      console.log(user.firstName);
      console.log(data1.new_name);

      user.firstName = data1.new_name
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
    }
    alert(JSON.stringify(data.message));
  }
};
export const update_shop_about = async (data1: UpdateStoreReq, user: User) => {
  const response = await fetch(`http://localhost:8000/api/shop/about/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data1)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    if (data.message == "Success") {

    }
    alert(JSON.stringify(data.message));
  }
};
export const update_shop_banner = async (data1: UpdateStoreReq, imageFile: any) => {
  const storageRef = ref(storage, `images/${imageFile.name}`);
  await uploadBytes(storageRef, imageFile)
  let starsRef = ref(storage, `images/${imageFile.name}`);
  let loading = true;
  const downloadURL = await getDownloadURL(starsRef);

  data1.new_name = downloadURL;

  const response = await fetch(`http://localhost:8000/api/shop/banner/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data1)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
    loading = false;
  }
  return loading;
}
export const insert_product = async (data1: any, imageFile: any) => {
  const storageRef = ref(storage, `images/${imageFile.name}`);
  await uploadBytes(storageRef, imageFile)
  let starsRef = ref(storage, `images/${imageFile.name}`);
  const downloadURL = await getDownloadURL(starsRef);

  data1.image = downloadURL;
  const response = await fetch(`http://localhost:8000/api/shop/insert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data1)
  });
  console.log(JSON.stringify(data1));

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    console.log(JSON.stringify(data1));

    alert(JSON.stringify(data.message));
  }

}
export const update_product = async (data1: any, imageFile: any) => {
  if (imageFile != null) {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile)
    let starsRef = ref(storage, `images/${imageFile.name}`);
    const downloadURL = await getDownloadURL(starsRef);

    data1.image = downloadURL;
  }
  const response = await fetch(`http://localhost:8000/api/shop/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data1)
  });
  console.log(JSON.stringify(data1));

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    console.log(JSON.stringify(data1));

    alert(JSON.stringify(data.message));
  }

}

export const insert_address = async (data1: AddressData) => {
  const response = await fetch(`http://localhost:8000/api/checkout/insert/address`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data1)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    if (data.message == "Success") {

    }
    alert(JSON.stringify(data.message));
  }
};
export const create_order = async (data1: Order) => {
  const response = await fetch(`http://localhost:8000/api/order/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data1)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    alert(JSON.stringify(data.message));
  }
};
export const delete_address = async (id: any) => {
  const response = await fetch(`http://localhost:8000/api/checkout/delete/address?id=${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    if (data.message == "Success") {

    }
    alert(JSON.stringify(data.message));
  }
};
export const buy_again = async (order_id: any) => {
  const response = await fetch(`http://localhost:8000/api/profile/order_to_cart?order_id=${order_id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    if (data.message == "Success") {

    }
    alert(JSON.stringify(data.message));
  }
};
export const handle_seller = async (order_id: any, data: any) => {
  const response = await fetch(`http://localhost:8000/api/order/seller/update?order_id=${order_id}&data=${data}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    if (data.message == "Success") {

    }
    alert(JSON.stringify(data.message));
  }
};
export default register;


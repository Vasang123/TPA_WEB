import axios from 'axios';
import { storage } from '@/firebase'
import { ref, uploadBytes } from "firebase/storage";
import { getStorage, getDownloadURL } from "firebase/storage";
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
export const login = async (user: any, router: any) => {
  axios.post('http://localhost:8000/api/login', user)
    .then(response => {
      if (response.data.message == 'Invalid Credential') {
        alert("Incorret Email or Password")

      } else {
        // console.log(response.data.user.firstName);
        localStorage.setItem('token', response.data.token);
        user.id = response.data.user.id
        user.email = response.data.user.email
        user.firstName = response.data.user.firstName
        user.lastName = response.data.user.lastName
        user.password = response.data.user.password
        user.role = response.data.user.role
        user.role_id = response.data.user.role_id
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
export default register;

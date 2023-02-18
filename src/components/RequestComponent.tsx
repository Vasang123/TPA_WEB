import { useState } from 'react';
import axios from 'axios';

const register = async (user: any, router: any) => {
  axios.post('http://localhost:8000/api/register', user)
    .then(response => {
      if (response.data.message === 'Email already exists') {
        alert("Email already exists")
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        router.push("/");
      }
    })
    .catch(response => {
      console.log(response);
    });
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

      } else if (response.data.message == 'Your Account Is Banned') {
        alert("Your Account Is Banned")
      }else {
        // console.log(response.data.user.firstName);
        localStorage.setItem('token', response.data.token);
        user.email = response.data.email
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

export default register;

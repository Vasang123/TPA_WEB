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

      } else {

        localStorage.setItem('token', response.data.token);
        user.email = response.data.email
        user.firstName = response.data.firstName
        user.lastName = response.data.lastName
        user.password = response.data.password
        user.role = response.data.role
        user.role_id = response.data.role_id
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

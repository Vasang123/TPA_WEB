
import style from '../styles/signup.module.scss'
import Link from 'next/link';
import React, { useContext, useState } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { MainLogoEffect2 } from '@/components/LogoComponent'
import { Input }from '@/components/InputComponent'
import {SecondarySpanColor, SecondaryLinkColor, BaseBackgroundColor} from '@/components/GlobalComponent'
import { User } from '@/types/models';
import register from '@/components/RequestComponent'
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
export default function SignUp(){
    const router = useRouter();
    const { theme } = useContext(ThemeContext);
    const [user, setUser] = useState<User>({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role_id: 1,
        password: '',
        isBanned : 'no',
        isSubscribed : 'no'
      });
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        // console.log(user)
    };
    function isValidPassword(password:any) {
        if (password.length < 8 || password.length > 30) {
          return false;
        }
        
        let hasLowerCase = false;
        let hasUpperCase = false;
        let hasNumber = false;
        let hasSpecial = false;
      
        for (let i = 0; i < password.length; i++) {
          const char = password[i];
          if (char >= 'a' && char <= 'z') {
            hasLowerCase = true;
          } else if (char >= 'A' && char <= 'Z') {
            hasUpperCase = true;
          } else if (char >= '0' && char <= '9') {
            hasNumber = true;
          } else if ('@$!%*?&'.includes(char)) {
            hasSpecial = true;
          }
        }
      
        return hasLowerCase && hasUpperCase && hasNumber && hasSpecial;
      }
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked ? 'yes' : 'no';
        setUser((prevUser) => ({
        ...prevUser,
        isSubscribed: value
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(user.firstName === ""){
            alert("First name can't be empty")
        }else if(user.lastName === ""){
            alert("Last name can't be empty")
        }else if(user.email === ""){
            alert("Email can't be empty")
        }else if(user.phoneNumber === ""){
            alert("Phone Number can't be empty")
        }else if(user.password === ""){
            alert("Password can't be empty")
        }else if(!isValidPassword(user.password)){
            alert("Password must contain capital letters, lower-case letters, numbers, and special symbols, and has a length of 8 – 30 characters")
        }else {
            register(user, router);
        }
    };
    
    return(
        <BaseBackgroundColor className={style.background}>
        <div className={style.container} >
            <div className={style.form_container}>
                <div className="logo-container">
                    <MainLogoEffect2   MainLogoEffect className="light-container">
                    
                    </MainLogoEffect2>
                    <Link href="/">
                        <img src="https://1000logos.net/wp-content/uploads/2022/06/Newegg-logo-768x432.png" alt="" />
                    </Link>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <h1 className={style.sign_in_label} style={{
                            'color' : theme.secondaryColor
                        }}>Create An Account</h1>
                    <Input name="firstName" onChange = {handleChange} type="text" placeholder='First Name'/>
                    <Input name="lastName" onChange = {handleChange} type="text" placeholder='Last Name'/>
                    <Input name="email" onChange = {handleChange} type="email" placeholder='Email Address'/>
                    <Input name="phoneNumber" onChange = {handleChange} type="text" placeholder='Mobile Phone Number (optional)'/>
                    <Input name="password" onChange = {handleChange} type="password" placeholder='Password'/>
                    <button type='submit' name='sign_in' className={style.sign_up} ><b>SIGN UP</b></button> 
                    <div className={style.subscribe}>
                        <input type="checkbox" onChange={handleCheckboxChange} />
                        <SecondarySpanColor>Subscribe for exclusive e-mail offers and discounts</SecondarySpanColor>
                    </div>
                </form>
                <SecondarySpanColor>Have an account? 
                        <SecondaryLinkColor href="/signin">
                            Sign In
                        </SecondaryLinkColor>
                </SecondarySpanColor>
            
            </div>
           
        </div>
        <div className={style.footer_container}>
            <footer>
               <div className={style.footer_content}>
                    <p className={style.terms_condition}>
                        <Link href="">Terms & Conditions</Link>
                        <span>|</span>
                        <Link href="">Privacy Policy</Link>
                    </p>
                    <p>© 2000-2023 Newegg Inc. All rights reserved.</p>
               </div>
            </footer>
        </div>
        </BaseBackgroundColor>
    );
}
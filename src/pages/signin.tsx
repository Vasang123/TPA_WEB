import style from '../styles/signin.module.scss'
import Link from 'next/link';
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/components/ThemeContext";
import { MainLogoEffect2 } from '@/components/LogoComponent'
import { Input }from '@/components/InputComponent'
import { SecondaryBoldColor, SecondaryLinkColor, SecondarySpanColor, SecondaryH1Color, ButtonInputBg, BaseBackgroundColor }from '@/components/GlobalComponent'
import { User } from '@/types/models';
import { useRouter } from 'next/router';
import { login } from '@/components/RequestComponent';
export default function SignIn(){
    const { theme } = useContext(ThemeContext);
    const router = useRouter();
    const [user, setUser] = useState<User>({
        id: 0,
        firstName : '',
        lastName : '',
        email : '',
        phoneNumber : '',
        role_id : 0,
        password: '',
        isBanned : '',
        isSubscribed : ''
      });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        // console.log(user)
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        login(user, router);
    };
    return (
        <BaseBackgroundColor className={style.background} > 
        <div className={style.container} >
            <div className={style.form_container}>
                <div className="logo-container">
                    <MainLogoEffect2 className="light-container">
                        
                    </MainLogoEffect2>
                    <Link href="/">
                        <img src="https://1000logos.net/wp-content/uploads/2022/06/Newegg-logo-768x432.png" alt="" />
                    </Link>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <SecondaryH1Color htmlFor={style.sign_in_label} >Sign In</SecondaryH1Color>
                    <Input name ="email" onChange={handleChange} className={style.temp_1} type="email" placeholder="Email Address"/>
                    <Input name = "password"  onChange={handleChange} type="password" placeholder="Password"/>
                    <button type='submit' name='sign_in' className={style.sign_in}>
                        <b>SIGN IN</b></button> 
                    <ButtonInputBg type='button' name='sign_in_code' className={style.sign_in_code}>
                        <SecondaryBoldColor >
                            GET ONE-TIME SIGN IN CODE
                        </SecondaryBoldColor>
                    </ButtonInputBg> 
                </form>
                <SecondaryLinkColor href="" >What&apos;s the One-Time Code?</SecondaryLinkColor>
                <SecondarySpanColor>New to Newegg?
                        <SecondaryLinkColor href="/signup">
                            Sign Up
                        </SecondaryLinkColor>
                </SecondarySpanColor>
                <div className={style.or}>
                    <SecondarySpanColor>OR</SecondarySpanColor>
                </div>
               
                <ButtonInputBg className={style.sign_in_acc} >
                    <div className={style.google_icon} ></div>
                    <SecondaryLinkColor href="">SIGN IN WITH GOOGLE</SecondaryLinkColor>
                </ButtonInputBg>
                <ButtonInputBg className={style.sign_in_acc}>
                    <div className={style.apple_icon}></div>
                    <SecondaryLinkColor href=""> SIGN IN WITH APPLE</SecondaryLinkColor>
                </ButtonInputBg>
            </div>
           
        </div>
        <div className={style.footer_container}>
            <footer>
               <div className={style.footer_content}>
                    <p className={style.terms_condition}>
                        <a href="">Terms & Conditions</a>
                        <span>|</span>
                        <a href="">Privacy Policy</a>
                    </p>
                    <p>© 2000-2023 Newegg Inc. All rights reserved.</p>
               </div>
            </footer>
        </div>
        </BaseBackgroundColor>

    );

}
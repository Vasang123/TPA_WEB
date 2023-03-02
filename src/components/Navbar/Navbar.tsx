import Link from "next/link"
import React, { useEffect, useState } from "react";
import { LogoSecondary, MainLogoEffect } from "../Other/LogoComponent";
import { MainDivBg, SecondaryBoldColor } from "../Other/GlobalComponent";
import Search from "./Search";
import ThemeSwitcher from "../Theme/ThemeSwitcher";
import Subnav from './SubNav'
import Profile from "./Profile";
import CartNav from "./CartNav";
import WishListNav from "./WishlistNav";
import axios from "axios";
import CurrentLocation from "./Location";
import { useRouter } from "next/router";
import { User } from "@/types/models";
import Language from "./Language";
export default function Navbar() {
    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState(true);
    let i = 1;
    const r = useRouter()
    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
            setUserData(JSON.parse(userDataString));
        }
    }, []);


    return (
        <>
            <MainDivBg className="nav" >
                <div className="menu-container">
                    <div className="menu-temp">
                        <LogoSecondary className="uil uil-bars"></LogoSecondary>
                    </div>
                </div>
                <div className="logo-container">
                    <MainLogoEffect className="light-container">

                    </MainLogoEffect>
                    <Link href="/">
                        <img src="https://c1.neweggimages.com/WebResource/Themes/Nest/logos/Newegg_full_color_logo_RGB.SVG" alt="" />
                    </Link>
                </div>
                <CurrentLocation />
                <div className="search-container">
                    <Search />
                </div>
                <div className="notification-container">
                    <div className="notification-temp">
                        <LogoSecondary className="uil uil-bell" ></LogoSecondary>
                    </div>
                </div>
                <Language />
                <div className="theme-container">
                    <ThemeSwitcher />
                </div>
                <Profile />
                <WishListNav />
                {
                    userData && (
                        <CartNav user_id={userData ? userData.id : null} />
                    )
                }

            </MainDivBg>
            <Subnav />

        </>
    )
}
import Link from "next/link"
import React from "react";
import { LogoSecondary, MainLogoEffect } from "../Other/LogoComponent";
import { MainDivBg, SecondaryBoldColor} from "../Other/GlobalComponent";
import Search from "./SearchNavbar";
import ThemeSwitcher from "../Theme/ThemeSwitcher";
import Subnav from './SubNav'
import Profile from "./Profile";
import CartNav from "./CartNav";
import WishListNav from "./WishlistNav";
export default function Navbar(){
    

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
            <div className="address-container">
                <LogoSecondary className="uil uil-map-marker"></LogoSecondary>
                <div className="address-temp">
                    <div className="address-welcome">
                        Hello
                    </div>
                    <div className="address-select">
                        <span><SecondaryBoldColor>Select</SecondaryBoldColor></span>
                        <span><SecondaryBoldColor>Address</SecondaryBoldColor></span>
                    </div>
                </div>
            </div>
            <div className="search-container">
              <Search/>
            </div>
            <div className="notification-container">
                <div className="notification-temp">
                    <LogoSecondary className="uil uil-bell" ></LogoSecondary>
                </div>
            </div>
            <div className="country-container">
                <div className="notification-temp">
                    <LogoSecondary className="uil uil-bell"></LogoSecondary>
                </div>
            </div>
            <div className="theme-container">
                <ThemeSwitcher/>
            </div>
            <Profile/>
            <WishListNav/>
            <CartNav/>
        </MainDivBg>
        <Subnav />

        </>
    )
}
import Link from "next/link"
import React, { useState,useContext, useEffect } from "react";
import {THEME, ThemeContext } from "./ThemeContext";
import { LogoSecondary, MainLogoEffect } from "./LogoComponent";
import { MainDivBg, SecondaryBoldColor, SecondaryLinkColor, SecondaryLinkColor2} from "./GlobalComponent";
export default function Navbar(){
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
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
                <form action="">
                    <input type="text" name="" id="" className="search-input"
                    style={{
                        backgroundColor : theme.searchColor,
                        color : theme.secondaryColor
                    }}/>
                    <button className="search-button" style={{
                            backgroundColor : theme.thirdColor
                        }}>
                        <i className="uil uil-search" ></i>
                    </button>
                </form>
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
                <label className="switch">
                    <input type="checkbox" onChange={toggleTheme} checked={theme === THEME.dark} />
                    <span className="slider round" style={{
                    backgroundColor: theme.toggleSwitch,
                    left: theme === THEME.light ? '0' : '0px',
                    }}></span>
                </label>
            </div>
            <div className="account-container">
                {user ? (
                    <Link href="/signout">
                        <LogoSecondary className="uil uil-user" ></LogoSecondary>
                    </Link>
                ) : (
                    <Link href="/signup">
                        <LogoSecondary className="uil uil-user" ></LogoSecondary>
                    </Link>
                )}
                
                <div className="address-temp">
                
                        {user ? (
                            <Link href="/signout">
                            <div className="address-welcome">
                            Welcome,
                            </div>
                             <div className="address-select">
                                <span><SecondaryBoldColor>{user.firstName}</SecondaryBoldColor></span>
                             </div>
                            </Link>
                        ) : (
                            <Link href="/signup">

                            <div className="address-welcome">
                            Welcome
                            </div>
                            <div className="address-select">
                                <span><SecondaryBoldColor>SignIn/</SecondaryBoldColor></span>
                                <span><SecondaryBoldColor>Register</SecondaryBoldColor></span>
                            </div>
                            </Link>
                        )}
                        
                </div>
            </div>
            <div className="return-order-container">
                <div className="address-temp">
                    <div className="address-welcome">
                        Return
                    </div>
                    <div className="address-select">
                        <span><SecondaryBoldColor>&</SecondaryBoldColor></span>
                        <span><SecondaryBoldColor>Orders</SecondaryBoldColor></span>
                    </div>
                </div>
            </div>
            <div className="cart-container">
                <div className="cart-temp">
                    <LogoSecondary className="uil uil-shopping-cart-alt"></LogoSecondary>
                </div>  
                
            </div>
        </MainDivBg>
        <MainDivBg className="sub-nav" >
            <div className="left-sub-nav">
                <ul className="sub-nav-items">
                    <li> <b ><SecondaryLinkColor href="">Today&apos;s Best Deals</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">Best Seller</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">Big Game TV Deals</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">RTX 4080/4090 Gaming Laptops</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="" className="special">Valentine&apos;s Day</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">Pc Builder</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="" >Browsing History</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">Gaming PC Finder</SecondaryLinkColor></b></li>
                </ul>
            </div>
            <div className="right-sub-nav">
                <ul className="right-nav-items">
                    <li> <b><SecondaryLinkColor href="" className="newegg"><span>NEWEGG</span>BUSINESS</SecondaryLinkColor></b></li>
                    <li> <b ><SecondaryLinkColor2 href="" className="blue-box blue-1"><i className="uil uil-comment-alt-message"></i>FEEDBACK</SecondaryLinkColor2></b></li>
                    <li> <b><SecondaryLinkColor2 href="" className="blue-box blue-2"><i className="uil uil-question-circle"></i>HELP CENTER</SecondaryLinkColor2></b></li>
                </ul>
            </div>
        </MainDivBg>
        </>
    )
}
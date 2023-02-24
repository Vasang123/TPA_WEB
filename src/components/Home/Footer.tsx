import style from '@/styles/Home/footer.module.scss'
import Link from 'next/link'
import { ThemeContext } from "../Theme/ThemeContext";
import { useContext } from 'react';
import { Logo, LogoPrimary } from '../Other/LogoComponent';
export default function Footer() {
    const { theme } = useContext(ThemeContext);
    return (
        <footer className={style.footer_container} style={{
            backgroundColor: theme.bodyColor
        }}>
            <div className={style.top} style={{
                backgroundColor: theme.footerColor
            }}>
                <div className={style.grid_col}>
                    <h1>Customer Service</h1>
                    <ul>
                        <li> <Link href=""> Help Center </Link></li>
                        <li> <Link href=""> Track an Order </Link></li>
                        <li> <Link href=""> Return an Item </Link></li>
                        <li> <Link href=""> Return Policy </Link></li>
                        <li> <Link href=""> Feedback </Link></li>
                    </ul>
                </div>
                <div className={style.grid_col}>
                    <h1>My Account</h1>
                    <ul>
                        <li><Link href="http://localhost:3000/signin">Login/Register</Link></li>
                        <li><Link href="">Order History</Link></li>
                        <li><Link href="">Returns History</Link></li>
                        <li><Link href="">Address Book</Link></li>
                        <li><Link href="http://localhost:3000/cart/wishlist">Wishlist</Link></li>
                        <li><Link href="">My Build Lists</Link></li>
                        <li><Link href="">My Build Showcase</Link></li>
                        <li><Link href="">Email Notifications</Link></li>
                        <li><Link href="">Subsciptions Order</Link></li>
                        <li><Link href="">Auto Notifications</Link></li>
                    </ul>
                </div>
                <div className={style.grid_col}>
                    <h1>Company Information</h1>
                    <ul>
                        <li><Link href="">About Newegg</Link></li>
                        <li><Link href="">Investor Relations</Link></li>
                        <li><Link href="">Awards/Rankings</Link></li>
                        <li><Link href="">Hours and Locations</Link></li>
                        <li><Link href="">Press Inquiries</Link></li>
                        <li><Link href="">Newegg Careers</Link></li>
                        <li><Link href="">Newsroom</Link></li>
                        <li><Link href="">Newegg Insider</Link></li>
                        <li><Link href="">Calif. Transparency</Link></li>
                        <li><Link href="">in Supply Chains Act</Link></li>
                        <li><Link href="">Cigna MRF</Link></li>
                    </ul>
                </div>
                <div className={style.grid_col}>
                    <h1>Tools & Resources</h1>
                    <ul>
                        <li><Link href="">Sell on Newegg </Link></li>
                        <li><Link href="">For Your Business </Link></li>
                        <li><Link href="">Newegg Partner Services </Link></li>
                        <li><Link href="">Become an Affiliate </Link></li>
                        <li><Link href="">Newegg Creators </Link></li>
                        <li><Link href="">Site Map </Link></li>
                        <li><Link href="">Shop by Brand </Link></li>
                        <li><Link href="">Rebates </Link></li>
                        <li><Link href="">Mobile Apps </Link></li>
                    </ul>
                </div>
                <div className={style.grid_col}>
                    <h1>Shop Our Brands</h1>
                    <ul>
                        <li><Link href="">Newegg Business </Link></li>
                        <li><Link href="">Newegg Global </Link></li>
                        <li><Link href="">ABS </Link></li>
                        <li><Link href="">Rosewill </Link></li>
                    </ul>
                </div>
            </div>
            <div className={style.bottom} >
                <div className={style.left_footer}>
                    <p style={{
                        color: theme.secondaryColor
                    }}>© 2000-2023 Newegg Inc.  All rights reserved.Terms & ConditionsPrivacy PolicyCookie Preferences</p>

                </div>
                <div className={style.right_footer}>
                    <Logo className={style.logo_container} >
                        <Link href="https://www.facebook.com/" target='_blank'>
                            <LogoPrimary className="uil uil-facebook-f"></LogoPrimary>
                        </Link>
                    </Logo>
                    <Logo className={style.logo_container}>
                        <Link href="https://twitter.com/" target='_blank' >
                            <LogoPrimary className="uil uil-twitter"></LogoPrimary>
                        </Link>
                    </Logo>
                    <Logo className={style.logo_container}>
                        <Link href="https://www.instagram.com/" target='_blank'>
                            <LogoPrimary className="uil uil-instagram"></LogoPrimary>
                        </Link>
                    </Logo>
                    <Logo className={style.logo_container}>
                        <Link href="https://www.linkedin.com/" target='_blank'>
                            <LogoPrimary className="uil uil-linkedin"></LogoPrimary>
                        </Link>
                    </Logo>
                    <Logo className={style.logo_container}>
                        <Link href="https://www.youtube.com/" target='_blank'>
                            <LogoPrimary className="uil uil-youtube"></LogoPrimary>
                        </Link>
                    </Logo>
                    <Logo className={style.logo_container}>
                        <Link href="https://discord.com/" target='_blank'>
                            <LogoPrimary className="uil uil-discord"></LogoPrimary>
                        </Link>
                    </Logo>
                    <Logo className={style.logo_container}>
                        <Link href="https://medium.com/" target='_blank'>
                            <LogoPrimary className="uil uil-medium-m"></LogoPrimary>
                        </Link>
                    </Logo>
                    <Logo className={style.logo_container}>
                        <Link href="https://www.skype.com/en/" target='_blank'>
                            <LogoPrimary className="uil uil-skype"></LogoPrimary>
                        </Link>
                    </Logo>
                    <Logo className={style.logo_container}>
                        <Link href="https://line.me/en/" target='_blank'>
                            <LogoPrimary className="uil uil-line"></LogoPrimary>
                        </Link>
                    </Logo>
                    <Logo className={style.logo_container}>
                        <Link href="https://www.tumblr.com/" target='_blank'>
                            <LogoPrimary className="uil uil-tumblr"></LogoPrimary>
                        </Link>
                    </Logo>
                </div>
            </div>
        </footer>
    );
}
import Link from "next/link"
import { MainDivBg, SecondarySpanColor } from "../Other/GlobalComponent"
import { LogoSecondary } from "../Other/LogoComponent"
import { useContext } from "react";
import { LanguageContext } from "../Language/LanguageContext";
export default function WishlistNav() {
    const { lang } = useContext(LanguageContext);
    return (
        <MainDivBg className="shop_nav">
            <Link href="/wishlist/home">
                <div className="return-order-container">
                    <LogoSecondary className="uil uil-search"></LogoSecondary>
                    <div className="address-temp">
                        <div className="address-welcome">

                            <SecondarySpanColor>
                                {lang.is_eng == true ? ' Public Wishlist' : 'Keinginan Publik'}
                            </SecondarySpanColor>

                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/wishlist/favorite" >
                <div className="return-order-container">
                    <LogoSecondary className="uil uil-heart-alt"></LogoSecondary>
                    <div className="address-temp">
                        <div className="address-welcome">
                            <SecondarySpanColor>
                                {lang.is_eng == true ? ' Favorited Wishlist' : 'Keinginan Favorit'}
                            </SecondarySpanColor>

                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/wishlist/private">
                <div className="return-order-container">
                    <LogoSecondary className="uil uil-keyhole-circle"></LogoSecondary>
                    <div className="address-temp">
                        <div className="address-welcome">
                            <SecondarySpanColor>
                                {lang.is_eng == true ? ' My Wishlist' : 'Keinginan Saya'}
                            </SecondarySpanColor>
                        </div>
                    </div>
                </div>
            </Link>


        </MainDivBg >
    )

}
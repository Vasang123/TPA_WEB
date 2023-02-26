import Link from "next/link"
import { MainDivBg } from "../Other/GlobalComponent"
import { LogoSecondary } from "../Other/LogoComponent"
export default function WishlistNav() {

    return (
        <MainDivBg className="wish-nav">
            <Link href="/wishlist/home">
                <div className="address-container">
                    <LogoSecondary className="uil uil-search"></LogoSecondary>
                    <div className="address-temp">
                        <div className="address-welcome">
                            Public Wishlist
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/wishlist/favorite">
                <div className="address-container">
                    <LogoSecondary className="uil uil-heart-alt"></LogoSecondary>
                    <div className="address-temp">
                        <div className="address-welcome">
                            Favorited Wishlist
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/wishlist/private">
                <div className="address-container">
                    <LogoSecondary className="uil uil-keyhole-circle"></LogoSecondary>
                    <div className="address-temp">
                        <div className="address-welcome">
                            My Wishlist
                        </div>
                    </div>
                </div>
            </Link>


        </MainDivBg >
    )

}
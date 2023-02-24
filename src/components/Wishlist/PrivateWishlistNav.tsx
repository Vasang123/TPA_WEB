import Link from "next/link"
import { MainDivBg } from "../Other/GlobalComponent"
import { LogoSecondary } from "../Other/LogoComponent"
import SearchDisplay from "../SearchBar/SearchDisplay"
import style from '@/styles/Wishlist/wishlisthome.module.scss'

export default function PrivateNav() {
    return (
        <MainDivBg className="nav">
            <Link href="/wishlist/home">
                <div className="address-container">
                    <LogoSecondary className="uil uil-map-marker"></LogoSecondary>
                    <div className="address-temp">
                        <div className="address-welcome">
                            Public Wishlist
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/wishlist/favorite">
                <div className="address-container">
                    <LogoSecondary className="uil uil-map-marker"></LogoSecondary>
                    <div className="address-temp">
                        <div className="address-welcome">
                            Favorited Wishlist
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/wishlist/private">
                <div className="address-container">
                    <LogoSecondary className="uil uil-map-marker"></LogoSecondary>
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
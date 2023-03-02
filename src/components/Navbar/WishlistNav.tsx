import Link from "next/link";
import { SecondaryBoldColor } from "../Other/GlobalComponent";
import { LanguageContext } from "../Language/LanguageContext";
import { useContext } from "react";


export default function WishListNav() {
    const { lang } = useContext(LanguageContext);
    return (
        <Link href="http://localhost:3000/wishlist/home">
            <div className="return-order-container">
                <div className="address-temp">
                    <div className="address-welcome">
                        <>
                            {lang.is_eng == true ? 'View' : 'Lihat'}
                        </>

                    </div>
                    <div className="address-select">
                        {/* <span><SecondaryBoldColor></SecondaryBoldColor></span> */}
                        <span>
                            <SecondaryBoldColor>
                                <>
                                    {lang.is_eng == true ? 'Wishlist' : 'Keinginan'}
                                </>
                            </SecondaryBoldColor>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
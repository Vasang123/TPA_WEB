import Link from "next/link";
import { SecondaryBoldColor } from "../Other/GlobalComponent";


export default function WishListNav() {
    return (
        <Link href="http://localhost:3000/wishlist/home">
            <div className="return-order-container">
                <div className="address-temp">
                    <div className="address-welcome">
                        View
                    </div>
                    <div className="address-select">
                        {/* <span><SecondaryBoldColor></SecondaryBoldColor></span> */}
                        <span><SecondaryBoldColor>Wishlist</SecondaryBoldColor></span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
import Link from "next/link";
import { LogoSecondary } from "../Other/LogoComponent";


export default function CartNav() {
    return (
        <Link href="http://localhost:3000/cart/view">
            <div className="cart-container">
                <div className="cart-temp">
                    <LogoSecondary className="uil uil-shopping-cart-alt"></LogoSecondary>
                </div>
            </div>
        </Link>
    );
}
import Link from "next/link";
import { LogoSecondary } from "../Other/LogoComponent";
import { useEffect, useState } from "react";
import { Cart } from "@/types/models";
import { SecondarySpanColor } from "../Other/GlobalComponent";


export default function CartNav({ user_id }: any) {
    let Total = 0;
    const [carts, setCarts] = useState<Cart[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/cart/view?user_id=${user_id}&is_like=no`);
            const data = await response.json();
            setCarts(data)
        };

        fetchData();
    }, [user_id]);

    if (carts.length > 0) {
        carts.forEach((cart) => {
            if (cart.product?.quantity > 0) {
                Total += cart.product?.price * cart.quantity
            }
        })
    }
    return (
        <Link href="http://localhost:3000/cart/view">
            <div className="cart-container">
                <div className="cart-temp">
                    <LogoSecondary className="uil uil-shopping-cart-alt">
                    </LogoSecondary>
                    {Total > 0 && (
                        <SecondarySpanColor className="total_container">
                            {Total}
                        </SecondarySpanColor>
                    )}
                </div>
            </div>
        </Link>
    );
}
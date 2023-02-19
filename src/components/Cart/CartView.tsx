import { Cart } from "@/types/models";
import { useEffect, useState } from "react"
import style from '@/styles/Cart/cartview.module.scss'
import { Counter } from "../Product/Counter";
import Link from "next/link";
import { ProductDivBg, SecondaryH1Color, SecondarySpanColor } from "../Other/GlobalComponent";
export default function CartDisplay({ user_id }: any) {
    let Total = 0;

    const [carts, setCarts] = useState<Cart[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/cart/view?user_id=${user_id}`);
            const data = await response.json();
            setCarts(data)
        };

        fetchData();
    }, [user_id]);

    if (carts) {
        carts.forEach((cart) => {
            Total += cart.product?.price * cart.quantity
        })
    }
    return (
        <ProductDivBg className={style.cart_list}>
            {carts.length > 0 &&
                carts.map((cart) => (
                    <div key={cart.id} className={style.cart_container}>
                        <Link href={`/products/detail?id=${encodeURIComponent(cart.product_id)}`}>
                            <img src={cart.product?.image} alt="" />
                        </Link>
                        <div className={style.right_container}>
                            <SecondaryH1Color>{cart.product?.name}</SecondaryH1Color>
                            <SecondarySpanColor>Price/item: {cart.product?.price}</SecondarySpanColor>
                            <div className={style.middle}>
                                <div className={style.temp}>
                                    <SecondarySpanColor className={style.quantity_container}>
                                        Quantity:
                                        <Counter count={cart.quantity}
                                            setCount={
                                                (newCount: number) => {
                                                    const updatedCarts = carts.map((c) => {
                                                        if (c.id === cart.id) {
                                                            return { ...c, quantity: newCount };
                                                        }
                                                        return c;
                                                    });
                                                    setCarts(updatedCarts);
                                                }}
                                            limit={cart.product?.quantity}
                                        />
                                    </SecondarySpanColor>
                                </div>
                                <button className={style.delete}>
                                    <i className="uil uil-trash-alt"></i>
                                    Remove
                                </button>
                            </div>
                            <div className={style.bottom}>
                                <SecondarySpanColor>
                                    Subtotal : 
                                    {cart.product?.price * cart.quantity}
                                </SecondarySpanColor>
                            </div>
                        </div>
                    </div>
                ))
            }
            <SecondarySpanColor className={style.total_container}>
                Total Price {Total}
                <button className={style.order}> 
                    Check Out
                </button>
            </SecondarySpanColor>
        </ProductDivBg>
    )
}

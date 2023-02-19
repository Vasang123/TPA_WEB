import { Cart } from "@/types/models";
import { useEffect, useState } from "react"
import style from '@/styles/Cart/cartview.module.scss'
import { Counter } from "../Product/Counter";
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
        <div>
            {carts.length > 0 &&
                carts.map((cart) => (
                    <div key={cart.id} className={style.cart_container}>
                        <img src={cart.product?.image} alt="" />
                        <div className={style.right_container}>
                            <h3>{cart.product?.name}</h3>
                            <div className={style.middle}>
                                <div className={style.temp}>
                                    <p>{cart.product?.price}</p>
                                    <p>
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
                                    </p>
                                </div>
                                <button>Delete</button>
                            </div>
                            <div className={style.bottom}>
                                <p>{cart.product?.price * cart.quantity}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
            Total {Total}
        </div>
    )
}

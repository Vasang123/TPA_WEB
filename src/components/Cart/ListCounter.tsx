import { SecondarySpanColor2 } from "../Other/GlobalComponent";
import style from '@/styles/Product/detail.module.scss'
import { add_cart, cart_quantity_controller, wish_quantity_controller } from "../RequestComponent";
import { Cart, WishlistDetail } from "@/types/models";
import { useEffect } from "react";

export function Counter({
    count,
    setCount,
    limit,
    setCart,
    product_id,
    user_id,
    is_like,
    type,
    wishlist_id }: any) {

    const fetchData = async () => {

        if (count === 0) {
            alert("Minimum Transaction must be 1")
        } else {
            if (type == 1) {
                const newCart: Cart = {
                    id: 0,
                    user_id: user_id,
                    product_id: product_id,
                    quantity: count,
                    is_like: is_like
                };
                await cart_quantity_controller(newCart)
                setCart(newCart);

            } else if (type == 2) {
                console.log("masuk");

                const newWish: WishlistDetail = {
                    id: 0,
                    wishlist_id: wishlist_id,
                    product_id: product_id,
                    quantity: count,
                };
                await wish_quantity_controller(newWish)
                setCart(newWish);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [count]);

    function increment(event: any) {
        event.preventDefault();
        if (count === limit) {
            setCount(limit);
        } else {
            setCount(count + 1);
        }
    }

    function decrement(event: any) {
        event.preventDefault();
        if (count === 1) {
            setCount(1);
        } else {
            setCount(count - 1);
        }
    }

    return (
        <div className={style.incre_container}>
            <button onClick={decrement} className={style.count_button} >-</button>
            <SecondarySpanColor2>{count}</SecondarySpanColor2>
            <button onClick={increment} className={style.count_button} >+</button>
        </div>
    );
}

import { Cart } from "@/types/models";
import { useEffect, useState } from "react"
import style from '@/styles/Cart/cartview.module.scss'
import Link from "next/link";
import { Loading, ProductDivBg, SecondaryH1Color, SecondarySpanColor } from "../Other/GlobalComponent";
import { add_cart, update_cart } from "../RequestComponent";
import { Counter } from "./ListCounter";
function HandleDelete(event: React.MouseEvent<HTMLButtonElement>, user_id: number, product_id: number, carts: Cart[], setCarts: any, is_like = string) {
    event.preventDefault();
    fetch(`http://localhost:8000/api/cart/delete?user_id=${user_id}&product_id=${product_id}&is_like=${is_like}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        if (response.ok) {
            alert("Item Removed")
            const updatedCarts = carts.filter((cart) => cart.product_id !== product_id);
            setCarts(updatedCarts);
        } else {
            alert(response.statusText);
        }

    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
export default function CartDisplay({ user_id, is_like }: any) {

    let Total = 0;
    const [carts, setCarts] = useState<Cart[]>([])
    const [cart, setCart] = useState<Cart>()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/cart/view?user_id=${user_id}&is_like=${is_like}`);
            const data = await response.json();
            setCarts(data)
        };

        fetchData();
    }, [user_id]);

    if (loading) {
        return <Loading>
            <div className="loading_content">
                Loading...
            </div>
        </Loading>;
    }
    if (carts.length > 0) {
        carts.forEach((cart) => {
            Total += cart.product?.price * cart.quantity
        })
    } else {
        return (
            <Loading>
                <div className="loading_content">You Don&apos;t Have any Item</div>
            </Loading>
        )
    }
    const AddItemCart = async (e: any, cart: Cart) => {
        e.preventDefault();
        if (cart.quantity == 0) {
            alert("Minimum Transaction must be 1")
        } else {
            setLoading(true)
            await update_cart(cart);
            setLoading(false);
            const updatedCarts = carts.filter((c) => c.product_id !== cart.product_id);
            setCarts(updatedCarts);
        }
    };

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
                                            setCart={setCart}
                                            user_id={user_id}
                                            product_id={cart.product_id}
                                            is_like={cart.is_like}
                                            type={1}
                                        />
                                    </SecondarySpanColor>
                                </div>

                                {is_like === "no" ? (
                                    <div>
                                    </div>
                                ) : (
                                    <button className={style.add_cart} onClick={(e) => AddItemCart(e, cart)}>
                                        <i className="uil uil-shopping-cart"></i>
                                        Add To Cart
                                    </button>
                                )}
                                <button className={style.delete} onClick={(event) => HandleDelete(event, user_id, cart.product_id, carts, setCarts, is_like)}>
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
            {is_like === "no" ? (
                <SecondarySpanColor className={style.total_container}>
                    Total Price {Total}
                    <button className={style.order}>
                        Check Out
                    </button>
                </SecondarySpanColor>
            ) : (
                <SecondarySpanColor className={style.total_container}>
                    Total Price {Total}
                    <button className={style.order}>
                        Add All Items to Cart
                    </button>
                </SecondarySpanColor>
            )}
        </ProductDivBg>
    )
}

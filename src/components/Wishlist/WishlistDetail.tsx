
import style from '@/styles/Cart/cartview.module.scss'
import { Loading, ProductDivBg, SecondaryH1Color, SecondarySpanColor } from '../Other/GlobalComponent';
import Link from 'next/link';
import { Counter } from '../Cart/ListCounter';
import { useEffect, useState } from 'react';
import { WishlistDetail } from '@/types/models';
import { useRouter } from 'next/router';
function HandleDelete(event: React.MouseEvent<HTMLButtonElement>, wishlist_id: number, product_id: number, carts: WishlistDetail[], setCarts: any) {
    event.preventDefault();
    fetch(`http://localhost:8000/api/wishlist/detail/delete?product_id=${product_id}&wishlist_id=${wishlist_id}`, {
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
export default function ListDisplay() {
    let Total = 0;
    const [list, setList] = useState<WishlistDetail[]>([])
    const [cart, setCart] = useState<WishlistDetail>()
    const router = useRouter();
    let temp;
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/wishlist/detail?wishlist_id=${router.query.q}`);
            const data = await response.json();
            setList(data)
        };

        fetchData();
    }, [router.query.q])
    if (list.length > 0) {
        list.forEach((c) => {
            Total += c.product?.price * c.quantity
            temp = c.wishlist?.user_id
        })
    } else {
        return (
            <Loading>
                <div className="loading_content">No Item in the list</div>
            </Loading>
        )
    }
    return (

        <ProductDivBg className={style.cart_list}>
            {list.length > 0 &&
                list.map((cart) => (
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
                                        {
                                            cart.wishlist?.user_id == parseInt(router.query.user_id) && (
                                                <div>
                                                    Quantity:
                                                    <Counter count={cart.quantity}
                                                        setCount={
                                                            (newCount: number) => {
                                                                const updatedCarts = list.map((c) => {
                                                                    if (c.id === cart.id) {
                                                                        return { ...c, quantity: newCount };
                                                                    }
                                                                    return c;
                                                                });
                                                                setList(updatedCarts);
                                                            }}
                                                        limit={cart.product?.quantity}
                                                        setCart={setCart}
                                                        wishlist_id={cart.wishlist_id}
                                                        product_id={cart.product_id}
                                                        type={2}
                                                    />
                                                </div>

                                            )
                                        }

                                    </SecondarySpanColor>
                                </div>
                                {
                                    cart.wishlist?.user_id == parseInt(router.query.user_id) && (
                                        <button className={style.delete} onClick={(event) => HandleDelete(event, cart.wishlist_id, cart.product_id, list, setList)} >
                                            <i className="uil uil-trash-alt"></i>
                                            Remove
                                        </button>
                                    )
                                }
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
            {
                temp == parseInt(router.query.user_id) ? (
                    <SecondarySpanColor className={style.total_container}>
                        Total Price {Total}
                        <button className={style.order}>
                            Add All Items to Cart
                        </button>
                    </SecondarySpanColor>
                ) : (
                    <SecondarySpanColor className={style.total_container}>
                        Total Price {Total}
                        <button className={style.order}>
                            Duplicate Items into cart
                        </button>
                    </SecondarySpanColor>
                )
            }

        </ProductDivBg >
    )

}
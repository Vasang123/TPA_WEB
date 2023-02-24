
import style from '@/styles/Cart/cartview.module.scss'
import { Loading, ProductDivBg, SecondaryH1Color, SecondarySpanColor } from '../Other/GlobalComponent';
import Link from 'next/link';
import { Counter } from '../Cart/ListCounter';
import { useEffect, useState } from 'react';
import { WishlistDetail } from '@/types/models';
import { useRouter } from 'next/router';
export default function ListDisplay() {
    let Total = 0;
    const [list, setList] = useState<WishlistDetail[]>([])
    const [cart, setCart] = useState<WishlistDetail>()
    const router = useRouter();
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
                                    </SecondarySpanColor>
                                </div>
                                <button className={style.delete} >
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
                    Add All Items to Cart
                </button>
            </SecondarySpanColor>
        </ProductDivBg >
    )

}
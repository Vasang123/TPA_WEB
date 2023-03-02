
import style from '@/styles/Cart/cartview.module.scss'
import { Loading, ProductDivBg, SecondaryH1Color, SecondarySpanColor } from '../Other/GlobalComponent';
import Link from 'next/link';
import { Counter } from '../Cart/ListCounter';
import { useContext, useEffect, useState } from 'react';
import { Cart, Wishlist, WishlistDetail } from '@/types/models';
import { useRouter } from 'next/router';
import AddNote from './Private/WishlistNote';
import InsertComment from '@/components/Wishlist/WishlistReview/Insert';
import ReviewList from './WishlistReview/Show';
import axios from 'axios';
import { add_cart } from '../RequestComponent';
import { LanguageContext } from '../Language/LanguageContext';
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
    const [item, setItem] = useState<Cart>()
    const [note, setNote] = useState('')
    const [wishlist, setWishlist] = useState<Wishlist>()
    const { lang } = useContext(LanguageContext);
    let owner: number;
    let i = 0;
    const router = useRouter();
    let wish_id;
    const DuplicateItem = async (e: any, productId: number, quantity: number) => {
        e.preventDefault();
        const newCart: Cart = {
            id: 0,
            user_id: parseInt(router.query.user_id),
            product_id: productId,
            quantity: quantity,
            is_like: "no"
        };
        await add_cart(newCart)

    }
    const DuplicateAllItem = async () => {
        list.forEach((item) => {
            const newCart: Cart = {
                id: 0,
                user_id: parseInt(router.query.user_id),
                product_id: item.product_id,
                quantity: item.quantity,
                is_like: "no"
            };
            add_cart(newCart)
        });
        router.back()


    }
    const handleAddAllToCart = () => {
        list.forEach((item) => {
            const newCart: Cart = {
                id: 0,
                quantity: item.quantity,
                user_id: owner,
                product_id: item.product_id,
                is_like: "no"
            };
            axios.post('http://localhost:8000/api/wishlist/cart/add', {
                cart: newCart,
                wishlist_id: item.wishlist_id

            })
                .then((response) => {
                    if (i == 0) {
                        alert(response.data.message)
                        i += 1
                    }
                    const updatedList = list.filter((cart) => cart.wishlist_id !== wishlistId || cart.product_id !== productId);
                    setList(updatedList);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        router.back()
    };

    const AddToCart = (event: any, wishlistId: number, productId: number, quantity: number) => {
        const newCart: Cart = {
            id: 0,
            quantity: quantity,
            user_id: owner,
            product_id: productId,
            is_like: "no"
        };
        axios.post('http://localhost:8000/api/wishlist/cart/add', {
            cart: newCart,
            wishlist_id: wishlistId
        })
            .then((response) => {
                alert(response.data.message)
                const updatedList = list.filter((cart) => cart.wishlist_id !== wishlistId || cart.product_id !== productId);
                setList(updatedList);
                // setCart(response.data.cart);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const AddAllItemToWishlist = async () => {
        try {
            wishlist.user_id = parseInt(router.query.user_id)

            const response = await fetch('http://localhost:8000/api/wishlist/duplicate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    wishlist: wishlist,
                    items: list,
                })
            })

            if (response.ok) {
                // Clear the list of items
                setList([])
                alert('Items duplicated successfully')
            } else {
                alert(response)
            }
        } catch (err) {
            console.error(err)
            alert('An error occurred while duplicating items')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/wishlist/detail?wishlist_id=${router.query.q}`);
            const data = await response.json();
            setList(data)

        };
        fetchData();
    }, [router.query.q]);

    useEffect(() => {
        if (Array.isArray(list)) {
            const notes = Array.from(new Set(list.map((c) => c.wishlist?.note).filter((note) => note !== undefined))) as string[];
            const note = notes.length > 0 ? notes.join('') : '';

            setNote(note);
        }
    }, [list]);

    useEffect(() => {
        console.log('Wishlist updated:', wishlist);
    }, [wishlist]);

    if (list.length > 0) {


        list.forEach((c) => {
            const price = c.product?.price;
            if (price !== undefined) {
                Total += price * c.quantity;
                if (wishlist == null) {
                    setWishlist(c.wishlist);
                    // console.log(c.wishlist);
                    // console.log(wishlist);



                }
            }
            wish_id = c.wishlist_id;
            owner = c.wishlist?.user_id;
        });

    } else {
        return (
            <>
                <div>
                    <Loading>
                        <div className="loading_content">No Item in the list</div>
                    </Loading>
                </div>
                <div>
                    {
                        owner && wish_id && (
                            <ReviewList
                                user_id={owner}
                                wishlist_id={wish_id}
                            />
                        )
                    }
                </div>
            </>
        )
    }
    return (

        <ProductDivBg className={style.cart_list}>
            {
                parseInt(router.query.user_id) == owner && (
                    <AddNote
                        user_id={owner}
                        wishlist_id={wish_id}
                        note={note}
                        setNote={setNote} />
                )
            }
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
                                    {
                                        owner == parseInt(router.query.user_id) ? (
                                            <button className={style.add_cart} onClick={event => AddToCart(event, cart.wishlist_id, cart.product_id, cart.quantity)}>
                                                <i className="uil uil-shopping-cart"  ></i>
                                                {lang.is_eng == true ? '  Add To Cart' : 'Masukkan Keranjang'}

                                            </button>
                                        ) : (
                                            <button className={style.add_cart} onClick={event => DuplicateItem(event, cart.product_id, cart.quantity)}>
                                                <i className="uil uil-shopping-cart"  ></i>
                                                {lang.is_eng == true ? '  Add To Cart' : 'Masukkan Keranjang'}
                                            </button>
                                        )
                                    }

                                    <SecondarySpanColor className={style.quantity_container}>
                                        {
                                            cart.wishlist?.user_id == parseInt(router.query.user_id) && (
                                                <div>
                                                    {lang.is_eng == true ? 'Quantity ' : 'Jumlah: '}
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
                                            {lang.is_eng == true ? '  Remove' : ' Hapus'}
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
                owner == parseInt(router.query.user_id) ? (
                    <SecondarySpanColor className={style.total_container}>
                        {lang.is_eng == true ? ' Total Price ' : 'Harga Total '}
                        {Total}
                        <button className={style.order} onClick={handleAddAllToCart}>
                            {lang.is_eng == true ? 'Add All Items to Cart' : 'Masukkan Semua ke Keranjang'}

                        </button>
                    </SecondarySpanColor>
                ) : (
                    <div className={style.detail_button}>
                        <SecondarySpanColor className={style.total_container}>
                            {lang.is_eng == true ? ' Total Price ' : 'Harga Total '}
                            {Total}
                            <button className={style.order} onClick={AddAllItemToWishlist}>
                                {lang.is_eng == true ? ' Duplicate Items into wishlist ' : 'Duplikat barangs ke Keinginan '}

                            </button>
                            <button className={style.order} onClick={DuplicateAllItem}>
                                {lang.is_eng == true ? ' Duplicate Items into cart ' : 'Duplikat barangs ke Keranjang '}
                            </button>
                        </SecondarySpanColor>
                    </div>
                )
            }
            {
                router.query.user_id != owner && owner && wish_id && (
                    <InsertComment
                        user_id={owner}
                        wishlist_id={wish_id} />
                )
            }
            {
                owner && wish_id && (
                    <ReviewList
                        user_id={owner}
                        wishlist_id={wish_id}
                    />
                )
            }
        </ProductDivBg >
    )

}
import { Cart } from "@/types/models";
import { useContext, useEffect, useState } from "react"
import style from '@/styles/Cart/cartview.module.scss'
import Link from "next/link";
import { Loading, MainDivBg, ProductDivBg, SecondaryH1Color, SecondarySpanColor } from "../Other/GlobalComponent";
import { add_cart, handle_cart_later, update_cart } from "../RequestComponent";
import { Counter } from "./ListCounter";
import { WishlistTable } from "./WishlistTable";
import { LanguageContext } from "../Language/LanguageContext";
import Checkout from "./Checkout/Checkout";
import Image from "next/image";
import { useRouter } from "next/router";
function HandleDelete(
    event: React.MouseEvent<HTMLButtonElement>,
    user_id: number,
    product_id: number,
    carts: Cart[],
    setCarts: any,
    is_like: string,) {
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
export default function CartDisplay({ user_id, is_like, later, currUser }: any) {

    let Total = 0;
    const r = useRouter()
    const [carts, setCarts] = useState<Cart[]>([])
    const [cart, setCart] = useState<Cart>()
    const [cartId, setCartId] = useState()
    const [quantity, setQuantity] = useState()
    const [image, setImage] = useState()
    const [productId, setProductId] = useState()
    const [loading, setLoading] = useState(false);
    const { lang } = useContext(LanguageContext);
    const [showTableDialog, setShowTableDialog] = useState(false);
    const [addToBuyLater, setAddToBuyLater] = useState(false);
    const [checkOut, setCheckOut] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/cart/view?user_id=${user_id}&is_like=${is_like}`);
            const data = await response.json();
            setCarts(data)
        };

        fetchData();
    }, [user_id, Total, showTableDialog, quantity, is_like, addToBuyLater, r]);
    const HandleBuyLater = async (e: Event, product_id: number, is_like: string) => {
        e.preventDefault()
        setAddToBuyLater(true)
        const newCart: Cart = {
            id: 0,
            product_id: product_id,
            is_like: is_like,
            user_id: user_id,
        }
        await handle_cart_later(newCart)
        r.push("/cart/view")
        setAddToBuyLater(false)
    }
    const openCheckOut = async (e: Event) => {
        e.preventDefault()
        setCheckOut(true)
    }
    if (loading) {
        return <Loading>
            <div className="loading_content">
                Loading...
            </div>
        </Loading>;
    }
    if (carts.length > 0) {
        carts.forEach((cart) => {
            if (cart.product?.quantity > 0 && cart.is_like == "no") {
                Total += cart.product?.price * cart.quantity
            }
        })
    } else {
        return (
            <ProductDivBg className="empty_cart">
                <SecondarySpanColor >You Don&apos;t Have any Item</SecondarySpanColor>
            </ProductDivBg>

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
    const openManageDialog = async (e: any, cart_id: any, product_id: any, image_ref: any, quantity_ref: any) => {
        e.preventDefault();
        setCartId(cart_id)
        setImage(image_ref)
        setQuantity(quantity_ref)
        setProductId(product_id)
        setShowTableDialog(true)
    }
    return (
        <ProductDivBg className={style.cart_list}>
            {carts.length > 0 &&
                carts.map((cart) => (

                    <div key={cart.id} className={style.cart_container}>
                        <Link href={`/products/detail?id=${encodeURIComponent(cart.product_id)}`}>
                            <Image src={cart.product?.image} alt="" width={500} height={500} className={style.p_image} />
                        </Link>
                        <div className={style.right_container}>
                            <SecondaryH1Color>{cart.product?.name}</SecondaryH1Color>
                            <SecondarySpanColor>
                                {lang.is_eng == true ? 'Price/item: ' : 'Harga/Barang: '}
                                {cart.product?.price}
                            </SecondarySpanColor>
                            <div className={style.middle}>
                                <div className={style.temp}>
                                    <SecondarySpanColor className={style.quantity_container}>
                                        {
                                            cart.product?.quantity > 0 ? (
                                                <>
                                                    {lang.is_eng == true ? 'Quantity: ' : 'Jumlah: '}

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
                                                </>
                                            ) : (
                                                <div className="out_of_stock">
                                                    <h4>
                                                        {lang.is_eng == true ? 'Out Of Stock' : 'Stok Habis'}
                                                    </h4>
                                                </div>
                                            )
                                        }

                                    </SecondarySpanColor>
                                </div>

                                {is_like === "no" ? (
                                    <div className="cart">
                                        {
                                            cart.product?.quantity > 0 ? (
                                                <div className="temp3">
                                                    <button className={style.wish_button}
                                                        onClick={(e) => openManageDialog(e, cart.id, cart.product_id, cart.product?.image, cart.quantity)}>
                                                        <i className="uil uil-heart"></i>
                                                        {lang.is_eng == true ? ' Add To Wishlist' : ' Masukkan Keinginan'}

                                                    </button>
                                                    <button className={style.wish_button}
                                                        onClick={(e) => HandleBuyLater(e, cart.product_id, "yes")}>
                                                        <i className="uil uil-layer-group"></i>
                                                        {lang.is_eng == true ? ' Add To Buy Later' : ' Masukkan Ke Belanja Nanti'}

                                                    </button>

                                                </div>
                                            ) : (
                                                <div className="out_of_stock">

                                                </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div className="cart">
                                        {later == 1 ? (
                                            <button className={style.add_cart} onClick={(e) => HandleBuyLater(e, cart.product_id, "no")}>
                                                <i className="uil uil-shopping-cart"></i>
                                                {lang.is_eng == true ? 'Add To My Cart' : 'Masukkan ke Keranjang Saya'}
                                            </button>
                                        ) : (
                                            <button className={style.add_cart} onClick={(e) => AddItemCart(e, cart)}>
                                                <i className="uil uil-shopping-cart"></i>
                                                {lang.is_eng == true ? 'Add To Cart' : 'Masukkan Keranjang'}
                                            </button>
                                        )
                                        }
                                    </div>
                                )}
                                <button className={style.delete} onClick={(event) => HandleDelete(event, user_id, cart.product_id, carts, setCarts, is_like)}>
                                    <i className="uil uil-trash-alt"></i>
                                    {lang.is_eng == true ? 'Remove' : 'Hapus'}
                                </button>
                            </div>
                            <div className={style.bottom}>
                                {
                                    cart.product?.quantity > 0 ? (
                                        <SecondarySpanColor>
                                            Subtotal :
                                            {cart.product?.price * cart.quantity}
                                        </SecondarySpanColor>
                                    ) : (
                                        <div>

                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                ))
            }
            {
                is_like === "no" ? (
                    <SecondarySpanColor className={style.total_container}>
                        {lang.is_eng == true ? 'Total Price ' : 'Total Harga '}

                        {Total}
                        <button className={style.order} onClick={openCheckOut}>
                            {lang.is_eng == true ? 'Check Out' : 'Beli'}

                        </button>
                    </SecondarySpanColor>
                ) : (
                    <>
                    </>
                    // <SecondarySpanColor className={style.total_container}>
                    //     Total Price {Total}
                    //     <button className={style.order}>
                    //         {lang.is_eng == true ? 'Add All Items to Cart' : 'Masukkan Semua ke Keranjang'}

                    //     </button>
                    // </SecondarySpanColor>
                )
            }
            {
                showTableDialog && (
                    <WishlistTable
                        user_id={user_id}
                        setShowTableDialog={setShowTableDialog}
                        quantity={quantity}
                        product_id={productId}
                        product_image={image}
                        cart_id={cartId}
                        carts={carts}
                        setCarts={setCarts}
                    />
                )
            }
            {
                checkOut && (
                    <Checkout
                        currUser={currUser}
                        Total={Total}
                        closeModal={setCheckOut}
                        carts={carts}

                    />
                )
            }
        </ProductDivBg >
    )
}

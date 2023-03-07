import { useContext, useEffect, useState } from "react";
import { Loading, ProductDivBg, SecondaryH1Color, SecondarySpanColor } from "../Other/GlobalComponent";
import style from '@/styles/Product/modal.module.scss'
import { Cart } from "@/types/models";
import { useRouter } from "next/router";
import { LanguageContext } from "../Language/LanguageContext";
import { add_cart } from "../RequestComponent";
import { Counter } from "../Cart/ListCounter";
import ReactDOM from 'react-dom';
import { WishlistTable } from "./WishlistTable";
import { LogoSecondary } from "../Other/LogoComponent";
import Image from "next/image";

export default function ProductModal({ product, setmodalDialog, user_id }: any) {

    const modalRoot = document.getElementById('modal-root');
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState<Cart>();
    const [showTableDialog, setShowTableDialog] = useState(false);
    const { lang } = useContext(LanguageContext);
    let i = 0
    const r = useRouter()
    const [counter, setCounter] = useState(1)
    useEffect(() => {
        console.log(product?.user?.isBanned);

        if (product?.user?.isBanned == "yes" && i == 0) {
            setLoading(true)
            i += 3
            alert("This Shop Has Been Banned")
            setmodalDialog(false)
            setLoading(false)
            r.back()
        }
    }, [product])
    if (loading) {
        return (
            <Loading>
                <div className="loading_content">
                    Loading...
                </div>
            </Loading>
        )

    }
    const Login = (e: any) => {
        r.push('/signin')
    }
    const openManageDialog = async (e: any) => {
        e.preventDefault();

        setShowTableDialog(true)
    }
    const closeModal = async (e: any) => {
        e.preventDefault();
        setmodalDialog(false)
    }
    const HandleShopPage = (event: any, user_id: number) => {
        event.preventDefault();
        // const query = event.target.elements.search.value;
        r.push(`/shop/home?user_id=${encodeURIComponent(user_id)}`);
    };
    const HandleSubmit = async (e: any, is_like: any) => {
        e.preventDefault();
        if (counter == 0) {
            alert("Minimum Transaction must be 1")
        } else {
            setLoading(true);
            if (is_like == "yes") {
                setCounter(0)
            }
            const newCart: Cart = {
                id: 0,
                user_id: user_id,
                product_id: product.id,
                quantity: counter,
                is_like: is_like
            };

            await add_cart(newCart)

            setCart(newCart);
            // Set loading state to false
            setLoading(false);
        }
    };
    if (modalRoot) {
        return (
            <div className={style.bg}>
                <ProductDivBg className={style.container}>
                    <div className={style.close_sym} onClick={closeModal}>
                        <i className="uil uil-times-circle"></i>
                    </div>
                    <div className={style.left}>
                        <Image src={product.image} alt={product.name} width={1000}
                            height={1000} />
                    </div>
                    <ProductDivBg className={style.right_detail}>
                        <SecondaryH1Color>{product.name}</SecondaryH1Color>
                        <SecondarySpanColor className="primo">
                            {lang.is_eng == true ? ' Price: ' : 'Harga: '}
                            <Image src="https://firebasestorage.googleapis.com/v0/b/tpa-web-4d910.appspot.com/o/images%2FItem_Genesis_Crystal.webp?alt=media&token=040f3bc6-c3de-4e29-baee-5b8e9275d732"
                                alt=""
                                width={30}
                                height={30} />
                            {product.price}
                        </SecondarySpanColor>
                        <div className={style.detail}>
                            <div className={style.top}>
                                <SecondarySpanColor onClick={(event: any) => HandleShopPage(event, product.user_id)} className="shop_entrance" >
                                    {lang.is_eng == true ? 'Shop: ' : 'Toko: '}
                                    {product.user?.firstName}
                                </SecondarySpanColor>
                                <SecondarySpanColor>
                                    Brand: {product.brand.name}
                                </SecondarySpanColor>
                            </div>
                            <div className={style.mid}>
                                <SecondarySpanColor>
                                    {lang.is_eng == true ? 'Category: ' : 'Kategori: '}
                                    {product.category.name}
                                </SecondarySpanColor>
                                <SecondarySpanColor>
                                    {lang.is_eng == true ? 'Stock: ' : 'Stok: '}
                                    {product.quantity} {lang.is_eng == true ? 'Left ' : 'Tersisa '}
                                </SecondarySpanColor>
                            </div>
                            <div className={style.bottom}>
                                <SecondarySpanColor> {lang.is_eng == true ? 'Sold: ' : 'Terjual: '} {product.sold}</SecondarySpanColor>
                                <SecondarySpanColor className={style.description}>
                                    {lang.is_eng == true ? 'Description: ' : 'Deskripsi: '}

                                    {product.description}</SecondarySpanColor>
                            </div>
                            {user_id == null ? (
                                <div className={style.button_container}>
                                    <button className={style.wish_button} onClick={Login} type="button">
                                        <i className="uil uil-signin"></i>
                                        {lang.is_eng == true ? 'Login To Buy Item' : 'Masuk Untuk Membeli Barang'}

                                    </button>
                                </div>
                            ) : (
                                <>
                                    {
                                        product.quantity > 0 ? (
                                            <div className={style.button_container}>
                                                <div className={style.cart_container}>
                                                    <button type="button"
                                                        className={style.cart_button}
                                                        onClick={(e) => HandleSubmit(e, "no")}
                                                    >
                                                        <i className="uil uil-shopping-cart-alt"></i>
                                                        {lang.is_eng == true ? 'Add To Cart' : 'Masukkan Keranjang'}


                                                    </button>
                                                    <Counter count={counter} setCount={setCounter} limit={product.quantity} />
                                                </div>
                                                <button className={style.wish_button} type="button"
                                                    onClick={openManageDialog}>
                                                    <i className="uil uil-heart"></i>
                                                    {lang.is_eng == true ? 'Add To Wishlist' : 'Masukkan Keinginan'}

                                                </button>
                                            </div>
                                        ) : (
                                            <div className="out_of_stock">
                                                <h1>
                                                    {lang.is_eng == true ? 'Out Of Stock' : 'Stok Habis'}
                                                </h1>
                                            </div>
                                        )
                                    }
                                </>
                            )
                            }

                        </div>
                    </ProductDivBg>
                </ProductDivBg>
                {
                    showTableDialog && (
                        <WishlistTable
                            user_id={user_id}
                            setShowTableDialog={setShowTableDialog}
                            quantity={counter}
                            product_id={product.id}
                            product_image={product.image}
                        />
                    )
                }
            </div>
        )
    }
}
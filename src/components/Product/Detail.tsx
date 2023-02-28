import { Cart, Product } from "@/types/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from '@/styles/Product/detail.module.scss'
import { Loading, ProductDivBg } from "../Other/GlobalComponent";
import { SecondaryH1Color } from "../Other/GlobalComponent";
import { SecondarySpanColor } from "../Other/GlobalComponent";
import { Counter } from "./Counter";
import { add_cart } from "../RequestComponent";
import ReviewList from "../Review/Show";
import InsertComment from "../Review/Insert";
import { WishlistTable } from "./WishlistTable";

function ProductView({ product, user_id }: any) {
    const [loading, setLoading] = useState(false);
    const [showTableDialog, setShowTableDialog] = useState(false);
    const [cart, setCart] = useState<Cart>();
    const r = useRouter();
    const [counter, setCounter] = useState(0)
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
    const openManageDialog = async (e: any) => {
        e.preventDefault();
        setShowTableDialog(true)
    }
    return (
        product && (
            <div className={style.product_page}>
                <div className={style.product_detail}>
                    <div className={style.left_detail}>
                        <img src={product.image} alt="" />
                    </div>
                    <div className={style.right_detail}>
                        <SecondaryH1Color>{product.name}</SecondaryH1Color>
                        <SecondarySpanColor>Rp. {product.price}</SecondarySpanColor>
                        <div className={style.detail}>
                            <div className={style.top}>
                                <SecondarySpanColor>Shop: {product.user?.firstName}</SecondarySpanColor>
                                <SecondarySpanColor>Brand: {product.brand.name}</SecondarySpanColor>
                            </div>
                            <div className={style.mid}>
                                <SecondarySpanColor>Category: {product.category.name}</SecondarySpanColor>
                                <SecondarySpanColor>Stock: {product.quantity} Left</SecondarySpanColor>
                            </div>
                            <SecondarySpanColor>Rating: {product.rating}/5.0</SecondarySpanColor>
                            <SecondarySpanColor className={style.description}>Description: {product.description}</SecondarySpanColor>
                            {user_id === null ? (
                                <div className={style.button_container}>
                                    <button className={style.wish_button} onClick={Login}>
                                        <i className="uil uil-signin"></i>
                                        Login To Buy Item
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {
                                        product.quantity > 0 ? (
                                            <div className={style.button_container}>
                                                <div className={style.cart_container}>
                                                    <button
                                                        className={style.cart_button}
                                                        onClick={(e) => HandleSubmit(e, "no")}
                                                    >
                                                        <i className="uil uil-shopping-cart-alt"></i>
                                                        Add To Cart
                                                    </button>
                                                    <Counter count={counter} setCount={setCounter} limit={product.quantity} />
                                                </div>
                                                <button className={style.wish_button}
                                                    onClick={openManageDialog}>
                                                    <i className="uil uil-heart"></i>
                                                    Add To Wishlist
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="out_of_stock">
                                                <h1>Out Of Stock</h1>
                                            </div>
                                        )
                                    }
                                </>
                            )
                            }

                        </div>
                    </div>
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
                <InsertComment user_id={user_id} product_id={product.id} />
                <ReviewList product_id={product.id} user_id={user_id} />
            </div>
        )

    );
}

export default function DetailPage({ user_id }: any) {
    const router = useRouter();
    const id = router.query.id;
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(false);
    let i = 0
    useEffect(() => {
        const fetchResults = async () => {
            const res = await fetch(`http://localhost:8000/api/product/detail?id=${id}`);
            const data = await res.json();
            console.log(data);

            setProduct(data)
        };

        if (id) {
            fetchResults();
        }
    }, [id]);

    useEffect(() => {
        if (product?.user?.isBanned == "yes") {
            setLoading(true)
            i += 3
            alert("This Shop Has Been Banned")
            router.push("/")
        }
    }, [product])

    if (loading) {
        return (<Loading>
            <div className="loading_content">
                Loading...
            </div>
        </Loading>)
    }
    return (
        <ProductDivBg className={style.detail_container}>
            <ProductView product={product} user_id={user_id} />
            <div className={style.review_container}>

            </div>
        </ProductDivBg>
    )
}

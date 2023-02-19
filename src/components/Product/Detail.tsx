import { Cart, Product } from "@/types/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from '@/styles/Product/detail.module.scss'
import { Loading, ProductDivBg } from "../Other/GlobalComponent";
import { SecondaryH1Color } from "../Other/GlobalComponent";
import { SecondarySpanColor } from "../Other/GlobalComponent";
import { Counter } from "./Counter";
import { add_cart } from "../RequestComponent";

function ProductView({ product, user_id }: any) {
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState<Cart>();
    const r = useRouter();
    const [counter, setCounter] = useState(0)
    if (loading) {
        return <Loading>
            <div className="loading_content">
                Loading...
            </div>
        </Loading>;
    }
    const Login = (e: any) => {
        r.push('/signin')
    }
    const HandleSubmit = async (e: any, is_like:any) => {
        e.preventDefault();
        if (counter == 0 && is_like == "no") {
            alert("Minimum Transaction must be 1")
        } else {
            setLoading(true);
            if (is_like == "yes"){
                setCounter(0)
            }
            const newCart: Cart = {
                id: 0,
                user_id: user_id,
                product_id: product.id,
                quantity: counter,
                is_like: is_like
            };
            setCart(newCart);
            
            await add_cart(cart)

            // Set loading state to false
            setLoading(false);
        }
    };

    return (
        product && (
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
                                <div className={style.button_container}>
                                    <div className={style.cart_container}>
                                        <button
                                            className={style.cart_button}
                                            onClick={(e)=>HandleSubmit(e,"no")}
                                        >
                                            <i className="uil uil-shopping-cart-alt"></i>
                                            Add To Cart
                                        </button>
                                        <Counter count={counter} setCount={setCounter} limit={product.quantity} />
                                    </div>
                                    <button className={style.wish_button}
                                    onClick={(e)=>HandleSubmit(e,"yes")}>
                                        <i className="uil uil-heart"></i>
                                        Add To Wishlist
                                    </button>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        )
    );
}

export default function DetailPage({ user_id }: any) {
    const router = useRouter();
    const id = router.query.id;
    const [product, setProduct] = useState<Product>();
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

    return (
        <ProductDivBg className={style.detail_container}>
            <ProductView product={product} user_id={user_id} />
            <div className={style.review_container}>

            </div>
        </ProductDivBg>
    )
}

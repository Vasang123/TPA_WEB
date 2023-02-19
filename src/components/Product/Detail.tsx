import { Product } from "@/types/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from '@/styles/Product/detail.module.scss'
import { MainDivBg, ProductDivBg, SecondarySpanColor2 } from "../Other/GlobalComponent";
import { SecondaryH1Color } from "../Other/GlobalComponent";
import { SecondarySpanColor } from "../Other/GlobalComponent";

function Counter({ count, setCount, limit }: any) {

    function increment() {
        if(count == limit){
            setCount(limit);
        }else{
            setCount(count + 1);
        }
    }

    function decrement() {
        if(count == 0){
            setCount(0);
        }else{
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

function ProductView({ product }: any) {
    const [counter, setCounter] = useState(0)
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
                        <div className={style.button_container}>
                            <div className={style.cart_container}>
                                <button className={style.cart_button}>
                                    <i className="uil uil-shopping-cart-alt"></i>
                                    Add To Cart
                                </button>
                                <Counter count={counter} setCount={setCounter} limit={product.quantity} />
                            </div>

                            <button className={style.wish_button}>
                                <i className="uil uil-heart"></i>
                                Add To Wishlist
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    );
}
export default function DetailPage() {
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
            <ProductView product={product} />
            <div className={style.review_container}>

            </div>
        </ProductDivBg>
    )
}

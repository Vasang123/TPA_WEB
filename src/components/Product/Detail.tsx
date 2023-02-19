import { Product } from "@/types/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from '@/styles/Product/detail.module.scss'
import { MainDivBg } from "../Other/GlobalComponent";

export default function Detail() {
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
        <div className={style.detail_container}>
            {product && (
                <div className={style.product_detail}>
                    <div className={style.left_detail}>
                        <img src={product.image} alt="" />
                    </div>
                    <div className={style.right_detail}>
                        <h1>{product.name}</h1>
                        <p>Rp. {product.price}</p>
                        <div className={style.detail}>
                            <div className={style.top}>
                                <p>Shop: {product.user?.firstName}</p>
                                <p>Brand: {product.brand.name}</p>
                            </div>
                            <div className={style.mid}>
                                <p>Category: {product.category.name}</p>
                                <p>Stock: {product.quantity} Left</p>
                            </div>
                            <p>Rating: {product.rating}/5.0</p>
                            <p className={style.description}>Description: {product.description}</p>
                            <div className={style.button_container}>
                                <button className={style.cart_button}>
                                    <i className="uil uil-shopping-cart-alt"></i> 
                                    Add To Cart 
                                </button>
                                <button className={style.wish_button}>
                                    <i className="uil uil-heart"></i> 
                                    Add To Wishlist 
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            <div className={style.review_container}>

            </div>
        </div>
    )
}

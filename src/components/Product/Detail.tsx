import { Cart, Product } from "@/types/models";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from '@/styles/Product/detail.module.scss'
import { Loading, ProductDivBg } from "../Other/GlobalComponent";
import { SecondaryH1Color } from "../Other/GlobalComponent";
import { SecondarySpanColor } from "../Other/GlobalComponent";
import { Counter } from "./Counter";
import { add_cart } from "../RequestComponent";
import ReviewList from "../Review/Show";
import InsertComment from "../Review/Insert";
import { WishlistTable } from "./WishlistTable";
import { LanguageContext } from "../Language/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { Paginate } from "../Wishlist/WhislistComponent";
import { HomeItem } from "./Product";

function ProductView({ product, user_id }: any) {
    const [loading, setLoading] = useState(false);
    const [showTableDialog, setShowTableDialog] = useState(false);
    const [cart, setCart] = useState<Cart>();
    const { lang } = useContext(LanguageContext);
    const r = useRouter();
    const [counter, setCounter] = useState(0)
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const [category_id, setcategory_id] = useState(product.category.id)
    useEffect(() => {
        const fetchResults = async () => {
            const res = await fetch(`http://localhost:8000/api/related?category_id=${product.category_id}&page=${currentPage}`);
            const data = await res.json();
            console.log(res);

            setProducts(data.products);
            setTotalPages(data.totalPages);
            if (currentPage > data.totalPages) {
                setCurrentPage(data.totalPages);
            }

        };

        if (product) {
            console.log(product.category_id);

            fetchResults();
        }

    }, [product, currentPage]);
    if (loading) {
        return (
            <Loading>
                <div className="loading_content">
                    Loading...
                </div>
            </Loading>
        )

    }
    const HandleShopPage = (event: any, user_id: number) => {
        event.preventDefault();
        // const query = event.target.elements.search.value;
        r.push(`/shop/home?user_id=${encodeURIComponent(user_id)}`);
    };
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
    const prev = () => {
        setCurrentPage(currentPage - 1);
    };

    const next = () => {
        setCurrentPage(currentPage + 1);
    };
    return (
        product && (
            <div className={style.product_page}>
                <div className={style.product_detail}>
                    <div className={style.left_detail}>
                        <Image src={product.image} alt={product.name} width={1000}
                            height={1000} />
                    </div>
                    <div className={style.right_detail}>
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
                                <SecondarySpanColor onClick={(event) => HandleShopPage(event, product.user_id)} className="shop_entrance " >
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
                            {user_id === null ? (
                                <div className={style.button_container}>
                                    <button className={style.wish_button} onClick={Login}>
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
                                                    <button
                                                        className={style.cart_button}
                                                        onClick={(e) => HandleSubmit(e, "no")}
                                                    >
                                                        <i className="uil uil-shopping-cart-alt"></i>
                                                        {lang.is_eng == true ? 'Add To Cart' : 'Masukkan Keranjang'}


                                                    </button>
                                                    <Counter count={counter} setCount={setCounter} limit={product.quantity} />
                                                </div>
                                                <div className={style.temp1}>

                                                    <button className={style.wish_button}
                                                        onClick={openManageDialog}>
                                                        <i className="uil uil-heart"></i>
                                                        {lang.is_eng == true ? 'Add To Wishlist' : 'Masukkan Keinginan'}

                                                    </button>
                                                </div>
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
                <div>
                    <HomeItem products={products} type={1} />
                    <Paginate
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevPage={prev}
                        onNextPage={next}
                    />

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

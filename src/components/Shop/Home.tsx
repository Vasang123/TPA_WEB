import style from '@/styles/Shop/home.module.scss'
import { BaseBackgroundColor, MainDivBg, SecondaryH1Color, SecondaryLinkColor4, SecondarySpanColor } from '../Other/GlobalComponent'
import { useRouter } from 'next/router';
import { Category, Product, Shop } from '@/types/models';
import { useEffect, useRef, useState } from 'react';
import { HomeItem } from '../Product/Product';
import UpdateNameModal from './Seller/UpdateNameAndBanner';
import UpdateHomeModal from './Seller/UpdateNameAndBanner';
import Image from 'next/image';

export default function ShopHome({ currUser }: any) {
    // console.log(currUser);

    const router = useRouter();
    const [openEditNameDialog, setopenEditNameDialog] = useState(false)
    const [products, setProducts] = useState<Product[]>([]);
    const [shop, setShop] = useState<Shop>();
    const [uniqueCategories, setUniqueCategories] = useState<Category[]>([]);
    const [uniqueCats, setUniqueCats] = useState<Category[]>([]);
    const [type, setType] = useState(0)
    useEffect(() => {
        const fetchResults = async () => {
            const res = await fetch(`http://localhost:8000/api/shop/home?user_id=${router.query.user_id}`);
            const data = await res.json();

            setProducts(data.products);
            setShop(data.shop);
            // console.log(data);
            if (data.message == "No products found") {

            } else {

                data.products.forEach((product: Product) => {
                    if (!uniqueCats.find(cate => cate.id === product.category_id)) {
                        uniqueCats.push({
                            id: product.category_id,
                            name: product.category.name
                        });
                    }
                });
            }

            setUniqueCategories(uniqueCats);
        };

        if (router.query.user_id) {
            fetchResults();
        }

    }, [router.query.user_id, shop, products]);
    const changeToProducts = async (e: any, target: number) => {
        e.preventDefault()
        router.push({
            pathname: '/shop/products',
            query: {
                user_id: router.query.user_id,
                category_id: target,
                // uniqueCategories: JSON.stringify(uniqueCategories)
            }
        });
    }
    const shownAlertRef = useRef(false);

    useEffect(() => {
        if (shop && shop.user?.isBanned === "yes" && !shownAlertRef.current) {
            alert("This Shop is Banned");
            router.push("/");
            shownAlertRef.current = true;
        }
    }, [shop, router]);


    useEffect(() => {

        if (shop && shop.user?.isBanned == "yes" && i == 1) {
            alert("This Shop is Banned")
            router.push('/')
            setI(0)
        }
    }, [router.query.user_id]);


    const openNameDialog = async (type: any) => {
        setType(type)
        setopenEditNameDialog(true)
    }
    const closeNameDialog = async () => {
        setopenEditNameDialog(false)
    }
    return (
        <BaseBackgroundColor className={style.home_page}>
            <BaseBackgroundColor className={style.shop_name}>
                <SecondaryH1Color className={style.h1}>
                    {
                        shop ? (
                            <div>
                                {shop.user?.firstName}
                            </div>
                        ) : (
                            <div>
                                No Name
                            </div>
                        )
                    }
                    {
                        currUser.id == router.query.user_id ? (
                            <div className={style.edit_container}>

                                <button onClick={() => openNameDialog(1)}>
                                    <i className="uil uil-edit-alt"></i>
                                </button>
                            </div>
                        ) : (
                            <>  </>
                        )
                    }
                </SecondaryH1Color>
            </BaseBackgroundColor>
            <div className={style.shop_banner}>
                {
                    shop?.image != '' ? (
                        <Image src={shop?.image} alt="123" width={1000} height={1000} />
                    ) : (
                        <Image src="https://firebasestorage.googleapis.com/v0/b/tpa-web-4d910.appspot.com/o/images%2Fsatu.png?alt=media&token=82ebbddc-2bdf-4917-b128-4acb9e27c464" alt="123" width={1000} height={1000} />
                    )

                }{
                    currUser.id == router.query.user_id ? (
                        <div className={style.edit_container}>
                            <div className={style.button_container}>
                                <button onClick={() => openNameDialog(2)}>
                                    Change Image
                                </button>

                            </div>
                        </div>
                    ) : (
                        <>  </>
                    )
                }
            </div>
            <div className={style.content}>
                <div className={style.cate_title}>
                    <SecondaryH1Color>
                        Category List
                    </SecondaryH1Color>
                </div>
                <div className={style.category}>
                    {
                        uniqueCategories && (
                            uniqueCategories.map((category) => (
                                <div key={category.id}>
                                    <SecondaryLinkColor4 href="/" className={style.category_container} onClick={(e: Event) => changeToProducts(e, category.id)}>
                                        <SecondarySpanColor>
                                            {category.name}
                                        </SecondarySpanColor>
                                    </SecondaryLinkColor4>
                                </div>
                            ))
                        )
                    }
                </div>
                <div className={style.sort_title}>
                    <SecondaryH1Color>
                        Sort Product
                    </SecondaryH1Color>
                </div>
                <div className={style.sort}>
                    <button>Total Sold</button>
                    <button>Price</button>
                    <button>Rating</button>
                    <button>Rating Count</button>
                </div>
                <div className={style.list}>
                    {
                        products ? (

                            <HomeItem products={products} type={1} />
                        ) : (
                            <BaseBackgroundColor>
                            </BaseBackgroundColor>
                        )
                    }
                </div>
            </div>
            {
                shop?.user && (
                    <>
                        {
                            openEditNameDialog && (
                                <UpdateHomeModal
                                    user={currUser}
                                    currShopName={shop.user?.firstName}
                                    closeNameDialog={closeNameDialog}
                                    currShopId={shop.user_id}
                                    type={type}
                                />
                            )
                        }
                    </>

                )
            }

        </BaseBackgroundColor >
    )
}
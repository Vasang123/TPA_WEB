import { Shop } from "@/types/models"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { BaseBackgroundColor, SecondaryH1Color, SecondarySpanColor } from "../Other/GlobalComponent"
import style from '@/styles/Shop/general.module.scss'
import UpdateHomeModal from "./Seller/UpdateNameAndBanner"

export default function ShopAbout({ currUser }: any) {
    const [totalSold, settotalSold] = useState(0)
    const [averageRating, setaverageRating] = useState(0)
    const [shop, setShop] = useState<Shop>()
    const router = useRouter()
    const [aboutDialog, setAboutDialog] = useState(false)
    const [type, setType] = useState(false)
    const openAboutDialog = async (type: any) => {
        setType(type)
        setAboutDialog(true)
    }
    const closeAboutDialog = async (type: any) => {
        setAboutDialog(false)
    }
    useEffect(() => {
        const fetchResults = async () => {
            const res = await fetch(`http://localhost:8000/api/shop/about?shop_id=${router.query.user_id}`)
            const data = await res.json();
            // console.log(data);


            setShop(data.shop)
            settotalSold(data.totalSold)
            setaverageRating(data.averageRatings)
        };

        if (router.query.user_id) {
            fetchResults();
        }

    }, [router.query.user_id, aboutDialog]);
    const shownAlertRef = useRef(false);
    useEffect(() => {
        const checkBan = async () => {
            const res = await fetch(`http://localhost:8000/api/shop/ban?user_id=${router.query.user_id}`)
            const data = await res.json();
            console.log(data.message);

            if (data.message == "This Shop is Banned") {
                alert("This Shop is Banned");
                router.push("/");
                shownAlertRef.current = true;
            }
        }
        checkBan()
    }, [router.query.user_id, router]);
    return (
        <BaseBackgroundColor className="about_us">
            <div className="about_container">

                <div className="left_about">
                    <div className="left_title">

                        <SecondaryH1Color>About Us </SecondaryH1Color>
                        {
                            shop?.user_id == router.query.user_id ? (
                                <div className="edit_container">

                                    <button onClick={() => openAboutDialog(3)}>
                                        <i className="uil uil-edit-alt"></i>
                                    </button>
                                </div>
                            ) : (
                                <>  </>
                            )
                        }
                    </div>
                    <SecondarySpanColor>{totalSold && totalSold} Sales</SecondarySpanColor>
                    <br />
                    <SecondarySpanColor> Avg Reviews : {averageRating && averageRating}</SecondarySpanColor>
                </div>
                <SecondarySpanColor> {shop && shop.about}</SecondarySpanColor>
            </div>
            {
                shop?.user && (
                    <>
                        {
                            aboutDialog && (
                                <UpdateHomeModal
                                    user={currUser}
                                    currShopName={shop.user?.firstName}
                                    closeNameDialog={closeAboutDialog}
                                    currShopId={shop.user_id}
                                    currShopAbout={shop.about}
                                    type={type}
                                />
                            )
                        }
                    </>

                )
            }

        </BaseBackgroundColor>
    )
}
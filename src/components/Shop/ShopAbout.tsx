import { Shop } from "@/types/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BaseBackgroundColor, SecondaryH1Color, SecondarySpanColor } from "../Other/GlobalComponent"


export default function ShopAbout() {
    const [totalSold, settotalSold] = useState(0)
    const [averageRating, setaverageRating] = useState(0)
    const [shop, setShop] = useState<Shop>()
    const router = useRouter()
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

    }, [router.query.user_id]);
    return (
        <BaseBackgroundColor className="about_us">
            <div className="about_container">

                <div className="left_about">

                    <SecondaryH1Color>About Us </SecondaryH1Color>
                    <SecondarySpanColor>{totalSold && totalSold} Sales</SecondarySpanColor>
                    <br />
                    <SecondarySpanColor> Avg Reviews : {averageRating && averageRating}</SecondarySpanColor>
                </div>
                <SecondarySpanColor> {shop && shop.about}s</SecondarySpanColor>
            </div>


        </BaseBackgroundColor>
    )
}
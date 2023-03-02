import { useRouter } from "next/router";
import { MainDivBg, SecondarySpanColor } from "../Other/GlobalComponent";
import { LogoSecondary } from "../Other/LogoComponent";



export default function ShopNav() {
    const router = useRouter()
    console.log("Router", router.query.user_id);

    const changeToHome = async (e: any) => {
        e.preventDefault()
        router.push(`/shop/home?user_id=${router.query.user_id}`)
    }
    const changeToProduct = async (e: any) => {
        e.preventDefault()
        router.push(`/shop/products?user_id=${router.query.user_id}`)
    }
    const changeToReview = async (e: any) => {
        e.preventDefault()
        router.push(`/shop/reviews?user_id=${router.query.user_id}`)
    }
    const changeToAbout = async (e: any) => {
        e.preventDefault()
        router.push(`/shop/about?user_id=${router.query.user_id}`)
    }
    return (
        <MainDivBg className="shop_nav">
            <div className="return-order-container" onClick={changeToHome}>
                <div className="address-temp">
                    <LogoSecondary className="uil uil-estate"> </LogoSecondary>
                    <SecondarySpanColor>
                        Home
                    </SecondarySpanColor>
                </div>
            </div>
            <div className="return-order-container" onClick={changeToProduct}>
                <div className="address-temp">
                    <LogoSecondary className="uil uil-clipboard-notes"> </LogoSecondary>
                    <SecondarySpanColor>
                        Products
                    </SecondarySpanColor>
                </div>
            </div>
            <div className="return-order-container" onClick={changeToReview}>
                <div className="address-temp">
                    <LogoSecondary className="uil uil-comment-alt"> </LogoSecondary>
                    <SecondarySpanColor>
                        Review
                    </SecondarySpanColor>
                </div>
            </div>
            <div className="return-order-container" onClick={changeToAbout}>
                <div className="address-temp">
                    <LogoSecondary className="uil uil-info-circle"> </LogoSecondary>
                    <SecondarySpanColor>
                        About Us
                    </SecondarySpanColor>
                </div>
            </div>
        </MainDivBg >
    )
}
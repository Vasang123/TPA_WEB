import { useRouter } from "next/router";
import { MainDivBg, SecondarySpanColor } from "../Other/GlobalComponent";
import { LogoSecondary } from "../Other/LogoComponent";



export default function ProfileNav({ user }: any) {

    const router = useRouter()
    // console.log("Router", router.query.user_id);

    const changeToProfile = async (e: any) => {
        e.preventDefault()
        router.push(`/profile`)
    }
    const changeToComments = async (e: any) => {
        e.preventDefault()
        router.push(`/reviews_order/reviews`)
    }
    const changeToOrder = async (e: any) => {
        e.preventDefault()
        router.push(`/reviews_order/order`)
    }
    const changeToCoupon = async (e: any) => {
        e.preventDefault()
        router.push(`/reviews_order/voucher`)
    }
    const changeToSeller = async (e: any) => {
        e.preventDefault()
        router.push(`/reviews_order/seller_order`)
    }
    // if (user) {

    //     console.log(user.role_id);
    // }

    return (
        <MainDivBg className="shop_nav">
            <div className="return-order-container" onClick={changeToProfile}>
                <div className="address-temp">
                    <LogoSecondary className="uil uil-user"> </LogoSecondary>
                    <SecondarySpanColor>
                        My Profile
                    </SecondarySpanColor>
                </div>
            </div>
            <div className="return-order-container" onClick={changeToComments}>
                <div className="address-temp">
                    <LogoSecondary className="uil uil-comment-alt-lines"> </LogoSecondary>
                    <SecondarySpanColor>
                        My Reviews
                    </SecondarySpanColor>
                </div>
            </div>
            <div className="return-order-container" onClick={changeToOrder}>
                <div className="address-temp">
                    <LogoSecondary className="uil uil-clipboard-notes"> </LogoSecondary>
                    <SecondarySpanColor>
                        My Order
                    </SecondarySpanColor>
                </div>
            </div>
            <div className="return-order-container" onClick={changeToCoupon}>
                <div className="address-temp">
                    <LogoSecondary className="uil uil-notes"> </LogoSecondary>
                    <SecondarySpanColor>
                        My Voucher
                    </SecondarySpanColor>
                </div>
            </div>
            {
                user && (user.role_id == 2 || user.role_id == 3) && (
                    <div className="return-order-container" onClick={changeToSeller}>
                        <div className="address-temp">
                            <LogoSecondary className="uil uil-notes"> </LogoSecondary>
                            <SecondarySpanColor>
                                Shop Order
                            </SecondarySpanColor>
                        </div>
                    </div>
                )
            }
        </MainDivBg >
    )
}
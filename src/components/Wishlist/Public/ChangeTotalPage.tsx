import { MainDivBg, SecondarySpanColor } from "@/components/Other/GlobalComponent";
import { LogoSecondary } from "@/components/Other/LogoComponent";



export default function ChangeTotalItems({ changeItemsPerPage }: any) {
    // if (user) {

    //     console.log(user.role_id);
    // }

    return (
        <MainDivBg className="shop_nav">
            <div className="return-order-container" onClick={(e) => changeItemsPerPage(e, 4)}>
                <div className="address-temp">
                    4
                </div>
            </div>
            <div className="return-order-container" onClick={(e) => changeItemsPerPage(e, 15)}>
                <div className="address-temp">
                    15
                </div>
            </div>
            <div className="return-order-container" onClick={(e) => changeItemsPerPage(e, 30)}>
                <div className="address-temp">
                    30
                </div>
            </div>
            <div className="return-order-container" onClick={(e) => changeItemsPerPage(e, 60)}>
                <div className="address-temp">
                    60
                </div>
            </div>
            <div className="return-order-container" onClick={(e) => changeItemsPerPage(e, 90)}>
                <div className="address-temp">
                    90
                </div>
            </div>
        </MainDivBg >
    )
}
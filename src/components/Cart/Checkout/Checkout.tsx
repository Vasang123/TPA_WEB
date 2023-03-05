import { Select2 } from "@/components/Other/InputComponent";
import { useState } from "react";


export default function Checkout({ Total, user }: any) {
    const [userMoney, setuserMoney] = useState(0)
    return (
        <div className=".checkout_page">
            <div className="checout">
                <form action="">
                    <Select2>
                    </Select2>


                </form>
            </div>
        </div>
    )
}
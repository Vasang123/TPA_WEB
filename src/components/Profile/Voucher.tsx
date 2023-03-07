import Image from "next/image";
import { BaseBackgroundColor, ProductDivBg, SecondarySpanColor } from "../Other/GlobalComponent";
import { Input, LogoutButton2 } from "../Other/InputComponent";
import { useEffect, useState } from "react";
import { redeem_voucher, update_password } from "../RequestComponent";
import { useRouter } from "next/router";


export default function RedeemVoucher({ user }: any) {
    const [voucher, setVoucher] = useState('')
    const [money, setmoney] = useState()
    const r = useRouter()
    useEffect(() => {
        const fetchMoney = async () => {
            const res = await fetch(`http://localhost:8000/api/checkout/user_money?user_id=${user.id}`)
            const data = await res.json()
            setmoney(data)
        }
        fetchMoney()
    }, [money, user.id, voucher, r])
    const redeemVoucher = async (e: any) => {
        e.preventDefault()
        await redeem_voucher(voucher, user.id)
        r.push("/reviews_order/voucher")
    }
    return (
        <BaseBackgroundColor className="voucher_page">
            <ProductDivBg className="voucher_container">
                <div className="update_password_container">
                    <SecondarySpanColor className="primo">
                        Your Genesis Crystal :
                        <br />
                        <Image src="https://firebasestorage.googleapis.com/v0/b/tpa-web-4d910.appspot.com/o/images%2FItem_Genesis_Crystal.webp?alt=media&token=040f3bc6-c3de-4e29-baee-5b8e9275d732"
                            alt=""
                            width={30}
                            height={30} />

                        {money}
                    </SecondarySpanColor>
                    {/* <SecondarySpanColor>Redeem Voucher :
                    </SecondarySpanColor> */}
                    <form action="" onSubmit={redeemVoucher}>
                        <Input placeholder="Input Voucher Code Here" onChange={(e: any) => setVoucher(e.target.value)} />                        <button>
                            Redeem Voucher
                        </button>
                    </form>
                </div>
                {/* <LogoutButton2 /> */}
            </ProductDivBg >
        </BaseBackgroundColor >
    )
}
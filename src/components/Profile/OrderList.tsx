import { Order } from "@/types/models";
import { Loading, Loading2, ProductDivBg, SecondaryBoldColor, SecondarySpanColor } from "../Other/GlobalComponent";
import style from '@/styles/Order/orderlist.module.scss'
import { buy_again, handle_seller } from "../RequestComponent";
export default function OrderList({ orders, type, r }: any) {
    if (!Array.isArray(orders)) {
        return (
            <Loading2>
                <div className="loading_content">
                    No orders found
                </div>
            </Loading2>
        )
    }
    const BuyAgain = async (e: any, order_id: any) => {
        e.preventDefault()
        await buy_again(order_id)

    }
    const HandleSeller = async (e: any, order_id: any, data: any) => {
        e.preventDefault()
        await handle_seller(order_id, data)
        r.push("/reviews_order/seller_order")
    }
    return (

        <div className={style.order_list}>
            {
                orders && (
                    orders.map((order: any) => (
                        <ProductDivBg key={order.id} className={style.order_container}>
                            <div className={style.content}>
                                <SecondarySpanColor>
                                    {order.created_at}
                                </SecondarySpanColor>
                                {order.status == "pending" ? (
                                    <div className={style.pending}>
                                        Pending Order
                                    </div>
                                ) : (
                                    <>
                                        {
                                            order.status == "cancel" ? (
                                                <div className={style.cancel}>
                                                    Cancelled
                                                </div>
                                            ) : (
                                                <div className={style.success}>
                                                    Success Order
                                                </div>

                                            )
                                        }
                                    </>
                                )}
                            </div>
                            <div className={style.content}>
                                <SecondarySpanColor>
                                    {order.invoice}
                                </SecondarySpanColor>
                                <SecondarySpanColor>
                                    Total Price: {order.total}
                                </SecondarySpanColor>
                            </div>
                            <div className={style.content}>
                                <SecondarySpanColor>
                                    Destination: {order.address?.name}
                                </SecondarySpanColor>
                                <SecondarySpanColor>
                                    {
                                        order.status != "pending" && type == "user" && (
                                            <div className={style.option}>
                                                <button className={style.buy_again} onClick={(e) => BuyAgain(e, order.id)}>
                                                    Buy Again
                                                </button>
                                                <button className={style.fill_quiz}>
                                                    Fill Quizionaire
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        order.status == "pending" && type == "seller" && (
                                            <div className={style.option}>
                                                <button className={style.buy_again} onClick={(e) => HandleSeller(e, order.id, "success")}>
                                                    Finish Order
                                                </button>
                                                <button className={style.cancel} onClick={(e) => HandleSeller(e, order.id, "cancel")}>
                                                    Cancel Order
                                                </button>
                                            </div>
                                        )
                                    }


                                </SecondarySpanColor>

                            </div>

                        </ProductDivBg >
                    ))
                )
            }
        </div >

    )
}


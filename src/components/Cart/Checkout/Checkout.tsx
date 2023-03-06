import { Select2 } from "@/components/Other/InputComponent";
import { useState } from "react";
import style from '@/styles/Cart/checkout.module.scss'
import { ProductDivBg, SecondaryH1Color, SecondarySpanColor } from "@/components/Other/GlobalComponent";
import Image from "next/image";
import AddressTable from "./AddressView";
import { Address } from "cluster";
import { AddressData, Order } from "@/types/models";
import { create_order } from "@/components/RequestComponent";

export default function Checkout({
    Total,
    currUser,
    closeModal,
    carts
}: any) {
    // console.log(carts);
    const [openAddressTable, setOpenAddressTable] = useState(false)
    const [userMoney, setUserMoney] = useState(0)
    const [destinationAddress, setDestinationAddress] = useState<AddressData>()
    const [selectedPayment, setSelectedPayment] = useState("")
    const [selectedDelivery, setSelectedDelivery] = useState("")
    const openTable = async (e: Event) => {
        e.preventDefault()
        setOpenAddressTable(true)
    }
    const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedPayment || !destinationAddress || !selectedDelivery) {
            alert("Please select a payment method, delivery method, and destination address");
            return;
        }
        const order: Order = {
            payment: selectedPayment,
            delivery: selectedDelivery,
            total: Total,
            address_id: destinationAddress?.id || 0,
            user_id: currUser.id,
            modified_at: new Date(),
            created_at: new Date()
        };
        // console.log(order);

        await create_order(order)

    }

    return (
        <div className={style.checkout_page}>
            <ProductDivBg className={style.form_container}>
                <button onClick={() => closeModal(false)} className={style.close_button}>
                    <i className="uil uil-times-circle"></i>
                </button>
                <form action="" onSubmit={(e) => handleOrder(e)}>
                    <SecondaryH1Color>Order Summary</SecondaryH1Color>
                    <SecondarySpanColor>Total Items Price : {Total}</SecondarySpanColor>
                    <Select2 value={selectedPayment} onChange={(e: any) => setSelectedPayment(e.target.value)}>
                        <option value="">Select Payment</option>
                        <option value="credit">Credit Card</option>
                        <option value="master">Master Card</option>
                        <option value="genesis"> Genesis Crystal </option>
                    </Select2>
                    <Select2 value={selectedDelivery} onChange={(e: any) => setSelectedDelivery(e.target.value)}>
                        <option value="">Select Delivery</option>
                        <option value="jne">JNE</option>
                        <option value="ojol">Ojol</option>
                    </Select2>
                    <SecondarySpanColor className={style.dest_container}>
                        Destination:
                        <button onClick={(e: any) => openTable(e)}>Choose Address</button>
                    </SecondarySpanColor>
                    <SecondarySpanColor>{destinationAddress?.name ? (
                        <>
                            {destinationAddress?.name}
                        </>
                    ) : (
                        <>
                            No Address Selected
                        </>
                    )}
                    </SecondarySpanColor>
                    <div className={style.button_container}>
                        <button>Order Item</button>
                    </div>

                </form>
            </ProductDivBg>
            {
                openAddressTable && (
                    <AddressTable
                        selectedAddress={setDestinationAddress}
                        closeModal={setOpenAddressTable}
                        user_id={currUser.id}
                    />
                )
            }
        </div >
    )
}
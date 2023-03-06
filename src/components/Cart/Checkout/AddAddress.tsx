import { Loading, ProductDivBg, SecondaryH1Color } from '@/components/Other/GlobalComponent'
import { Input, TextArea } from '@/components/Other/InputComponent'
import { insert_address, update_shop_about, update_shop_banner, update_shop_name } from '@/components/RequestComponent'
import style from '@/styles/Cart/checkout.module.scss'
import { AddressData, UpdateStoreReq } from '@/types/models'
import { useState } from 'react'
[]
export default function AddressForm({
    user_id,
    closeForm }: any) {
    const [newAddress, setNewAddress] = useState('')
    const addAdddress = async (e: any) => {
        e.preventDefault()
        const payload: AddressData = {
            user_id: user_id,
            name: newAddress
        }

        await insert_address(payload)
        closeForm(false)
    }
    const handleClose = async (e: any) => {
        e.preventDefault()
        closeForm(false)
    }

    return (
        <div className={style.address_page}>
            <ProductDivBg className={style.form_container}>
                <button onClick={handleClose} className={style.close_button}>
                    <i className="uil uil-times-circle"></i>
                </button>
                <form action="" onSubmitCapture={addAdddress}>
                    <SecondaryH1Color>Add Address</SecondaryH1Color>
                    <TextArea value={newAddress} onChange={(e: any) => setNewAddress(e.target.value)}> </TextArea>
                    <div className={style.add_container}>
                        <button type="submit">Insert Address</button>

                    </div>
                </form>
            </ProductDivBg>
        </div>
    )
}

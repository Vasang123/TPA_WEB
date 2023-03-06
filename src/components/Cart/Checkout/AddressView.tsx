import { ProductDivBg, SecondarySpanColor, Table, Td, Th } from '@/components/Other/GlobalComponent'
import style from '@/styles/Cart/checkout.module.scss'
import { AddressData } from '@/types/models'
import { Address } from 'cluster'
import { useEffect, useState } from 'react'
import AddressForm from './AddAddress'
import { delete_address } from '@/components/RequestComponent'

export default function AddressTable({ user_id, closeModal, selectedAddress }: any) {
    const [addressList, setAddressList] = useState<AddressData[]>([])
    const [newAddressModal, setNewAddressModal] = useState(false)
    useEffect(() => {
        const fetchAddress = async () => {
            const res = await fetch(`http://localhost:8000/api/checkout/table/address?user_id=${user_id}`)
            const data = await res.json()
            setAddressList(data)
        }
        fetchAddress()
    }, [addressList, user_id])
    const handloClose = async (e: Event) => {
        e.preventDefault()
        closeModal(false)
    }
    const handleNewAddress = async (e: any) => {
        e.preventDefault()
        setNewAddressModal(true)
    }
    const handleSelelected = async (e: any, selected: AddressData) => {
        e.preventDefault()
        alert("Address Selected")
        selectedAddress(selected)
        closeModal(false)
    }
    const handleDeleteAddress = async (e: any, id: any) => {
        await delete_address(id)

    }
    return (
        <div className={style.container}>
            <ProductDivBg className={style.table_container}>
                <Table>
                    <thead>
                        <tr>
                            <Th>Address Name</Th>
                            <Th>Option</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {addressList.map((add) => (
                            <tr key={add.id}>
                                <Td>
                                    <div className={style.add_name_container}>
                                        <SecondarySpanColor> {add.name}</SecondarySpanColor>
                                    </div>
                                </Td>
                                <Td>
                                    {/* <div className={style.td_container}> */}
                                    <div className={style.td_button}>
                                        <button className={style.select_add} onClick={(e) => handleSelelected(e, add)}>
                                            <i className="uil uil-plus-square"></i>
                                        </button>
                                        <button className={style.delete_add} onClick={(e) => handleDeleteAddress(e, add.id)}>
                                            <i className="uil uil-trash"></i>
                                        </button>

                                    </div>
                                    {/* </div> */}
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className={style.form_button}>
                    <button type="submit" onClick={handleNewAddress} >Add Address</button>
                    {closeModal ? (
                        <button type="button" onClick={(e: any) => handloClose(e)} className={style.cancel}>Back</button>
                    ) : (
                        <div>

                        </div>
                    )}
                </div>
            </ProductDivBg>
            {
                newAddressModal && (
                    <AddressForm
                        user_id={user_id}
                        closeForm={setNewAddressModal}
                    />
                )
            }
        </div>
    )

}
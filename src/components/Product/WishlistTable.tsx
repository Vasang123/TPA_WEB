import { SecondarySpanColor, SecondarySpanColor2, Table, Td, Th } from "@/components/Other/GlobalComponent";
import { Input, Select2 } from "@/components/Other/InputComponent";
import { Wishlist, WishlistDetail } from "@/types/models";
import { useEffect, useState } from "react"
import style from '@/styles/Product/table.module.scss'
import { LogoSecondary } from "../Other/LogoComponent";
import axios from "axios";


export function WishlistTable({
    user_id,
    setShowTableDialog,
    quantity,
    product_id,
    product_image
}: any) {
    const [wishlists, setWishlists] = useState<Wishlist[]>([])
    const handleClose = async (e: any) => {
        e.preventDefault()

        setShowTableDialog(false)

    }
    const handleSave = async (e: any, wishlist_id: any) => {
        e.preventDefault()
        if (quantity > 0) {

            try {
                const newWishlist: WishlistDetail = {
                    id: 0,
                    quantity: quantity,
                    wishlist_id: wishlist_id,
                    product_id: product_id,
                    product: {
                        image: product_image
                    }
                };
                // console.log(newWishlist);
                axios.post('http://localhost:8000/api/wishlist/insert', newWishlist)
                    .then(response => {
                        alert(response.data.message)
                    })
                    .catch(response => {
                        console.log(response);
                    });
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Quantity must be greater than 1")
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8000/api/wishlist/manage/view?user_id=${user_id}`)
            .then(response => response.json())
            .then(data => {

                if (data.wishlists) {
                    setWishlists(data.wishlists)
                }
            })
            .catch(error => console.error(error))
    }, [user_id])

    return (
        wishlists && (
            <div className={style.container}>
                <div className={style.table_container}>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Wishlist Name</Th>
                                <Th>Option</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlists.map((wish) => (
                                <tr key={wish.id}>
                                    <Td>
                                        <div className={style.td_container}>
                                            <SecondarySpanColor>
                                                {wish.name}
                                            </SecondarySpanColor >

                                        </div>
                                    </Td>
                                    <Td>
                                        <div className={style.td_container}>
                                            <button type="submit" onClick={(e) => handleSave(e, wish.id)} >
                                                <LogoSecondary className="uil uil-plus"></LogoSecondary>
                                            </button>
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className={style.form_button}>
                        {setShowTableDialog ? (
                            <button type="button" onClick={handleClose} className={style.cancel}>Cancel</button>
                        ) : (
                            <div>

                            </div>
                        )}
                    </div>

                </div>
            </div>
        )
    )
}
import { Table, Td, Th } from "@/components/Other/GlobalComponent";
import { Input, Select2 } from "@/components/Other/InputComponent";
import { Wishlist } from "@/types/models";
import { useEffect, useState } from "react"
import style from '@/styles/Wishlist/managewishlist.module.scss'


export function PrivacyTable({
    user_id,
    handleCancel
}: any) {
    const [wishlists, setWishlists] = useState<Wishlist[]>([])
    const handleNameChange = (e: any, id: number) => {
        setWishlists(prevState =>
            prevState.map((wish) => {
                if (wish.id === id) {
                    return { ...wish, name: e.target.value };
                } else {
                    return wish;
                }
            })
        );
    };

    const handlePrivacyChange = (e: any, id: number) => {
        setWishlists(prevState =>
            prevState.map((wish) => {
                if (wish.id === id) {
                    return { ...wish, privacy: e.target.value };
                } else {
                    return wish;
                }
            })
        );
    };
    const handleClose = async () => {
        handleCancel(false)
    }
    const handleSave = async () => {
        try {
            // console.log(wishlists);

            const response = await fetch(`http://localhost:8000/api/wishlist/manage/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wishlists })
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            } else {
                const data = await response.json();
                alert(JSON.stringify(data.message));
                handleCancel(false)
            }
        } catch (error) {
            console.error(error);
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
                                <Th>Name</Th>
                                <Th>Privacy</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlists.map((wish) => (
                                <tr key={wish.id}>
                                    <Td>
                                        <div className={style.td_container}>
                                            <Input type="text" value={wish.name} onChange={(e) => handleNameChange(e, wish.id)} />

                                        </div>
                                    </Td>
                                    <Td>
                                        <div className={style.td_container}>
                                            <Select2 value={wish.privacy} onChange={(e) => handlePrivacyChange(e, wish.id)}>
                                                <option value="private">Private</option>
                                                <option value="public">Public</option>
                                            </Select2>

                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className={style.form_button}>
                        <button type="submit" onClick={handleSave} >Save</button>
                        {handleCancel ? (
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
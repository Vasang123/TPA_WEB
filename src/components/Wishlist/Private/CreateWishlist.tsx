import style from '@/styles/Wishlist/createwishlist.module.scss'
import { Wishlist } from '@/types/models'
import { useState } from 'react'
import { MainDivBg, SecondaryH1Color, SecondarySpanColor, Select } from '../../Other/GlobalComponent'
import { Input, Select2 } from '../../Other/InputComponent'
import { create_wishlist } from '../../RequestComponent'

export default function CreateWishlist({
    user_id,
    title,
    close }: any) {
    const [privacy, setPrivacy] = useState('')
    const [name, setName] = useState('')
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (name == '') {
            alert("Name Can't be empty")
        } else if (privacy == '') {
            alert("Privacy Can't be empty")
        } else {
            const newWishlist: Wishlist = {
                id: 0,
                user_id: user_id,
                name: name,
                privacy: privacy,
                image: ''
            };
            await create_wishlist(newWishlist)
            close(false)

        }
    }
    const handleCancel = async (e: any) => {
        close(false)
    }
    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <SecondaryH1Color>{title}</SecondaryH1Color>
                <label className={style.name_container}>
                    <SecondarySpanColor>
                        Name:
                    </SecondarySpanColor>
                    <Input type="text" onChange={(e: any) => setName(e.target.value)} />
                </label>
                <br />
                <label className={style.privacy_container}>
                    <SecondarySpanColor>
                        Privacy:
                    </SecondarySpanColor>
                    <Select2 name="" id="" className={style.privacy_select} onChange={(e: any) => setPrivacy(e.target.value)} >
                        <option value=""></option>
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </Select2>
                </label>
                <br />
                <div className={style.form_button}>
                    <button type="submit" >Submit</button>
                    {handleCancel ? (
                        <button type="button" onClick={handleCancel} className={style.cancel}>Cancel</button>
                    ) : (
                        <div>

                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}
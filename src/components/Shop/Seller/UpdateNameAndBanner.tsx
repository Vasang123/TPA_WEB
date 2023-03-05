import { Loading, ProductDivBg, SecondaryH1Color } from '@/components/Other/GlobalComponent'
import { Input, TextArea } from '@/components/Other/InputComponent'
import { update_shop_about, update_shop_banner, update_shop_name } from '@/components/RequestComponent'
import style from '@/styles/Shop/general.module.scss'
import { UpdateStoreReq } from '@/types/models'
import { useState } from 'react'

export default function UpdateHomeModal({
    user,
    currShopName,
    currShopAbout,
    currShopBanner,
    closeNameDialog,
    currShopId,
    type,
}: any) {
    const [newName, setNewName] = useState(currShopName)
    const [newAbout, setNewAbout] = useState(currShopAbout)
    const [newImage, setNewImage] = useState<File>();
    const [loading, setLoading] = useState(false);
    const updateName = async (e: any) => {
        e.preventDefault()
        const payload: UpdateStoreReq = {
            user_id: user.id,
            shop_id: currShopId,
            role_id: user.role_id,
            new_name: newName
        }

        await update_shop_name(payload, user)
    }
    const updateAbout = async (e: any) => {
        e.preventDefault()
        const payload: UpdateStoreReq = {
            user_id: user.id,
            shop_id: currShopId,
            role_id: user.role_id,
            new_name: newAbout
        }

        await update_shop_about(payload, user)
    }
    const updateBanner = async (e: any) => {
        e.preventDefault()
        const payload: UpdateStoreReq = {
            user_id: user.id,
            shop_id: currShopId,
            role_id: user.role_id,
            new_name: ""
        }
        // setLoading(true)
        const loading = await update_shop_banner(payload, newImage)

        // setLoading(loading)

    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImage(file);
        }
    };
    if (loading) {
        return <Loading style={{
            position: "fixed",
        }}>
            <div className="loading_content" style={{
                // zIndex: "20000",
                // position: "absolute",
                // top: "50%",
                // left: "50%",
            }}>
                Loading...
            </div>
        </Loading >;
    }


    return (
        <div className={style.update_name_page}>
            <ProductDivBg className={style.form_container}>
                <button onClick={closeNameDialog} className={style.close_button}>
                    <i className="uil uil-times-circle"></i>
                </button>
                {
                    type == 1 ? (
                        <form action="" onSubmit={updateName}>
                            <SecondaryH1Color>Update Shop Name</SecondaryH1Color>
                            <Input value={newName} onChange={(e: any) => setNewName(e.target.value)} />
                            <button type="submit">Update Name</button>
                        </form>
                    ) : (
                        <>
                            {
                                type == 2 ? (
                                    <form action="" onSubmitCapture={updateBanner}>
                                        <SecondaryH1Color>Update Banner</SecondaryH1Color>
                                        <Input type="file" onChange={handleInputChange} />

                                        <button type="submit">Change Banner</button>
                                    </form>
                                ) : (
                                    <form action="" onSubmitCapture={updateAbout}>
                                        <SecondaryH1Color>Update About</SecondaryH1Color>
                                        <TextArea value={newAbout} onChange={(e: any) => setNewAbout(e.target.value)}> </TextArea>

                                        <button type="submit">Change Info</button>
                                    </form>
                                )
                            }
                        </>
                    )
                }
            </ProductDivBg>
        </div>
    )
}

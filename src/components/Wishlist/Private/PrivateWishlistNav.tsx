import Link from "next/link"
import { MainDivBg } from "../../Other/GlobalComponent"
import { LogoSecondary } from "../../Other/LogoComponent"
import SearchDisplay from "../../SearchBar/SearchDisplay"
import style from '@/styles/Wishlist/createwishlist.module.scss'
import CreateWishlist from "./CreateWishlist"
import { useState } from "react"
import { PrivacyTable } from "./ManageWishlist"

export default function PrivateNav({ user_id }: any) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showTableDialog, setShowTableDialog] = useState(false);
    const openCreateDialog = async (e: any) => {
        e.preventDefault();
        setShowEditDialog(true)
    }
    const openManageDialog = async (e: any) => {
        e.preventDefault();
        setShowTableDialog(true)
    }
    return (
        <div>
            <MainDivBg className="private-nav">
                <div className="address-container">
                    <LogoSecondary className="uil uil-plus-circle" onClick={openCreateDialog}></LogoSecondary>
                    <div className="address-temp" onClick={openCreateDialog}>
                        <div className="address-welcome">
                            Create New Wishlist
                        </div>
                    </div>
                </div>
                <div className="address-container">
                    <LogoSecondary className="uil uil-folder" onClick={openManageDialog} ></LogoSecondary>
                    <div className="address-temp" onClick={openManageDialog}>
                        <div className="address-welcome">
                            Manage My Wishlist
                        </div>
                    </div>
                </div>

            </MainDivBg >
            {
                showEditDialog && (
                    <CreateWishlist
                        user_id={user_id}
                        title={"Create Wishlist"}
                        close={setShowEditDialog} />
                )
            }
            {
                showTableDialog && (
                    <PrivacyTable
                        user_id={user_id}
                        handleCancel={setShowTableDialog} />
                )
            }

        </div>

    )

}
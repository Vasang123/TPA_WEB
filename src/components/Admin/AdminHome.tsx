import Link from "next/link";
import LogoutButton from "../Other/InputComponent";
import style from '@/styles/Admin/adminhome.module.scss'
import { BackButton, BaseBackgroundColor, MainDivBg, SecondaryLinkColor, SecondaryLinkColor2, SecondaryLinkColor3, SecondaryLinkColor4, SecondarySpanColor } from "../Other/GlobalComponent";
import { LogoSecondary } from "../Other/LogoComponent";
export default function AdminHome() {

    return (
        <MainDivBg className={style.home}>
            <BackButton target="/" />
            <div className={style.menu_list}>
                <SecondaryLinkColor4 href="/admin/add_voucher">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-ticket"></LogoSecondary>
                        <SecondarySpanColor>
                            Add Voucher
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/admin/view_users">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-users-alt"></LogoSecondary>
                        <SecondarySpanColor>
                            View Users
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/admin/view_shop">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-store"></LogoSecondary>
                        <SecondarySpanColor>
                            View Shops
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/admin/add_shop">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-store-alt"></LogoSecondary>
                        <SecondarySpanColor>
                            Add Shop
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-comment-alt-notes"></LogoSecondary>
                        <SecondarySpanColor>
                            View All Reviews
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/admin/add_letter">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-newspaper"></LogoSecondary>
                        <SecondarySpanColor>
                            Send News Letter
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/admin/add_promo">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-file-plus-alt"></LogoSecondary>
                        <SecondarySpanColor>
                            Add Promo
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/admin/view_promo">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-list-ui-alt"></LogoSecondary>
                        <SecondarySpanColor>
                            View Promo
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
            </div>
            <LogoutButton />
        </MainDivBg>
    )
}
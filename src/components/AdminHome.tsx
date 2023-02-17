import Link from "next/link";
import LogoutButton from "./InputComponent";
import style from '@/styles/adminhome.module.scss'
import { BaseBackgroundColor, MainDivBg, SecondaryLinkColor, SecondaryLinkColor2, SecondaryLinkColor3, SecondaryLinkColor4, SecondarySpanColor } from "./GlobalComponent";
import { LogoSecondary } from "./LogoComponent";
export default function AdminHome() {

    return (
        <MainDivBg className={style.home}>
            <Link href="/" className={style.back_container}>
                <div className={style.back}>
                    Back
                </div>
            </Link>
            <div className={style.menu_list}>
            <SecondaryLinkColor4 href="/admin/add_voucher">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-ticket"></LogoSecondary>
                        <SecondarySpanColor>
                            Add Voucher
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-users-alt"></LogoSecondary>
                        <SecondarySpanColor>
                            View Users
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-store"></LogoSecondary>
                        <SecondarySpanColor>
                            View Shops
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
                <SecondaryLinkColor4 href="/">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-store-alt"></LogoSecondary>
                        <SecondarySpanColor>
                            Add Shops
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
                <SecondaryLinkColor4 href="/">
                    <div className={style.menu_item}>
                        <LogoSecondary className="uil uil-newspaper"></LogoSecondary>
                        <SecondarySpanColor>
                            Send News Letter
                        </SecondarySpanColor>
                    </div>
                </SecondaryLinkColor4>
            </div>
            <LogoutButton />
        </MainDivBg>
    )
}
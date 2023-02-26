import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Loading } from "@/components/Other/GlobalComponent";
import WishlistNav from "@/components/Wishlist/Navigation";
import PrivateNav from "@/components/Wishlist/Private/PrivateWishlistNav";
import WishlistDisplay from "@/components/Wishlist/WhislistComponent";
import WishlistHome from "@/components/Wishlist/Public/WishlistHome";
import WishlistPrivate from "@/components/Wishlist/Private/WishlistPrivate";
import { User } from "@/types/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Private() {
    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState(true);
    let i = 1;
    const r = useRouter()
    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
            setUserData(JSON.parse(userDataString));
        } else if (i == 1) {
            alert("You Must Login First")
            r.back()
            i = 0
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Loading>
                <div className="loading_content">Loading...</div>
            </Loading>
        )
    }
    return (
        <>
            <Navbar />
            <WishlistNav />
            {
                userData ? (
                    <PrivateNav user_id={userData ? userData.id : null} />
                ) : (
                    <div></div>
                )
            }
            {
                userData ? (
                    <WishlistPrivate user_id={userData ? userData.id : null} />
                ) : (
                    <div></div>
                )
            }

            <Footer />
        </>
    )
}
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Loading } from "@/components/Other/GlobalComponent";
import WishlistNav from "@/components/Wishlist/Navigation";
import WishlistDisplay from "@/components/Wishlist/WhislistComponent";
import WishlistFav from "@/components/Wishlist/Favorite/WishlistFavorite";
import WishlistHome from "@/components/Wishlist/Public/WishlistHome";
import { User } from "@/types/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Home() {
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
            {userData && <WishlistFav user_id={userData.id} />}
            <Footer />
        </>
    )
}
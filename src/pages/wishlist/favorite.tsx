import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import WishlistNav from "@/components/Wishlist/Navigation";
import WishlistDisplay from "@/components/Wishlist/WhislistComponent";
import WishlistFav from "@/components/Wishlist/WishlistFavorite";
import WishlistHome from "@/components/Wishlist/WishlistHome";
import { User } from "@/types/models";
import { useEffect, useState } from "react";


export default function Home() {
    const [userData, setUserData] = useState<User>();
    let i = 1;
    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
            setUserData(JSON.parse(userDataString));
        }
    }, []);
    return (
        <>
            <Navbar />
            <WishlistNav />
            {userData && <WishlistFav user_id={userData.id} />}
            <Footer />
        </>
    )
}
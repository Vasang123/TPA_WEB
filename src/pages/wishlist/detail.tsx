import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import WishlistNav from "@/components/Wishlist/Navigation";
import ListDisplay from "@/components/Wishlist/WishlistDetail";
import { FavoriteList, User } from "@/types/models";
import { useEffect, useState } from "react";


export default function WishlistDetail() {
    const [userData, setUserData] = useState<User>();
    const [list, setList] = useState<FavoriteList[]>([])
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
            <ListDisplay />
            <Footer />
        </>
    )
}
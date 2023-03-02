import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ShopNav from "@/components/Shop/ShopNav";
import ShopProducts from "@/components/Shop/ShopProducts";
import ShopReview from "@/components/Shop/ShopReviews";
import { User } from "@/types/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Reviews() {
    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState(true);
    let i = 1;
    const r = useRouter()
    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
            setUserData(JSON.parse(userDataString));
        }
        setLoading(false);
    }, []);
    return (
        <>
            <Navbar />
            <ShopNav />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ShopReview user_id={userData ? userData.id : 0} />
            )}
            <Footer />
        </>
    )
}

import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ShopNav from "@/components/Shop/ShopNav";
import ShopHome from "@/components/Shop/Home";
import { Loading } from "@/components/Other/GlobalComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/types/models";


export default function ShopPage() {
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
            <ShopNav />
        
            <ShopHome currUser={userData ? userData : ""} />

            <Footer />
        </>
    )
}
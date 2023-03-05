import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Loading } from "@/components/Other/GlobalComponent";
import ShopAbout from "@/components/Shop/ShopAbout";
import ShopNav from "@/components/Shop/ShopNav";
import ShopProducts from "@/components/Shop/ShopProducts";
import { User } from "@/types/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function About() {
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
            <ShopAbout currUser={userData ? userData : ""} />
            <Footer />
        </>
    )
}
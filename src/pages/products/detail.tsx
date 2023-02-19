import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import DetailPage from "@/components/Product/Detail";
import { useEffect, useState } from "react";

export default function ProductDetail() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
            setUserData(JSON.parse(userDataString));
        }
    }, []);
    console.log(userData);
    
    return (
        <div>
            <Navbar />
            <DetailPage user_id={userData ? userData.id : null} />
            <Footer />
        </div>
    );
}

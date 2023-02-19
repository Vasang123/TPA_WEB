import CartDisplay from "@/components/Cart/CartView";
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Loading } from "@/components/Other/GlobalComponent";
import { User } from "@/types/models";
import { useEffect, useState } from "react";


export default function Cart() {
    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState(true);
  
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
      );
    }
    return (
        <>
            <Navbar />
            <CartDisplay  user_id={userData ? userData.id : null}/>
            <Footer/>
        </>
    )
}
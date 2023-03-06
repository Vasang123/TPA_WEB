import CartDisplay from "@/components/Cart/CartView";
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Loading, ProductDivBg, SecondaryH1Color } from "@/components/Other/GlobalComponent";
import { User } from "@/types/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Cart() {
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
      r.push("/")
      i = 0
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
      <ProductDivBg className="buy_later">
        <SecondaryH1Color>Cart</SecondaryH1Color>
      </ProductDivBg>
      <CartDisplay
        user_id={userData ? userData.id : null}
        currUser={userData ? userData : null}
        is_like="no" />
      <ProductDivBg className="buy_later">
        <SecondaryH1Color>Buy Later</SecondaryH1Color>
      </ProductDivBg>
      <CartDisplay
        user_id={userData ? userData.id : null}
        currUser={userData ? userData : null}
        is_like="yes" later={1} />
      <Footer />
    </>
  )
}
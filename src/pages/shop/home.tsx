import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ShopNav from "@/components/Shop/ShopNav";
import ShopHome from "@/components/Shop/home";


export default function ShopPage() {

    return (
        <>
            <Navbar />
            <ShopNav />
            <ShopHome />
            <Footer />
        </>
    )
}
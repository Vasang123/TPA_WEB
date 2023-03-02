import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SearchResults from "@/components/Product/SearchResult";
import ProductNav from "@/components/ProductNav/SearchNavigation";

export default function SearchPage() {

    return (
        <div>
            <Navbar />
            <ProductNav />
            <SearchResults />
            <Footer />
        </div>
    )

}
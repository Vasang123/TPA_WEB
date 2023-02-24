import { useState } from "react";
import { useRouter } from "next/router";
import SearchDisplay from "../SearchBar/SearchDisplay";



export default function Search() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('123');
    const HandleSearch = (event: any) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
        // const query = event.target.elements.search.value;
        router.push(`/products/search?q=${encodeURIComponent(searchQuery)}`);
    };
    const HandleSubmit = (event: any) => {
        event.preventDefault();
        const query = event.target.elements.search.value;
        setSearchQuery(event.target.elements.search.value);
        router.push(`/products/search?q=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <>
            <SearchDisplay
                HandleSearch={HandleSearch}
                HandleSubmit={HandleSubmit} />
        </>
    );
}

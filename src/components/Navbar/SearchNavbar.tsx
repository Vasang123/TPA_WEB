import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchDisplay from "../SearchBar/SearchDisplay";


export default function Search() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('123');
    const HandleSearch = (event: any) => {
        setSearchQuery(event.target.value);
    }

    const HandleSubmit = (event: any) => {
        event.preventDefault();
        router.push(`/products/search?q=${encodeURIComponent(searchQuery)}`);
    }

    return (
        <>
            <SearchDisplay
                HandleSearch={HandleSearch}
                HandleSubmit={HandleSubmit} />
        </>
    )
}
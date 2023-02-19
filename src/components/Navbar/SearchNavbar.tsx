import { useContext, useEffect, useState } from "react";
import { THEME, ThemeContext } from "../Theme/ThemeContext";
import { useRouter } from "next/router";


export default function Search() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('123');
    const HandleSearch = (event: any) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
        // const query = event.target.elements.search.value;
        router.push(`/products/search?q=${encodeURIComponent(searchQuery)}`);
    }
    const HandleSubmit = (event: any) => {
        event.preventDefault();
        const query = event.target.elements.search.value;
        setSearchQuery(event.target.elements.search.value);
        router.push(`/products/search?q=${encodeURIComponent(searchQuery)}`);
    }
    const { theme } = useContext(ThemeContext);
    return (
        <form action="" 
        onSubmit={HandleSubmit}
        >
            <input type="text" name="search" className="search-input"
                style={{
                    backgroundColor: theme.searchColor,
                    color: theme.secondaryColor
                }}
                onChange={HandleSearch}
            />
            <button className="search-button" style={{
                backgroundColor: theme.thirdColor
            }} type="submit">
                <i className="uil uil-search" ></i>
            </button>
        </form>
    )
}
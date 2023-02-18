import { useContext, useEffect, useState } from "react";
import { THEME, ThemeContext } from "../Theme/ThemeContext";
import { useRouter } from "next/router";


export default function Search() {
    const router = useRouter();
    function HandleSearch(event: any) {
        event.preventDefault();
        const query = event.target.elements.search.value;
        router.push(`/products/search?q=${encodeURIComponent(query)}`);
    }
    const { theme } = useContext(ThemeContext);
    return (
        <form action="" onSubmit={HandleSearch}>
            <input type="text" name="search" className="search-input"
                style={{
                    backgroundColor: theme.searchColor,
                    color: theme.secondaryColor
                }} />
            <button className="search-button" style={{
                backgroundColor: theme.thirdColor
            }} type="submit">
                <i className="uil uil-search" ></i>
            </button>
        </form>
    )
}
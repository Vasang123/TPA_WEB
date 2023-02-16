import { useContext, useEffect, useState } from "react";
import {THEME, ThemeContext } from "./ThemeContext";

export default function Search(){
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [user, setUser] = useState(null);
    return(
        <form action="">
        <input type="text" name="" id="" className="search-input"
        style={{
            backgroundColor : theme.searchColor,
            color : theme.secondaryColor
        }}/>
        <button className="search-button" style={{
                backgroundColor : theme.thirdColor
            }}>
            <i className="uil uil-search" ></i>
        </button>
    </form>
    )
}
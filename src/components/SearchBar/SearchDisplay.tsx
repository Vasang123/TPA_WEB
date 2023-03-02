
import { useContext } from "react";
import { THEME, ThemeContext } from "../Theme/ThemeContext";
export default function SearchDisplay({
    HandleSubmit,
    HandleSearch,
    search }: any) {
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
                placeholder={search}
            />
            <button className="search-button" style={{
                backgroundColor: theme.thirdColor
            }} type="submit">
                <i className="uil uil-search" ></i>
            </button>
        </form>
    );
}
import { useContext } from "react";
import {THEME, ThemeContext } from "./ThemeContext";

export default function ThemeSwitcher(){
    const { theme, toggleTheme } = useContext(ThemeContext);
    return(
        <label className="switch">
            <input type="checkbox" onChange={toggleTheme} checked={theme === THEME.dark} />
            <span className="slider round" style={{
            backgroundColor: theme.toggleSwitch,
            left: theme === THEME.light ? '0' : '0px',
            }}></span>
        </label>
    )
    
}
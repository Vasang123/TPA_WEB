import { useContext } from "react";
import {ThemeContext } from "../Theme/ThemeContext";

export function Logo({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <div style={{
        backgroundColor : theme.footerLogo
    }} {...attr}>{children}</div>
}

export function LogoPrimary({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <i style={{
        color : theme.primaryColor
    }} {...attr}>{children}</i>
}
export function LogoSecondary({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <i style={{
        color : theme.secondaryColor
    }} {...attr}>{children}</i>
}

export function MainLogoEffect({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <div style={{
        backgroundImage: `url(${theme.lightEffect})`
   }} {...attr}>{children}</div>
}

export function MainLogoEffect2({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <div style={{
        backgroundImage: `url(${theme.lightEffect})`,
        width: '150px',
        height: '150px',
        left : '10%'
   }} {...attr}>{children}</div>
}
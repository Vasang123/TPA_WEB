import Link from "next/link"
import React, { useState,useContext } from "react";
import {ThemeContext } from "../Theme/ThemeContext";
export function MainDivBg({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <div style={{
        backgroundColor : theme.primaryColor
    }} {...attr}>{children}</div>
}
export function ProductDivBg({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <div style={{
        backgroundColor : theme.productBg
    }} {...attr}>{children}</div>
}
export function BaseBackgroundColor({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <div style={{
        backgroundColor : theme.fourthColor
    }} {...attr}>{children}</div>
}

export function SecondaryDivBg({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <div style={{
        backgroundColor : theme.secondaryColor
    }} {...attr}>{children}</div>
}
export function SecondaryLandingMenu({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <div style={{
        backgroundColor : theme.landingMenu
    }} {...attr}>{children}</div>
}

export function SecondaryBoldColor({children, ...attr}:any){
    const { theme } = useContext(ThemeContext);
    return <b style={{
        'color' : theme.secondaryColor
    }} {...attr}>{children}</b>
}
export function SecondarySpanColor({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <span style={{
        'color' : theme.secondaryColor
    }} {...attr}>{children}</span>
}
export function SecondarySpanColor2({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <span style={{
        'color' : theme.secondaryColor,
        backgroundColor : theme.primaryColor
    }} {...attr}>{children}</span>
}
export function SecondaryLinkColor({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <Link style={{
        'color' : theme.secondaryColor
    }} {...attr}>{children}</Link>
}
export function Select({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <select style={{
        backgroundColor : theme.primaryColor,
        'color' : theme.secondaryColor
    }} {...attr}>{children}</select>
}
export function SecondaryH1Color({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <h1 style={{
        'color' : theme.secondaryColor
    }} {...attr}>{children}</h1>
}

export function ButtonInputBg({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <button style={{
        backgroundColor : theme.inputColor
    }} {...attr}>{children}</button>
}
export function SecondaryLinkColor2({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <Link style={{
        backgroundColor : theme.thirdColor,
        'color' : theme.primaryColor
    }} {...attr}>{children}</Link>
}
export function SecondaryLinkColor3({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <Link style={{
        backgroundColor : theme.productBg,
        'color' : theme.secondaryColor
    }} {...attr}>{children}</Link>
}

export function SecondaryLinkColor4({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <Link style={{
        backgroundColor : theme.landingMenu,
    }} {...attr}>{children}</Link>
}
export function Loading({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <div className="loading" style={{
        backgroundColor : theme.primaryColor,
        // color : theme.secondaryColor
    }} {...attr}>{children}</div>
}
export function Table({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <table style={{
        color : theme.secondaryColor,
    }} {...attr}>{children}</table>
}
export function Th({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <th style={{
        border: `1px solid ${theme.secondaryColor}`,
    }} {...attr}>{children}</th>
}
export function Td({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <td style={{
        border: `1px solid ${theme.secondaryColor}`,
    }} {...attr}>{children}</td>
}
export function BackButton({target}:any){
    return(
        <Link href={target} className="back_container">
            <div className="back">
                Back
            </div>
        </Link>
    )
}

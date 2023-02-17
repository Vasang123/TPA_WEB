import React, { useState,useContext } from "react";
import {ThemeContext } from "./ThemeContext";
export function Input({children, ...attr}:any) {
    const { theme } = useContext(ThemeContext);
    return <input style={{
        backgroundColor : theme.inputColor,
        color : theme.secondaryColor
    }} {...attr} />
}

const LogoutButton = () => {
    const handleClick = () => {
      localStorage.removeItem('user');
      window.location.assign("http://localhost:3000/");
    };
  
    return <button className="logoutButton" onClick={handleClick}>Log Out</button>;
  };
  
export default LogoutButton;
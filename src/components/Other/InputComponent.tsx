import React, { useState, useContext } from "react";
import { ThemeContext } from "../Theme/ThemeContext";
export function Input({ children, ...attr }: any) {
  const { theme } = useContext(ThemeContext);
  return <input style={{
    backgroundColor: theme.inputColor,
    color: theme.secondaryColor
  }} {...attr} />
}
export function Select2({ children, ...attr }: any) {
  const { theme } = useContext(ThemeContext);
  return <select style={{
    backgroundColor: theme.inputColor,
    'color': theme.secondaryColor
  }} {...attr}>{children}</select>
}
export function TextArea({ children, ...attr }: any) {
  const { theme } = useContext(ThemeContext);
  return <textarea style={{
    backgroundColor: theme.inputColor,
    color: theme.secondaryColor
  }} {...attr} />
}

const LogoutButton = () => {
  const handleClick = () => {
    localStorage.removeItem('user');
    window.location.assign("http://localhost:3000/");
  };

  return <button className="logoutButton" onClick={handleClick}>Log Out</button>;
};
export const LogoutButton2 = () => {
  const handleClick = () => {
    localStorage.removeItem('user');
    window.location.assign("http://localhost:3000/");
  };

  return <button className="userLogout" onClick={handleClick}>Log Out</button>;
};
export default LogoutButton;
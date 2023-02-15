import React, { createContext, useState } from "react";

export const THEME = {
  light: {
    primaryColor: "#ffffff",
    secondaryColor: "#000000",
    thirdColor: "#1946B8",
    fourthColor : "#f4f5f7",
    inputColor : "#ffffff",
    footerColor : "#0a185c",
    footerLogo : "#0a185c",
    bodyColor : "#ffffff",
    lightEffect : "",
    searchColor : "#e6e5fa",
    toggleSwitch : "#ffffff",
    landingMenu : "#e6e5faee",
  },
  dark: {
    primaryColor: "#050c2e",
    secondaryColor: "#ffffff",
    thirdColor: "#8eaff0",
    fourthColor : "#0e100e",
    inputColor : "#333333",
    footerColor : "#000000",
    footerLogo : "#ffffff",
    bodyColor : "#212121",
    lightEffect : "https://c1.neweggimages.com/WebResource/Themes/Nest/images/logos/logo_424x210_bright.png",
    searchColor : "#170f5c",
    toggleSwitch : "#e77221",
    landingMenu : "#000000",
  },
};

export const ThemeContext = createContext({
  theme: THEME.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }:any) => {
  const [theme, setTheme] = useState(THEME.light);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME.light ? THEME.dark : THEME.light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { Html, Head, Main, NextScript } from 'next/document'
import React, { useState } from "react";

export default function Document() {
 
  return (
    
    <Html lang="en">
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"></link>
      <Head />
      <body >
            <Main />
            <NextScript />        
      </body>
    </Html>
   
  )
}
// const themeInitializerScript = `(function(){
//   ${seInitialColorMode.toString()}
//   seInitialColorMode();
// })`
// function seInitialColorMode(){
//   function getInitialColorMode(){
//     const preferenceMode = window.localStorage.getItems("theme");
//     const hasPersistedPreference = typeof preferenceMode === "string";

//     if(hasPersistedPreference){
//       return preferenceMode;
//     }

//     const preference = window.matchMedia('(preference-color-scheme: dark)');
//     const hasMediaQueryPreference = typeof preference.matches ==  'boolean';

//     if(hasMediaQueryPreference){
//       return preference.matches ? "dark" : "light";
//     }
//     return light;
//   }

//   const currentColorMode = getInitialColorMode();
//   const element = document.documentElement;
//   element.style.setProperty('--initial-color-mode',currentColorMode);

//   if(currentColorMode === 'dark'){
//     document.documentElement.setAttribute('data-theme','dark')
//   }
// }



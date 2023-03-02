import { Html, Head, Main, NextScript } from 'next/document'
import React, { useState } from "react";

export default function Document() {

  return (

    <Html lang="en">
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"></link>
      <Head />
      <body className="body" >
        <Main />
        <div id="modal-root"></div>

        <NextScript />
      </body>
    </Html >

  )
}



import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import { THEME, ThemeContext } from '@/components/Theme/ThemeContext'
const inter = Inter({ subsets: ['latin'] })
import React, { useState } from "react";
import Footer from '@/components/Home/Footer'
import LandingPage from '@/components/Home/LandingPage'
import HomeData from '@/components/Home/HomeComponent'
import { Product } from '@/types/models'
export default function Home() {
  return (
    <>
      <Navbar />  
      <LandingPage />
      <HomeData />
      <Footer />
    </>
  )


}

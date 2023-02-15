import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navbar from '@/components/Navbar'
import {THEME, ThemeContext} from '@/components/ThemeContext'
const inter = Inter({ subsets: ['latin'] })
import React, { useState } from "react";
import Footer from '@/components/Footer'
import LandingPage from '@/components/LandingPage'
import HomeData from '@/components/HomeComponent'
import {Product} from '@/types/models'
export default function Home() {
  return (
    <>
        <Navbar />
        <LandingPage/>
        <HomeData />
        <Footer/>
    </>
  )

  
}

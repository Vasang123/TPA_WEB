import React, { useState, useEffect } from "react";
import {Product} from '@/types/models'
import Image from "next/image";
import style from '@/styles/Home/homedisplay.module.scss'
import { BaseBackgroundColor, MainDivBg,  SecondaryLinkColor3 } from "../Other/GlobalComponent";
import { HomeItem } from "../Product/Product";

export default function HomeData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/api/products?page=${page}`);
      const newProducts = await res.json();
      if (Array.isArray(newProducts)) {
        setProducts([...products, ...newProducts]);
      }
      setIsLoading(false);
    }

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLoading) {
        setPage(page + 1);
      }
    };

    fetchProducts();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <>
      <HomeItem products={products} />
    </>
  );
}

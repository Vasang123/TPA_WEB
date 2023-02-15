import React, { useState, useEffect } from "react";
import {Product} from '@/types/models'
import Image from "next/image";
import style from '@/styles/homedisplay.module.scss'
import { BaseBackgroundColor, MainDivBg,  SecondaryLinkColor3 } from "./GlobalComponent";
import Link from "next/link";
interface Props {
  products: Product[];
}
const HomeItem = ({ products }: { products: Product[] }) => {
  return (
    <BaseBackgroundColor className={style.product_list_container}>
      {products.map((product) => (
        <div key={product.id} className={style.product_container}>
          <SecondaryLinkColor3 href="/">
          <img src={product.image}/>
          <h2>{product.name}</h2>
          <div className={style.product_desc}>
            <p>Price: {product.price}</p>
            <p>Store: {product.store.name}</p>
          </div>
          <div className={style.product_desc}>
            <p>Category : {product.category.name}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
          </SecondaryLinkColor3>
        </div>
      ))}
    </BaseBackgroundColor>
  );
};

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

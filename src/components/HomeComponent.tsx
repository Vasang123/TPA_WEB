import React, { useState, useEffect } from "react";
import {Product} from '@/types/models'
import Image from "next/image";

interface Props {
  products: Product[];
}
const HomeItem = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
            <h1>{product.id}</h1>
          <h2>{product.name}</h2>
          <p>{product.quantity}</p>
          <img src={product.image}/>

          <p>{product.price}</p>
          <p>{product.store.name}</p>
          <p>{product.category.name}</p>

        </div>
      ))}
    </div>
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

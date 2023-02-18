import React, { useState, useEffect } from "react";
import {Product} from '@/types/models'
import Image from "next/image";
import style from '@/styles/Home/homedisplay.module.scss'
import { BaseBackgroundColor, MainDivBg,  SecondaryLinkColor3 } from "../Other/GlobalComponent";

interface Props {
  products: Product[];
}

export const HomeItem = ({ products }: Props) => {
  if (!Array.isArray(products)) {
    
    return <div>No products found</div>;
  }
  return (
    <BaseBackgroundColor className={style.product_list_container}>
      {products.map((product) => (
        <div key={product.id} className={style.product_container}>
          <SecondaryLinkColor3 href="/">
          <img src={product.image}/>
          <h2>{product.name}</h2>
          <div className={style.product_desc}>
            <p>Price: {product.price}</p>
            <p>Store: {product.user.firstName}</p>
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

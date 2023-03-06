import React, { useState, useEffect, useContext } from "react";
import { Product, User } from '@/types/models'
import Image from "next/image";
import style from '@/styles/Home/homedisplay.module.scss'
import { BaseBackgroundColor, Loading, MainDivBg, SecondaryBoldColor, SecondaryLinkColor3, SecondarySpanColor, SecondarySpanColor2 } from "../Other/GlobalComponent";
import { LanguageContext } from "../Language/LanguageContext";
import Link from "next/link";
import ProductModal from "./QuickView";
import { useRouter } from "next/router";
import UpdateProductModal from "../Shop/Seller/UpdateProduct";

interface Props {
  products: Product[];
  type: number
}

export const HomeItem = (
  { products,
    type,
    currUser,
    shop_id,
    setUpdateDialog,
    updateDialog
  }: any) => {
  const { lang } = useContext(LanguageContext);
  const [modalDialog, setmodalDialog] = useState(false);

  const [product, setProduct] = useState<Product>();
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(true);
  const r = useRouter();
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      setUserData(JSON.parse(userDataString));
    }
    setLoading(false);

  }, []);
  const openUpdateDialog = async (event: any, product: Product) => {
    event.preventDefault()
    setProduct(product)
    setUpdateDialog(true)
  }
  if (!Array.isArray(products)) {

    return (
      <SecondarySpanColor2 className="no_product">
        No Product Match Your Result
      </SecondarySpanColor2>);
  }
  if (products && products.length > 0 && products[0].user?.isBanned == "yes") {
    alert("This Shop has been banned")
    r.back()
  }
  const handleOpenDialog = async (event: any, product: Product) => {
    event.preventDefault()
    // console.log("Masuk");
    setProduct(product)
    setmodalDialog(true)
  }

  return (
    <BaseBackgroundColor className={style.product_list_container}>
      {products.map((product) => (
        <div key={product.id} className={style.product_container}>
          <SecondaryLinkColor3 href={`/products/detail?id=${encodeURIComponent(product.id)}`}>
            <div className={style.image_container}>
              <Image src={product.image} alt={product.name} width={1000}
                height={1000} />
              {
                type == 1 && (
                  <div>
                    {
                      currUser && shop_id && currUser.id == shop_id ? (
                        <div className={style.quick_container} >
                          <button onClick={(event) => openUpdateDialog(event, product)}>
                            Update
                          </button>
                        </div>
                      ) : (
                        <div className={style.quick_container} >
                          <button onClick={(event) => handleOpenDialog(event, product)}>
                            Quick View
                          </button>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
            <h2>{product.name}</h2>

            <div className={style.product_desc}>
              <p>
                {lang.is_eng == true ? ' Price: ' : 'Harga: '}
                {product.price}</p>
              <p>
                {lang.is_eng == true ? ' Store: ' : 'Toko: '}
                {product.user.firstName}</p>
            </div>
            <div className={style.product_desc}>
              <p>Brand : {product.brand.name}</p>
              <p>
                {lang.is_eng == true ? ' Quantity: ' : 'Jumlah: '}
                {product.quantity}
              </p>
            </div>
          </SecondaryLinkColor3>
        </div>
      ))}
      {
        modalDialog && (
          <div>
            <ProductModal
              product={product}
              setmodalDialog={setmodalDialog}
              user_id={userData ? userData.id : null} s />
          </div>
        )
      }
      {
        updateDialog && (
          <>
            <UpdateProductModal
              closeModal={setUpdateDialog}
              shop_id={shop_id}
              productInfo={product}
            />
          </>
        )
      }
    </BaseBackgroundColor>
  );
};

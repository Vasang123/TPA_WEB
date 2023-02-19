import { Product } from '@/types/models';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { HomeItem } from './Product';
import { BaseBackgroundColor, SecondarySpanColor } from '../Other/GlobalComponent';
import style from '@/styles/Product/search.module.scss'
export default function SearchResults() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch(`http://localhost:8000/api/search?name=${router.query.q}&page=${currentPage}`);
      const data = await res.json();
      console.log(data);
      
      setProducts(data.products);
      setTotalPages(data.totalPages);
      if(currentPage > data.totalPages){
        setCurrentPage(data.totalPages);
      }
      
    };

    if (router.query.q) {
      fetchResults();
    }
   
  }, [router.query.q, currentPage]);
  const prev = () => {
    setCurrentPage(currentPage - 1);
  };

  const next = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div>
      <HomeItem products={products} />
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={prev}
        onNextPage={next}
      />
    </div>
  );
}
function Paginate({ currentPage, totalPages, onPrevPage, onNextPage }: any) {
  return (
    <BaseBackgroundColor className={style.paginate_container}>
      <button className={style.prev} onClick={onPrevPage} disabled={currentPage === 1}>Prev</button>
      <SecondarySpanColor className={style.pageNumber}>{currentPage} of {totalPages}</SecondarySpanColor>
      <button className={style.next} onClick={onNextPage} disabled={currentPage === totalPages}>Next</button>
    </BaseBackgroundColor>
  );
}

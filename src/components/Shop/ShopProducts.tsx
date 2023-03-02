import { Category, Product } from "@/types/models"
import { setUserId } from "firebase/analytics"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BaseBackgroundColor, MainDivBg, SecondarySpanColor, Select } from "../Other/GlobalComponent"
import SearchDisplay from "../SearchBar/SearchDisplay"
import { HomeItem } from "../Product/Product"
import style from '@/styles/Product/search.module.scss'


export default function ShopProducts() {
    const r = useRouter()
    const [products, setProducts] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [shop_id, setShop_id] = useState(r.query.user_id || '');
    const [target, setTarget] = useState(r.query.target || "none");
    const [category_id, setCategory_id] = useState(r.query.category_id || 0);
    const [totalItems, settotalItems] = useState(0)
    const [uniqueCategories, setUniqueCategories] = useState<Category[]>([]);
    const [uniqueCats, setUniqueCats] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/api/shop/products?user_id=${shop_id}&page=${currentPage}&name=${target}&category_id=${category_id}`);
            const data = await res.json();
            setProducts(data.products);
            setTotalPages(data.totalPages);
            settotalItems(data.totalItems)
            // console.log(data);
        }
        const fetchResults = async () => {
            const res = await fetch(`http://localhost:8000/api/shop/home?user_id=${r.query.user_id}`);
            const data = await res.json();
            data.products.forEach((product: Product) => {
                if (!uniqueCats.find(cate => cate.id === product.category_id)) {
                    uniqueCats.push({
                        id: product.category_id,
                        name: product.category.name
                    });
                }
            });
            setUniqueCategories(uniqueCats);
        };

        if (r.query.user_id) {
            fetchResults();
        }

        fetchData();
    }, [shop_id, target, category_id, currentPage]);
    const HandleSearch = (event: any) => {
        event.preventDefault();
        setTarget(event.target.value);
    };
    const HandleSubmit = (event: any) => {
        event.preventDefault();
        setTarget(event.target.elements.search.value);
    };
    const prev = () => {
        setCurrentPage(currentPage - 1);
    };

    const next = () => {
        setCurrentPage(currentPage + 1);
    };
    return (
        <>
            <MainDivBg className="products_nav">
                <div className="search-container">
                    <SearchDisplay
                        HandleSearch={HandleSearch}
                        search="Explore Our Products"
                    />
                </div>
                <div className="select_cate_filter">
                    <Select

                        id="category-select"
                        value={category_id}
                        onChange={(e: Event) => setCategory_id(Number(e.target.value))}
                    >
                        <option value="0">All categories</option>
                        {uniqueCategories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <SecondarySpanColor className="total_items">
                    Total Items : {totalItems}
                </SecondarySpanColor>
            </MainDivBg>
            {/* Shop Id : {shop_id && (shop_id)}
            <br />
            Search target: {target && (target)}
            <br />
            Category id: {category_id && (category_id)}
            <br />
            Category List: <ul>
                {uniqueCategories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul> */}
            <HomeItem products={products} type={1} />
            <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={prev}
                onNextPage={next}
            />
        </>
    )
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

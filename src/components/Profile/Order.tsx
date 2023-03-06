import { Order } from "@/types/models"
import { useEffect, useState } from "react"
import SearchDisplay from "../SearchBar/SearchDisplay"
import { BaseBackgroundColor, MainDivBg, ProductDivBg, SecondaryH1Color, SecondarySpanColor, Select } from "../Other/GlobalComponent"
import OrderList from "./OrderList"
import { useRouter } from "next/router"


export default function MyOrder({ user, type }: any) {
    const [orders, setOrders] = useState<Order[]>([])
    const [name, setName] = useState("none")
    const [filter, setFilter] = useState("none")
    const r = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            if (type == "user") {
                const res = await fetch(`http://localhost:8000/api/order/view/user?user_id=${user.id}&filter=${filter}&name=${name}`)
                const data = await res.json()
                setOrders(data)
            } else if (type == "seller") {
                const res = await fetch(`http://localhost:8000/api/order/view/seller?shop_id=${user.id}&filter=${filter}&name=${name}`)
                const data = await res.json()
                setOrders(data)
            }
        }
        fetchData()
    }, [name, filter, r])
    const HandleSearch = (event: any) => {
        event.preventDefault();
        setName(event.target.value);
    };
    const HandleSubmit = (event: any) => {
        event.preventDefault();
        setName(event.target.elements.search.value);
    };

    return (
        <ProductDivBg>
            <div className="center_title">
                <SecondaryH1Color>
                    Order List
                </SecondaryH1Color>
            </div>
            <div className="products_nav">
                <div className="search-container">
                    <SearchDisplay
                        HandleSearch={HandleSearch}
                        HandleSubmit={HandleSubmit}
                        search={"Find Your Order"}
                    />
                </div>
                <div className="select_cate_filter">
                    <SecondarySpanColor>
                        Status Filter:
                    </SecondarySpanColor>
                    <Select
                        id="category-select"
                        value={filter}
                        onChange={(e: any) => setFilter(e.target.value)}
                    >
                        <option value="none">None</option>
                        <option value="pending">Pending</option>
                        <option value="success">Success</option>
                        <option value="cancel">Cancel</option>
                    </Select>
                </div>

            </div>
            <OrderList
                orders={orders}
                type={type}
                r={r}
            />

        </ProductDivBg>
    )
}
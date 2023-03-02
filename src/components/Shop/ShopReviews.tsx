import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReviewComment from "../Review/ReviewList";
import { HelpList, Review, User } from "@/types/models";
import { BaseBackgroundColor, Loading, MainDivBg, SecondaryH1Color, SecondarySpanColor, Select } from "../Other/GlobalComponent";
import style from '@/styles/Shop/reviews.module.scss'
import SearchDisplay from "../SearchBar/SearchDisplay";


export default function ShopReview({ user_id }: any) {
    const r = useRouter()
    const [shop_id, setShop_id] = useState(r.query.user_id || '');
    const [reviews, setrReviews] = useState<Review[]>([])
    const [name, setName] = useState(r.query.name || "none");
    const [filter, setFilter] = useState(r.query.filter || "none");
    const [totalReviews, setTotalReviews] = useState(0)
    const [averageRating, setAverageRating] = useState(0)
    const [fiveRating, setFiveRating] = useState(0)
    const [fourRating, setFourRating] = useState(0)
    const [threeRating, setThreeRating] = useState(0)
    const [twoRating, setTwoRating] = useState(0)
    const [oneRating, setOneRating] = useState(0)
    const [currUserId, setCurrUserId] = useState(user_id);
    const [helpList, setHelpList] = useState<HelpList[]>([])
    let i = 1;
    useEffect(() => {
        // Fetch help list data from API
        async function fetchHelpList() {
            const response = await fetch(`http://localhost:8000/api/shop/helplist/read?user_id=${currUserId}`);
            const data = await response.json();
            console.log(data);

            setHelpList(data);
        }
        fetchHelpList();
    }, [currUserId, helpList]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/api/shop/reviews?shop_id=${shop_id}&name=${name}&filter=${filter}`);
            const data = await res.json();
            setrReviews(data.reviews)
            setTotalReviews(data.totalItems)
            setAverageRating(data.averageRatings)
            setFiveRating(data.fiveRating)
            setFourRating(data.fourRating)
            setThreeRating(data.threeRating)
            setTwoRating(data.twoRating)
            setOneRating(data.oneRating)
            console.log(data);
        }

        fetchData()

    }, [shop_id, name, filter])
    const HandleSearch = (event: any) => {
        event.preventDefault();
        setName(event.target.value);
    };
    const HandleSubmit = (event: any) => {
        event.preventDefault();
        setName(event.target.elements.search.value);
    };
    return (
        <BaseBackgroundColor className={style.reviews_page}>
            <div className={style.statistic}>
                <div className={style.left_statistic}>
                    <SecondaryH1Color className={style.total_container}>
                        Total Reviews : {totalReviews}
                    </SecondaryH1Color>
                    <br />
                    <SecondarySpanColor className={style.total_container}>
                        <div className={style.left_temp}>
                            Average Rating :
                        </div>
                        <progress value={averageRating} max="5"></progress> {averageRating} / 5
                    </SecondarySpanColor>
                    <br />
                    <SecondarySpanColor className={style.total_container}>
                        <div className={style.left_temp}>
                            Five Star Rating :
                        </div>
                        <progress value={fiveRating} max="100"></progress> {fiveRating} %
                    </SecondarySpanColor>
                    <br />
                    <SecondarySpanColor className={style.total_container}>
                        <div className={style.left_temp}>
                            Four Star Rating :
                        </div>
                        <progress value={fourRating} max="100"></progress> {fourRating} %
                    </SecondarySpanColor>
                    <br />
                    <SecondarySpanColor className={style.total_container}>
                        <div className={style.left_temp}>
                            Three Star Rating :
                        </div>
                        <progress value={threeRating} max="100"></progress> {threeRating} %
                    </SecondarySpanColor>
                    <br />
                    <SecondarySpanColor className={style.total_container}>
                        <div className={style.left_temp}>
                            Two Star Rating :
                        </div>
                        <progress value={twoRating} max="100"></progress> {twoRating} %
                    </SecondarySpanColor>
                    <br />
                    <SecondarySpanColor className={style.total_container}>
                        <div className={style.left_temp}>
                            One Star Rating :
                        </div>
                        <progress value={oneRating} max="100"></progress> {oneRating} %
                    </SecondarySpanColor>
                    <br />

                </div>
                <div className={style.right_statistic}>

                </div>
            </div>
            <div className={style.review_box}>
                <div className="products_nav">
                    <div className="search-container">
                        <SearchDisplay
                            HandleSearch={HandleSearch}
                            HandleSubmit={HandleSubmit}
                        />
                    </div>
                    <div className="select_cate_filter">
                        <SecondarySpanColor>
                            Time Filter:
                        </SecondarySpanColor>
                        <Select
                            id="category-select"
                            value={filter}
                            onChange={(e: Event) => setFilter(e.target.value)}
                        >
                            <option value="none">None</option>
                            <option value="asc">From Oldest</option>
                            <option value="desc">From Newest </option>
                        </Select>
                    </div>
                </div>

                <ReviewComment
                    reviews={reviews}
                    helpList={helpList}
                    user_id={user_id}
                />

            </div>
        </BaseBackgroundColor>

    )
}
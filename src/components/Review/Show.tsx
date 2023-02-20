import { Review } from "@/types/models";
import style from '@/styles/Product/detail.module.scss'
import { useEffect, useState } from "react";
import { SecondaryBoldColor, SecondarySpanColor } from "../Other/GlobalComponent";
interface Props {
    product_id: number;
    user_id: number;
}

export default function ReviewList({ product_id, user_id }: Props) {
    const [reviews, setReviews] = useState<Review[]>([]);
    function HandleDelete(e: React.MouseEvent<HTMLButtonElement>, user_id: number, product_id: number, id: number) {
        e.preventDefault();
        fetch(`http://localhost:8000/api/review/delete?user_id=${user_id}&product_id=${product_id}&id=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            if (response.ok) {
                alert("Comment Removed")
                const updatedReviews = reviews.filter((review) => review.id !== id);
                setReviews(updatedReviews);
            } else {
                alert(response.statusText);
            }
    
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/review/view?product_id=${product_id}`);
            const data = await response.json();
            setReviews(data);

        };

        fetchData();
    }, [reviews]);

    return (
        (reviews.length > 0 ? (
            <div className={style.review_list}>
                {reviews.map(review => (
                    <div key={review.id} className={style.review_container}>
                        <div className={style.top}>
                            <SecondaryBoldColor>{review.user?.firstName}</SecondaryBoldColor>
                            <div className={style.button_container} >
                                {review.user?.id === user_id && ( // check if user ids match
                                    <>
                                        <button className={style.update_review}>
                                            <i className="uil uil-edit"></i>
                                        </button>
                                        <button className={style.delete_review}
                                        onClick={(e)=> HandleDelete(e,user_id,product_id,review.id)}>
                                            <i className="uil uil-trash"></i>
                                        </button>
                                    </>
                                )}
                            </div>

                        </div>
                        <div className={style.middle}>
                            <SecondarySpanColor>Rating: {review.rating}</SecondarySpanColor>
                            <SecondarySpanColor>Created at: {review.created_at.toString()}</SecondarySpanColor>
                        </div>
                        <SecondarySpanColor>{review.comment}</SecondarySpanColor>
                    </div>
                ))}
            </div>
        ) : (
            <div>
            </div>
        ))
    );

}
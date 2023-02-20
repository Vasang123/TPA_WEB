import { Review } from "@/types/models";
import axios from "axios";
import { useEffect, useState } from "react";
interface Props {
    product_id: number;
}

export default function ReviewList({ product_id }: Props) {
    const [reviews, setReviews] = useState<Review[]>([]);

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
            <div>
                {reviews.map(review => (
                    <div key={review.id}>
                        <p>{review.comment}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Created at: {review.created_at.toString()}</p>
                        <p>Modified at: {review.modified_at.toString()}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div>

            </div>
        ))
    );
}
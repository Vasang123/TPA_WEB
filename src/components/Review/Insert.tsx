import { Review } from '@/types/models';
import { useState } from 'react';
import { add_review } from '../RequestComponent';
import style from '@/styles/Product/detail.module.scss'
import { Input, TextArea } from '../Other/InputComponent';
import { SecondarySpanColor } from '../Other/GlobalComponent';
import ReviewForm from './Form';
interface Props {
    product_id: number;
    user_id: number;
}

export default function InsertComment({ product_id, user_id }: Props) {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [review, setReview] = useState<Review>();



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (rating.trim() == '') {
            alert("Rating can't be null")
        } else if (comment.trim() == '') {
            alert("Comment can't be null")
        } else {
            // Create a new review object
            const newReview: Review = {
                id: 0,
                user_id: user_id,
                rating: parseFloat(rating),
                comment: comment,
                product_id: product_id,
                created_at: new Date(),
                modified_at: new Date(),
                user: undefined,
            };
            await add_review(newReview)

            // Update the review state with the new review object
            setReview(newReview);

            // Reset the rating and comment inputs
            setRating('');
            setComment('');

        }
    };

    return product_id ? (
        (user_id ? (
            <ReviewForm
                handleSubmit={handleSubmit}
                rating={rating}
                comment={comment}
                setRating={setRating}
                setComment={setComment}
                css={style.review_input} />
        ) :
            (
                <div>

                </div>
            )
        )
    ) : null;
}

import { Review, WishlistReview } from '@/types/models';
import { useState } from 'react';
import style from '@/styles/Wishlist/review/form.module.scss'
import ReviewForm from './Form';
import { add_review, add_wishlist_review } from '@/components/RequestComponent';
interface Props {
    user_id: number;
    wishlist_id: number;
}

export default function InsertComment({ wishlist_id, user_id }: Props) {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [review, setReview] = useState<WishlistReview>();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title.trim() == '') {
            alert("Title can't be null")
        } else if (rating.trim() == '') {
            alert("Rating can't be null")
        } else if (comment.trim() == '') {
            alert("Comment can't be null")
        } else {
            const newReview: WishlistReview = {
                id: 0,
                name: name,
                user_id: user_id,
                title: title,
                rating: parseFloat(rating),
                comment: comment,
                wishlist_id: wishlist_id,
                created_at: new Date(),
                modified_at: new Date(),
            };
            await add_wishlist_review(newReview)

            setReview(newReview);

            setRating('');
            setComment('');
            setName('');
            setTitle('');

        }
    };

    return wishlist_id ? (
        (user_id ? (
            <ReviewForm
                handleSubmit={handleSubmit}
                rating={rating}
                name={name}
                setName={setName}
                review_title={title}
                setTitle={setTitle}
                comment={comment}
                setRating={setRating}
                setComment={setComment}
                css={style.review_input}
                title={"Add Review"} />
        ) :
            (
                <div>

                </div>
            )
        )
    ) : null;
}

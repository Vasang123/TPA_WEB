import { Review } from "@/types/models";
import { useContext, useEffect, useState } from "react";
import ReviewForm from "./Form";
import { update_review } from "../RequestComponent";
import { LanguageContext } from "../Language/LanguageContext";
import ReviewComment from "./ReviewList";
import style from '@/styles/Product/detail.module.scss'
interface Props {
    product_id: number;
    user_id: number;
}

export default function ReviewList({ product_id, user_id }: Props) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [selectedReview, setSelectedReview] = useState<Review>();
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const { lang } = useContext(LanguageContext);
    const handleEditDialogClose = () => {
        setShowEditDialog(false);
    };
    const handleEditDialogOpen = (review: Review) => {
        setComment(review.comment)
        setRating(review.rating.toString())
        setSelectedReview(review);
        setShowEditDialog(true);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (rating.trim() == '') {
            alert("Rating can't be null")
        } else if (comment.trim() == '') {
            alert("Comment can't be null")
        } else {
            if (selectedReview) {
                const updateReview: Review = {
                    id: selectedReview.id,
                    user_id: user_id,
                    rating: parseFloat(rating),
                    comment: comment,
                    product_id: product_id,
                    modified_at: new Date(),
                };
                await update_review(updateReview)
                handleEditDialogClose()
            }
            setRating('');
            setComment('');

        }
    };
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
        <>
            {showEditDialog && selectedReview && (
                <div className={style.dialog}>
                    <div className={style.dialogContent}>

                        <ReviewForm
                            handleSubmit={handleSubmit}
                            rating={rating}
                            comment={comment}
                            setRating={setRating}
                            setComment={setComment}
                            handleCancel={handleEditDialogClose}
                            css={style.review_update}
                            title={lang.is_eng == true ? 'Edit Review: ' : 'Ubah Review: '} />
                    </div>
                </div>
            )}
            <ReviewComment
                user_id={user_id}
                reviews={reviews}
                product_id={product_id}
                handleEditDialogClose={handleEditDialogClose}
                handleEditDialogOpen={handleEditDialogOpen}
                HandleDelete={HandleDelete}
                type={1}
            />

        </>
    );

}
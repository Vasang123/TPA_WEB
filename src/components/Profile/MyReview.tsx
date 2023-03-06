import { Review } from "@/types/models"
import { useContext, useEffect, useState } from "react"
import ReviewComment from "../Review/ReviewList"
import { ProductDivBg } from "../Other/GlobalComponent"
import { update_review } from "../RequestComponent"
import style from '@/styles/Product/detail.module.scss'
import ReviewForm from "../Review/Form"
import { LanguageContext } from "../Language/LanguageContext"

export default function MyReview({ user }: any) {
    const [reviews, setReviews] = useState<Review[]>([])
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review>();
    const [rating, setRating] = useState('');
    const { lang } = useContext(LanguageContext);
    const [productId, setProductId] = useState(0)
    const [comment, setComment] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/api/review/user?user_id=${user.id}`)

            const data = await res.json()
            setReviews(data)
        }
        fetchData()
    }, [reviews])
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
    const handleEditDialogOpen = (review: Review, product_id: number) => {
        setComment(review.comment)
        setRating(review.rating.toString())
        setSelectedReview(review);
        setShowEditDialog(true);
        setProductId(product_id)
    };
    const handleEditDialogClose = () => {
        setShowEditDialog(false);
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
                    user_id: user.id,
                    rating: parseFloat(rating),
                    comment: comment,
                    product_id: productId,
                    modified_at: new Date(),
                };
                await update_review(updateReview)
                handleEditDialogClose()
            }
            setRating('');
            setComment('');

        }
    };
    return (

        <ProductDivBg className="my_review">
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
                reviews={reviews}
                user_id={user.id}
                handleEditDialogClose={handleEditDialogClose}
                handleEditDialogOpen={handleEditDialogOpen}
                css={style.review_update}
                HandleDelete={HandleDelete}
                type={3}
            />
        </ProductDivBg>
    )
}
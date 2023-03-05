import { Review, WishlistReview } from "@/types/models";
import style from '@/styles/Wishlist/review/list.module.scss'
import { useEffect, useState } from "react";
import ReviewForm from "./Form";
import { SecondaryBoldColor, SecondarySpanColor } from "@/components/Other/GlobalComponent";
interface Props {
    wishlist_id: number;
    user_id: number;
}

export default function ReviewList({ wishlist_id, user_id }: Props) {
    const [reviews, setReviews] = useState<WishlistReview[]>([]);
    const [selectedReview, setSelectedReview] = useState<WishlistReview>();
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const handleEditDialogClose = () => {
        setShowEditDialog(false);
    };
    // const handleEditDialogOpen = (review: Review) => {
    //     setComment(review.comment)
    //     setRating(review.rating.toString())
    //     setSelectedReview(review);
    //     setShowEditDialog(true);
    // };
    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (rating.trim() == '') {
    //         alert("Rating can't be null")
    //     } else if (comment.trim() == '') {
    //         alert("Comment can't be null")
    //     } else {
    //         if (selectedReview) {
    //             const updateReview: Review = {
    //                 id: selectedReview.id,
    //                 user_id: user_id,
    //                 rating: parseFloat(rating),
    //                 comment: comment,
    //                 product_id: product_id,
    //                 modified_at: new Date(),
    //             };
    //             // await update_review(updateReview)
    //             handleEditDialogClose()
    //         }
    //         setRating('');
    //         setComment('');

    //     }
    // };
    // function HandleDelete(e: React.MouseEvent<HTMLButtonElement>, user_id: number, product_id: number, id: number) {
    //     e.preventDefault();
    //     fetch(`http://localhost:8000/api/review/delete?user_id=${user_id}&product_id=${product_id}&id=${id}`, {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //     }).then(response => {
    //         if (response.ok) {
    //             alert("Comment Removed")
    //             const updatedReviews = reviews.filter((review) => review.id !== id);
    //             setReviews(updatedReviews);
    //         } else {
    //             alert(response.statusText);
    //         }

    //     }).catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);
    //     });
    // }


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/wishlist/review/view?wishlist_id=${wishlist_id}`);
            const data = await response.json();
            setReviews(data);

        };

        fetchData();
    }, [reviews, comment]);
    return (
        <>
            {/* {showEditDialog && selectedReview && (
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
                            title="Edit Review" />
                    </div>
                </div>
            )} */}
            {reviews.length > 0 ? (
                <div className={style.review_list}>
                    {reviews.map(review => (
                        <div key={review.id} className={style.review_container}>
                            <div className={style.top}>

                                {
                                    review.name == '' ? (
                                        <SecondaryBoldColor>
                                            Anonymous
                                        </SecondaryBoldColor>
                                    ) : (
                                        <SecondaryBoldColor>
                                            {review.name}
                                        </SecondaryBoldColor>
                                    )
                                }

                                {/* <div className={style.button_container} >
                                    {review.user?.id === user_id && ( // check if user ids match
                                        <>
                                            <button className={style.update_review}
                                                onClick={() => handleEditDialogOpen(review)}>
                                                <i className="uil uil-edit"></i>
                                            </button>
                                            <button className={style.delete_review}
                                                onClick={(e) => HandleDelete(e, user_id, product_id, review.id)}>
                                                <i className="uil uil-trash"></i>
                                            </button>
                                        </>
                                    )}
                                </div> */}

                            </div>
                            <div className={style.middle}>
                                <SecondarySpanColor>Title: {review.title}</SecondarySpanColor>
                                <SecondarySpanColor>Rating: {review.rating}</SecondarySpanColor>
                                <SecondarySpanColor>Created at: {review.created_at?.toString()}</SecondarySpanColor>
                            </div>
                            <SecondarySpanColor>{review.comment}</SecondarySpanColor>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                </div>
            )}
        </>
    );

}
import { HelpList } from "@/types/models";
import { Loading, SecondaryBoldColor, SecondaryH1Color, SecondaryLinkColor3, SecondarySpanColor } from "../Other/GlobalComponent";
import style from '@/styles/Product/detail.module.scss'
import { help_handle } from "../RequestComponent";

export default function ReviewComment({
    reviews,
    user_id,
    handleEditDialogOpen,
    HandleDelete,
    product_id,
    type,
    helpList,
}: any) {
    if (!Array.isArray(reviews)) {
        return (
            <SecondaryBoldColor>
                No reviews found
            </SecondaryBoldColor>
        )
    }
    const handleHelpfulClick = async (e: Event, review_id: number, status: string) => {
        e.preventDefault()
        const help: HelpList = {
            id: 0,
            user_id: user_id,
            status: status,
            review_id: review_id
        };
        await help_handle(help)

    }
    return (
        <>
            {
                reviews.length > 0 ? (
                    <div className={style.review_list}>
                        {reviews.map(review => {
                            // console.log(helpList);

                            let helpListItem;
                            if (Array.isArray(helpList)) {
                                helpListItem = helpList.find(item => item.review_id === review.id);

                            }
                            return (
                                <div key={review.id} className={style.review_container}>
                                    <div className={style.top}>
                                        <SecondaryBoldColor>{review.user?.firstName}</SecondaryBoldColor>
                                        <div className={style.button_container} >
                                            {review.user?.id === user_id && type == 1 && (
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
                                            {review.user?.id === user_id && type == 3 && (
                                                <>
                                                    <button className={style.update_review}
                                                        onClick={() => handleEditDialogOpen(review, review.product.id)}>
                                                        <i className="uil uil-edit"></i>
                                                    </button>
                                                    <button className={style.delete_review}
                                                        onClick={(e) => HandleDelete(e, user_id, review.product.id, review.id)}>
                                                        <i className="uil uil-trash"></i>
                                                    </button>
                                                </>
                                            )}
                                            {helpList && (
                                                <div className={style.helpful_buttons}>
                                                    {helpListItem && helpListItem.status == "like" ? (
                                                        <button className={style.helpful_button_active}>
                                                            <i className="uil uil-thumbs-up"></i>
                                                        </button>
                                                    ) : (
                                                        <button className={style.helpful_button} onClick={(e) => handleHelpfulClick(e, review.id, "like")}>
                                                            <i className="uil uil-thumbs-up"></i>
                                                        </button>
                                                    )}
                                                    {helpListItem && helpListItem.status == "not_like" ? (
                                                        <button className={style.unhelpful_button_active}>
                                                            <i className="uil uil-thumbs-down"></i>
                                                        </button>
                                                    ) : (
                                                        <button className={style.unhelpful_button} onClick={(e) => handleHelpfulClick(e, review.id, "not_like")}>
                                                            <i className="uil uil-thumbs-down"></i>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={style.middle}>
                                        <SecondarySpanColor>Rating: {review.rating}</SecondarySpanColor>
                                        <SecondarySpanColor>Created at: {review.created_at.toString()}</SecondarySpanColor>
                                    </div>
                                    {
                                        type == 3 && (
                                            <div className={style.middle}>
                                                <SecondarySpanColor>
                                                    Product: <SecondaryLinkColor3 href={`/products/detail?id=${encodeURIComponent(review.product.id)}`}>
                                                        <SecondaryH1Color>
                                                            {review.product.name}
                                                        </SecondaryH1Color>
                                                    </SecondaryLinkColor3>
                                                </SecondarySpanColor>
                                                <SecondarySpanColor>Modified at: {review.modified_at.toString()}</SecondarySpanColor>
                                            </div>
                                        )
                                    }
                                    <SecondarySpanColor>Review : </SecondarySpanColor>
                                    <br />
                                    <SecondarySpanColor>{review.comment}</SecondarySpanColor>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                    </div>
                )
            }
        </>
    )

}

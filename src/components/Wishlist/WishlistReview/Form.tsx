import { SecondaryH1Color, SecondarySpanColor } from "@/components/Other/GlobalComponent";
import style from '@/styles/Wishlist/review/form.module.scss'
import { Input, TextArea } from "@/components/Other/InputComponent";

export default function ReviewForm({
    rating,
    comment,
    name,
    review_title,
    setName,
    setTitle,
    setRating,
    setComment,
    handleSubmit,
    handleCancel,
    css,
    title }: any) {
    return (
        <div className={css}>
            <form onSubmit={handleSubmit}>
                <SecondaryH1Color>{title}</SecondaryH1Color>
                <div className={style.three}>
                    <label className={style.rating_container}>
                        <SecondarySpanColor>
                            Name:
                        </SecondarySpanColor>
                        <Input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    </label>
                    <label className={style.rating_container}>
                        <SecondarySpanColor>
                            Title:
                        </SecondarySpanColor>
                        <Input type="text" value={review_title} onChange={(event) => setTitle(event.target.value)} />
                    </label>
                    <label className={style.rating_container}>
                        <SecondarySpanColor>
                            Rating:
                        </SecondarySpanColor>
                        <Input type="text" value={rating} onChange={(event) => setRating(event.target.value)} />
                    </label>
                    <br />
                </div>
                <label className={style.comment_container}>
                    <SecondarySpanColor>
                        Comment:
                    </SecondarySpanColor>
                    <TextArea value={comment} onChange={(event) => setComment(event.target.value)} />
                </label>
                <br />

                <div className={style.form_button}>
                    <button type="submit" >Submit</button>
                    {handleCancel ? (
                        <button type="button" onClick={handleCancel} className={style.cancel}>Cancel</button>
                    ) : (
                        <div>

                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}
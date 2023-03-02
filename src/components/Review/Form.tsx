import { SecondaryH1Color, SecondarySpanColor } from "../Other/GlobalComponent";
import style from '@/styles/Product/detail.module.scss'
import { Input, TextArea } from "../Other/InputComponent";
import { useContext } from "react";
import { LanguageContext } from "../Language/LanguageContext";

export default function ReviewForm({
    rating,
    comment,
    setRating,
    setComment,
    handleSubmit,
    handleCancel,
    css,
    title }: any) {
    const { lang } = useContext(LanguageContext);
    return (
        <div className={css}>
            <form onSubmit={handleSubmit}>
                <SecondaryH1Color>{title}</SecondaryH1Color>
                <label className={style.rating_container}>
                    <SecondarySpanColor>
                        Rating:
                    </SecondarySpanColor>
                    <Input type="text" value={rating} onChange={(event) => setRating(event.target.value)} />
                </label>
                <br />
                <label className={style.comment_container}>
                    <SecondarySpanColor>

                        {lang.is_eng == true ? 'Comment: ' : 'Komen: '}


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
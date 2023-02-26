import { SecondarySpanColor } from "@/components/Other/GlobalComponent";
import { TextArea } from "@/components/Other/InputComponent";
import { wish_note_controller } from "@/components/RequestComponent";
import style from '@/styles/Wishlist/wishlistnote.module.scss'
import { Wishlist } from "@/types/models";

export default function AddNote({
    user_id,
    wishlist_id,
    note,
    setNote,
}: any) {

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const newWish: Wishlist = {
            id: wishlist_id,
            note: note,
            name: '',
            user_id: user_id,
            privacy: ''
        };
        console.log("Masuk");

        await wish_note_controller(newWish)
    }

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <label className={style.note_container}>
                    <SecondarySpanColor>
                        Note:
                    </SecondarySpanColor>
                    <TextArea value={note} onChange={(event) => setNote(event.target.value)} />
                </label>
                <br />
                <div className={style.form_button}>
                    <button type="submit" >Save Note</button>
                </div>
            </form>
        </ div >
    )
}
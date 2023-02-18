import style from '@/styles/Admin/addvoucher.module.scss'
import { Input } from '../Other/InputComponent'
import { add_promo } from '../RequestComponent'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Promo } from '@/types/models';
import { BackButton, Loading, MainDivBg, SecondaryH1Color } from '../Other/GlobalComponent';
export default function PromoForm() {
    const [loading, setLoading] = useState(false);

    const [promo, setPromo] = useState<Promo>({
        id: 0,
        name :'',
        image: '',
        status: 'inactive'
    });
    const [imageFile, setImageFile] = useState<File>();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPromo({ ...promo, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImageFile(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (imageFile === undefined) {
            alert("Image can't be empty")
        } else {
            setLoading(true);

            // Call add_promo function and get the loading state
            const loading = await add_promo(promo, imageFile, router);

            // Set loading state to false
            setLoading(false);
        }
    };
    if (loading) {
        return <Loading>
            <div className="loading_content">
                Loading...
            </div>
        </Loading>;
    }
    return (
        <MainDivBg className={style.form_container}>
            <BackButton target="/admin/home" />
            <form action="" onSubmit={handleSubmit} >
                <SecondaryH1Color>Add Promo</SecondaryH1Color>
                <Input name="name" onChange={handleChange} type="text" id="" placeholder="Promo Name" />
                <Input name="image" onChange={handleImageChange} type="file" id="" placeholder="Image" />
                <div className={style.button_container}>
                    <button className={style.submit_button}>Add Promo</button>
                </div>
            </form>
        </MainDivBg>
    )
}
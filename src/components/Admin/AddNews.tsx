import style from '@/styles/Admin/addvoucher.module.scss'
import { Input, TextArea } from '../Other/InputComponent'
import { add_user, add_voucher, send_news } from '../RequestComponent'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Newsletter, Voucher } from '@/types/models';
import { BackButton, MainDivBg, SecondaryH1Color } from '../Other/GlobalComponent';
export default function NewsForm() {

    const router = useRouter();
    const [news, setNews] = useState<Newsletter>({
        title: '',
        content: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNews({ ...news, [name]: value });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (news.title === "") {
            alert("Title can't be empty")
        } else if (news.content === "") {
            alert("Content can't be empty")
        } else {
            send_news(news, router);
        }
    };
    return (
        <MainDivBg className={style.form_container}>
            <BackButton target="/admin/home" />
            <form action="" onSubmit={handleSubmit} >
                <SecondaryH1Color>Send Newsletter</SecondaryH1Color>
                <Input name="title" onChange={handleChange} type="text" id="" placeholder="Title" />
                <TextArea name="content" onChange={handleChange} placeholder="Description"></TextArea>
                <div className={style.button_container}>
                    <button className={style.submit_button}>Send</button>
                </div>
            </form>
        </MainDivBg>
    )
}
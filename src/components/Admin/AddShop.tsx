import style from '@/styles/Admin/addvoucher.module.scss'
import { Input } from '../Other/InputComponent'
import { add_user } from '../RequestComponent'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { User } from '@/types/models';
import { BackButton, MainDivBg, SecondaryH1Color } from '../Other/GlobalComponent';
export default function ShopForm() {
    const [user, setUser] = useState<User>({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role_id: 2,
        password: '',
        isBanned: 'no',
        isSubscribed: 'no'
    });
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.firstName === "") {
            alert("Shop name can't be empty")
        } else if (user.email === "") {
            alert("Email can't be empty")
        } else if (user.password === "") {
            alert("Password can't be empty")
        }else{
            add_user(user, router);
        }

    };
    return (
        <MainDivBg className={style.form_container}>
            <BackButton target="/admin/home" />
            <form action="" onSubmit={handleSubmit} >
                <SecondaryH1Color>Add Shop</SecondaryH1Color>
                <Input name="firstName" onChange={handleChange} type="text" id="" placeholder="Shop Name" />
                <Input name="email" onChange={handleChange} type="email" placeholder="Shop Email" />
                <Input name="password" onChange={handleChange} type="text" placeholder="Shop Password" />
                <div className={style.button_container}>
                    <button className={style.submit_button}>Add Shop</button>
                </div>
            </form>
        </MainDivBg>
    )
}
import style from '@/styles/Admin/addvoucher.module.scss'
import { Input, TextArea } from '../Other/InputComponent'
import {add_user, add_voucher} from '../RequestComponent'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Voucher } from '@/types/models';
import { BackButton, MainDivBg, SecondaryH1Color } from '../Other/GlobalComponent';
export default function VoucherForm(){

    const router = useRouter();
    const [voucher, setVoucher] = useState<Voucher>({
        id: 0,
        name : '',
        description : '',
        quantity : 0,
      });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "quantity") {
         const quantityAsNumber = parseInt(voucher.quantity, 10);
            setVoucher({ ...voucher, [name]: parseInt(value) });
        } else {
            setVoucher({ ...voucher, [name]: value });
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(voucher.name === ""){
            alert("Voucher name can't be empty")
        }else if(voucher.quantity  <= 0){
            alert("Voucher Quantity must be greater than 0")
        }else if(voucher.description === ""){
            alert("Description can't be empty")
        }else {            
            add_voucher(voucher, router);
        }
    };
    return(
        <MainDivBg className={style.form_container}>
            <BackButton target="/admin/home"/>
            <form action="" onSubmit={handleSubmit} >
                <SecondaryH1Color>Create Voucher</SecondaryH1Color>
                <Input name="name"  onChange={handleChange} type="text" id="" placeholder ="Voucher Code" />
                <Input name="quantity"  onChange={handleChange} type="number" placeholder ="Quantity" />
                <TextArea name="description" onChange = {handleChange} placeholder ="Description"></TextArea>
                <div className={style.button_container}>
                    <button className={style.submit_button}>Generate</button>
                </div>
            </form>
        </MainDivBg>
    )
}
import style from '@/styles/addvoucher.module.scss'
import { Input } from './InputComponent'
import {add_voucher} from './RequestComponent'
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Voucher } from '@/types/models';
import { ThemeContext } from './ThemeContext';
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
            console.log(voucher);
            
            add_voucher(voucher, router);
        }
    };
    return(
        <div className={style.form_container}>
            <form action="" onSubmit={handleSubmit} >
                <label htmlFor="">Voucher Code</label>
                <Input name="name"  onChange={handleChange} type="text" id="" />
                <label htmlFor="">Voucher Quantity</label>
                <Input name="quantity"  onChange={handleChange} type="number" />
                <label htmlFor="">Description</label>
                <input name="description" onChange = {handleChange} ></input>
                <div className={style.button_container}>
                    <button className={style.submit_button}>Generate</button>
                </div>
            </form>
        </div>
    )
}
import VoucherForm from "@/components/AddVoucher";
import { ThemeContext } from "@/components/ThemeContext";
import { Voucher } from "@/types/models";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function AddVoucher(){
    const r = useRouter();
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        async function checkUser (){
            const userData = JSON.parse(localStorage.getItem('user'));

            if (userData === null) {
                r.back();
            }else{
                if(userData.role_id == 3){
                    setLoading(false)
                }else{
                    r.back();
                }
            }
        }
        checkUser();
        
    });
    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    return(
        <>
        <VoucherForm/>    
        </>
    )
}
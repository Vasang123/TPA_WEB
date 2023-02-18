import ShopForm from "@/components/Admin/AddShop";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AddShop(){
    const r = useRouter();
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        async function checkUser (){
            const userDataString = (localStorage.getItem('user'));
            if(userDataString){
                const userData = JSON.parse(userDataString);
                if(userData.role_id == 3){
                    setLoading(false)
                }else{
                    r.back();
                }
            }else{
                r.back();
            }
        }
        checkUser();
        
    });
    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    return(
        <>
        <ShopForm/>    
        </>
    )
}
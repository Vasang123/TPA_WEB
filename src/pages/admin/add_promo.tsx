import PromoForm from "@/components/Admin/AddPromo";
import { Loading } from "@/components/Other/GlobalComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AddPromo(){
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
        return <Loading>
        <div className="loading_content">
            Loading...
        </div>
    </Loading>;
    }
    return(
        <>
        <PromoForm/>    
        </>
    )
}
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminHome from '@/components/AdminHome'
import { BaseBackgroundColor } from "@/components/GlobalComponent";
export default function AdminPag() { 
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
            <AdminHome/>
        </>
    )
 }
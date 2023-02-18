import TableDisplay from '@/components/Admin/TableUsers'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ViewUsers(){
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
            <TableDisplay/>
        </>
    )
}
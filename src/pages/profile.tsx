import LogoutButton from '@/components/Other/InputComponent'
import { Input }from '@/components/Other/InputComponent'
import Link from 'next/link'
import { Router, useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react'
import {Loading} from '@/components/Other/GlobalComponent'
export default function Profile(){
    const r = useRouter();
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        async function checkUser (){
            const userData = localStorage.getItem('user');
            if (userData === null) {
                r.back();
            }else{
                setLoading(false)
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
            <Link href="/">
                View My Shop
            </Link>
            <LogoutButton/>
        </>
    )
}
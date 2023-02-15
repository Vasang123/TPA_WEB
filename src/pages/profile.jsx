import LogoutButton from '@/components/InputComponent'
import { Input }from '@/components/InputComponent'
import Link from 'next/link'
import { Router, useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react'
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
        return <div className="loading">Loading...</div>;
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
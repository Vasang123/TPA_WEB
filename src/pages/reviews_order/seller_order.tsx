import LogoutButton from '@/components/Other/InputComponent'
import { Input } from '@/components/Other/InputComponent'
import Link from 'next/link'
import { Router, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { BackButton, Loading } from '@/components/Other/GlobalComponent'
import ProfileDisplay from '@/components/Profile/UserProfile';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Home/Footer';
import { User } from '@/types/models';
import ProfileNav from '@/components/Profile/ProfileNav';
import MyOrder from '@/components/Profile/Order';

export default function Profile() {
    const r = useRouter();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        async function checkUser() {
            const userDataStr = localStorage.getItem('user');
            if (userDataStr === null) {
                r.back();
            } else {
                setUserData(JSON.parse(userDataStr));
                RoleCheck(JSON.parse(userDataStr));
            }
        }

        function RoleCheck(userData: User) {
            if (userData.role_id == 1 || userData.role_id == 2 || userData.role_id == 3) {
                setLoading(false)
            } else {
                r.back()
            }
        }

        checkUser();
    }, [r]);

    if (loading) {
        return (
            <Loading>
                <div className="loading_content">
                    Loading...
                </div>
            </Loading>
        );
    }

    return (
        <>
            <Navbar />
            <ProfileNav user={userData} />
            <MyOrder user={userData} type={"seller"} />
            <Footer />
        </>
    )
}

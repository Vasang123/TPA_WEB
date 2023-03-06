import Link from "next/link";
import LogoutButton, { Input, LogoutButton2 } from "../Other/InputComponent";
import { BackButton, BaseBackgroundColor, MainDivBg, ProductDivBg, SecondaryH1Color, SecondarySpanColor } from "../Other/GlobalComponent";
import { UpdatePassword, UpdatePhone, User } from "@/types/models";
import { useEffect, useState } from "react";
import { update_password, update_phone } from "../RequestComponent";
import Image from "next/image";


export default function ProfileDisplay({ user }: any) {
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [money, setmoney] = useState()
    useEffect(() => {
        const fetchMoney = async () => {
            const res = await fetch(`http://localhost:8000/api/checkout/user_money?user_id=${user.id}`)
            const data = await res.json()
            setmoney(data)
        }
        fetchMoney()
    }, [money, user.id])

    const [currPass, setCurrPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const updatePhone = async (e: any) => {
        e.preventDefault()
        const newPhone: UpdatePhone = {
            user_id: user.id,
            new_phone_number: phoneNumber
        }
        await update_phone(newPhone)
        user.phoneNumber = phoneNumber
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
    }
    const updatePassword = async (e: any) => {
        e.preventDefault()
        const newPassword: UpdatePassword = {
            email: user.email,
            old_password: currPass,
            new_password: newPass
        }
        await update_password(newPassword)
    }
    return (
        <BaseBackgroundColor className="profile_page">
            <ProductDivBg className="profile_container">
                <SecondaryH1Color>Your Personal Information</SecondaryH1Color>
                {
                    user.role_id == 2 ? (
                        <>
                            {/* <SecondarySpanColor>Shop Name : {user.firstName}</SecondarySpanColor> */}

                        </>

                    ) : (
                        <>
                            <SecondarySpanColor>First Name : {user.firstName}</SecondarySpanColor>
                            <SecondarySpanColor>Last Name : {user.lastName}</SecondarySpanColor>
                        </>

                    )
                }

                <SecondarySpanColor>Email : {user.email}</SecondarySpanColor>
                <SecondarySpanColor className="primo">Genesis Crystal :
                    <Image src="https://firebasestorage.googleapis.com/v0/b/tpa-web-4d910.appspot.com/o/images%2FItem_Genesis_Crystal.webp?alt=media&token=040f3bc6-c3de-4e29-baee-5b8e9275d732"
                        alt=""
                        width={30}
                        height={30} />
                    {money}
                </SecondarySpanColor>
                <div className="update_profile_container">
                    <SecondarySpanColor>Phone Number :
                    </SecondarySpanColor>
                    <form onSubmit={updatePhone}>
                        <Input value={phoneNumber} onChange={(e: any) => setPhoneNumber(e.target.value)} />
                        <button>
                            Update
                        </button>
                    </form>
                </div>
                <div className="update_password_container">
                    <SecondarySpanColor>Change Password :
                    </SecondarySpanColor>
                    <form action="" onSubmit={updatePassword}>
                        <Input placeholder="Your Current Password" onChange={(e: any) => setCurrPass(e.target.value)} />
                        <Input placeholder="Your New Password" onChange={(e: any) => setNewPass(e.target.value)} />
                        <button>
                            Change Password
                        </button>
                    </form>
                </div>
                <LogoutButton2 />
            </ProductDivBg >
        </BaseBackgroundColor >

    )
}
// pages/users.js

import { useState, useEffect } from 'react';
import { BackButton, MainDivBg, SecondarySpanColor, Table, Td, Th } from '../Other/GlobalComponent';
import style from '@/styles/Admin/viewusers.module.scss'
import { User } from '@/types/models';

function TableDisplay() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/paginate_shops?page=${currentPage}`);
            const data = await response.json();
            setUsers(data.users);
            setTotalPages(data.totalPages);
        };

        fetchData();
    }, [currentPage]);
    // console.log(users);

    const prev = () => {
        setCurrentPage(currentPage - 1);
    };

    const next = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <MainDivBg className={style.table_bg}>
            <BackButton target="/admin/home/" />
            <div className={style.table_container}>
                <UserTable users={users} setUsers={setUsers} />
                <Paginate
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevPage={prev}
                    onNextPage={next}
                />
            </div>
        </MainDivBg >
    );
}
function getRoleName(roleId: number): string {
    if (roleId === 3) {
        return 'Admin';
    } else if (roleId === 1) {
        return 'User';
    } else if (roleId === 2) {
        return 'Seller';
    } else {
        return 'Unknown Role';
    }
}
function UserTable({ users, setUsers }: { users: User[], setUsers: Function }) {
    const userDataString = (localStorage.getItem('user'));
    let userData:any;
    if(userDataString){
        userData = JSON.parse(userDataString);   
    }
    function toggleBanStatus(userId: number, isBanned: string, status: number) {
        const updatedUserList = users.map((user: User) => {
            if (user.id === userId) {
                return { ...user, isBanned: isBanned };
            }
            return user;
        });
        fetch(`http://localhost:8000/api/ban/${userId}/${status}/${userData.role_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        setUsers(updatedUserList);

    }


    function handleBan(userId: number) {
        toggleBanStatus(userId, "yes", 1);
    }
    function handleUnban(userId: number) {
        toggleBanStatus(userId, "no", 0);
    }


    return (
        <Table>
            <thead>
                <tr>
                    <Th>ID</Th>
                    <Th>Shop Name</Th>
                    <Th>Shop Email</Th>
                    <Th>Phone Number</Th>
                    <Th>Role</Th>
                    <Th>Ban Status</Th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: any) => (
                    <tr key={user.id}>
                        <Td>{user.id}</Td>
                        <Td>{user.firstName}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.phoneNumber}</Td>
                        <Td>{getRoleName(user.role_id)}</Td>
                        <Td>
                            {user.isBanned == 'no' && (
                                <button className={style.ban} onClick={() => handleBan(user.id)}>
                                    Ban
                                </button>
                            )}
                            {
                                user.isBanned == 'yes' && (
                                    <button className={style.unban} onClick={() => handleUnban(user.id)}>
                                        Unban
                                    </button>
                                )
                            }
                        </Td>
                    </tr>
                ))}
            </tbody>
        </Table>


    );
}

function Paginate({ currentPage, totalPages, onPrevPage, onNextPage }: any) {
    return (
        <div className={style.paginate_container}>
            <button className={style.prev} onClick={onPrevPage} disabled={currentPage === 1}>Prev</button>
            <SecondarySpanColor className={style.pageNumber}>{currentPage} of {totalPages}</SecondarySpanColor>
            <button className={style.next} onClick={onNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
}

export default TableDisplay;

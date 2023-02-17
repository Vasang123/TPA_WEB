// pages/users.js

import { useState, useEffect } from 'react';
import { BackButton } from '../Other/GlobalComponent';

function TableDisplay() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/paginate_users?page=${currentPage}`);
            const data = await response.json();
            setUsers(data.users);
            setTotalPages(data.totalPages);
        };

        fetchData();
    }, [currentPage]);

    const prev = () => {
        setCurrentPage(currentPage - 1);
    };

    const next = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <BackButton target="/admin/home/" />
            <UserTable users={users} />
            <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={prev}
                onNextPage={next}
            />
        </div>
    );
}

function UserTable({ users }: any) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: any) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Paginate({ currentPage, totalPages, onPrevPage, onNextPage }: any) {
    return (
        <div>
            <button onClick={onPrevPage} disabled={currentPage === 1}>Prev</button>
            <span>{currentPage} of {totalPages}</span>
            <button onClick={onNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
}

export default TableDisplay;

import { useState, useEffect } from 'react';
import { BackButton, MainDivBg, SecondarySpanColor, Table, Td, Th } from '../Other/GlobalComponent';
import style from '@/styles/Admin/viewusers.module.scss'
import { Promo } from '@/types/models';

function TableDisplay() {
    const [promos, setPromos] = useState<Promo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/api/paginate_promos?page=${currentPage}`);
            const data = await response.json();
            setPromos(data.promos);
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
        <MainDivBg className={style.table_bg}>
            <BackButton target="/admin/home/" />
            <div className={style.table_container}>
                <PromoTable promos={promos} setPromos={setPromos} />
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
function PromoTable({ promos, setPromos }: { promos: Promo[], setPromos: Function }) {
    const userDataString = (localStorage.getItem('user'));
    
    let userData: any;
    if (userDataString) {
        userData = JSON.parse(userDataString);
    }
    function togglePromoStatus(promoId: number, status: string, status2: number) {
        const updatePromosList = promos.map((promo: Promo) => {
            if (promo.id === promoId) {
                return { ...promo, status: status };
            }
            return promo;
        });
        fetch(`http://localhost:8000/api/update/promo/${promoId}/${status2}/${userData.role_id}`, {
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
        setPromos(updatePromosList);

    }


    function handleActivateStatus(promoId: number) {
        togglePromoStatus(promoId, "active", 1);
    }
    function handleDeactivateStatus(promoId: number) {
        togglePromoStatus(promoId, "inactive", 0);
    }


    return (
        <Table>
            <thead>
                <tr>
                    <Th>ID</Th>
                    <Th>Promo Name</Th>
                    <Th>Promo Banner</Th>
                    <Th>Status</Th>
                </tr>
            </thead>
            <tbody>
                {promos.map((promo: any) => (
                    <tr key={promo.id}>
                        <Td>{promo.id}</Td>
                        <Td>{promo.name}</Td>
                        <Td>
                            <img src={promo.image} alt="" />
                        </Td>
                        <Td>
                            {promo.status == 'inactive' && (
                                <button className={style.unban} onClick={() => handleActivateStatus(promo.id)}>
                                    Activate
                                </button>
                            )}
                            {
                                promo.status == 'active' && (
                                    <button className={style.ban} onClick={() => handleDeactivateStatus(promo.id)}>
                                        Deactivate
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

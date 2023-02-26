import { useEffect, useState } from "react";
import WishlistDisplay, { Paginate } from "../WhislistComponent";
import next from "next/types";
import { Wishlist } from "@/types/models";
import CreateWishlist from "./CreateWishlist";


export default function WishlistPrivate({ user_id }: any) {
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [wishlists, setWishlists] = useState<Wishlist[]>([])
    const [itemsPerPage, setItemsPerPage] = useState(15)
    const [page, setPage] = useState(1)
    const prev = () => {
        setCurrentPage(currentPage - 1);
    };

    const next = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        fetch(`http://localhost:8000/api/wishlist/private/view?page=${currentPage}&itemsPerPage=${itemsPerPage}&user_id=${user_id}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);

                if (data.wishlists) {
                    setWishlists(data.wishlists)
                    setTotalPages(data.totalPages);
                }
            })
            .catch(error => console.error(error))
    }, [currentPage, wishlists])
    return (
        <div>
            <WishlistDisplay
                wishlists={wishlists}
                user_id={user_id}
                type={1} />
            <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={prev}
                onNextPage={next}
            />
        </div>
    )
}
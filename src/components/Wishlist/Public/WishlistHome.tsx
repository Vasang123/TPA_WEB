import { useEffect, useState } from "react";
import WishlistDisplay, { Paginate } from "../WhislistComponent";
import next from "next/types";
import { FavoriteList, Wishlist } from "@/types/models";
import { setFips } from "crypto";
import { useRouter } from "next/router";


export default function WishlistHome({ user_id }: any) {
    console.log(user_id);
    if (user_id == '') {
        user_id = 0

    }

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [wishlists, setWishlists] = useState<Wishlist[]>([])
    const [favorites, setFavorites] = useState<FavoriteList[]>([])
    const [itemsPerPage, setItemsPerPage] = useState(15)
    const [page, setPage] = useState(1)
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const r = useRouter()
    const prev = () => {
        setCurrentPage(currentPage - 1);
    };

    const next = () => {
        setCurrentPage(currentPage + 1);
    };
    const HandleLike = async (e: any, user_id: any, wishlist_id: any, path: any) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/api/favorite/add?user_id=${user_id}&wishlist_id=${wishlist_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            r.push(path)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

    }
    const HandleDislikeHome = async (e: any, user_id: any, wishlist_id: any, path: any) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/api/favorite/delete?user_id=${user_id}&wishlist_id=${wishlist_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            r.push(path)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:8000/api/wishlist/public/view?page=${currentPage}&itemsPerPage=${itemsPerPage}&user_id=${user_id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.wishlists) {
                        setWishlists(data.wishlists)
                        setTotalPages(data.totalPages);
                    }
                })
                .catch(error => console.error(error))
        }
        const fetchFav = async () => {
            fetch(`http://localhost:8000/api/favorite/view?user_id=${user_id}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data.favorites);

                    if (data.favorites) {
                        setFavorites(data.favorites)

                        // console.log(favorites);
                    } else {

                    }
                })
                .catch(error => console.error(error))
        }
        fetchData()
        fetchFav()
    }, [user_id, page, r])
    return (
        <div>
            <WishlistDisplay
                wishlists={wishlists}
                favorites={favorites}
                user_id={user_id}
                setFavorites={setFavorites}
                HandleLike={HandleLike}
                HandleDislikeHome={HandleDislikeHome}
                type={2}
            />
            <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={prev}
                onNextPage={next}
            />
        </div>
    )
}
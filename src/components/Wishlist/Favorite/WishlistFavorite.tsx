import { useEffect, useState } from "react";
import WishlistDisplay, { Paginate } from "../WhislistComponent";
import next from "next/types";
import { FavoriteList, Wishlist } from "@/types/models";
import { setFips } from "crypto";
import { useRouter } from "next/router";


export default function WishlistFav({ user_id }: any) {
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

    useEffect(() => {
        const fetchFav = async () => {
            fetch(`http://localhost:8000/api/my_favorite/view?user_id=${user_id}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data.favorites);

                    if (data.favorites) {
                        setFavorites(data.favorites)
                        const wishlistArray = data.favorites.map((favorite: FavoriteList) => favorite.wishlist);

                        const mergedWishlists = [].concat.apply([], wishlistArray);
                        setWishlists(mergedWishlists);
                        setTotalPages(data.totalPages);
                    } else {

                    }
                })
                .catch(error => console.error(error))
        }
        fetchFav()
    }, [currentPage, favorites])
    return (
        <div>
            <WishlistDisplay
                wishlists={wishlists}
                favorites={favorites}
                user_id={user_id}
                setFavorites={setFavorites}
                likeCount={likeCount}
                setLikeCount={setLikeCount}
                dislikeCount={dislikeCount}
                setDislikeCount={dislikeCount} />
            <Paginate
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={prev}
                onNextPage={next}
            />
        </div>
    )
}
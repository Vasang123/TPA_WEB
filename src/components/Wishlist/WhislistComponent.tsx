import style from '@/styles/Wishlist/wishlistcomponent.module.scss'
import Link from 'next/link'
import { BaseBackgroundColor, SecondaryDivColor3, SecondaryLinkColor } from '../Other/GlobalComponent'
import { useState, useEffect } from 'react'
import { Wishlist } from '@/types/models'
import { SecondarySpanColor } from '../Other/GlobalComponent'

export default function WishlistDisplay({ user_id, wishlists, favorites, likeCount, setLikeCount, dislikeCount, setDislikeCount }: any) {
    const HandleLike = async (e: any, user_id: any, wishlist_id: any) => {
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
            // setLikeCount(likeCount + 1);
            // alert(JSON.stringify(data.message));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }

    }
    const HandleDislike = async (e: any, user_id: any, wishlist_id: any) => {
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
            // setDislikeCount(dislikeCount + 1);
            // alert(JSON.stringify(data.message));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    return (
        <div>
            <BaseBackgroundColor className={style.list}>
                {wishlists.map(wishlist => (
                    (wishlist.image && (
                        <SecondaryDivColor3 SecondaryDivColor3 SecondaryDivColor3 SecondaryDivColor3 SecondaryDivColor3 key={wishlist.id} className={style.card} >

                            <div className={style.left}>
                                <div className={style.image_list}>
                                    {
                                        wishlist.image ? (
                                            <img src={wishlist.image} alt="" className={style.image} />
                                        ) : (
                                            < img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC" alt="" className={style.image} />)

                                    }
                                </div>
                            </div>
                            <div className={style.right}>
                                <h1>{wishlist.name}</h1>
                                {favorites && (favorites.some(fav => fav.wishlist_id === wishlist.id) ? (
                                    <button className={style.like_button} onClick={(e) => HandleDislike(e, user_id, wishlist.id)}>
                                        ❤️
                                    </button>
                                ) : (
                                    <button className={style.like_button} onClick={(e) => HandleLike(e, user_id, wishlist.id)}>
                                        🤍
                                    </button>
                                ))}

                                <button className={style.wish_button}>
                                    View Detail
                                </button>
                            </div>
                        </SecondaryDivColor3>
                    )

                    )
                ))
                }
            </BaseBackgroundColor >
        </div >
    )
}
export function Paginate({ currentPage, totalPages, onPrevPage, onNextPage }: any) {
    return (
        <BaseBackgroundColor className={style.paginate_container}>
            <button className={style.prev} onClick={onPrevPage} disabled={currentPage === 1}>Prev</button>
            <SecondarySpanColor className={style.pageNumber}>{currentPage} of {totalPages}</SecondarySpanColor>
            <button className={style.next} onClick={onNextPage} disabled={currentPage === totalPages}>Next</button>
        </BaseBackgroundColor>
    );
} 

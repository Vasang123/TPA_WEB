package model

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

type Review struct {
	ID         int64     `json:"id" pg:"id:bigserial pk"`
	Comment    string    `json:"comment"`
	Rating     float64   `json:"rating"`
	UserId     int64     `json:"user_id"`
	ProductId  int64     `json:"product_id"`
	CreatedAt  time.Time `json:"created_at" pg:"default:now()"`
	ModifiedAt time.Time `json:"modified_at" pg:"default:now()"`
	Product    Product   `json:"product"`
	User       User      `json:"user"`
}
type Message struct {
	ID           int64     `json:"id" pg:"id:bigserial pk"`
	Comment      string    `json:"comment"`
	SenderId     int64     `json:"sender_id"`
	ReceiverId   int64     `json:"receiver_id"`
	CreatedAt    time.Time `json:"created_at" pg:"default:now()"`
	SenderName   string    `json:"sender_name"`
	ReceiverName string    `json:"sender"`
}
type WishlistReview struct {
	ID         int64     `json:"id" pg:"id:bigserial pk"`
	Name       string    `json:"name"`
	Title      string    `json:"title"`
	Comment    string    `json:"comment"`
	Rating     float64   `json:"rating"`
	UserId     int64     `json:"user_id"`
	WishlistId int64     `json:"wishlist_id"`
	Wishlist   Wishlist  `json:"wishlist"`
	CreatedAt  time.Time `json:"created_at" pg:"default:now()"`
	ModifiedAt time.Time `json:"modified_at" pg:"default:now()"`
	User       User      `json:"user"`
}
type Cart struct {
	ID        int64   `json:"id" pg:"id:bigserial pk"`
	UserId    int64   `json:"user_id"`
	User      User    `json:"user"`
	Product   Product `json:"product"`
	ProductId int64   `json:"product_id"`
	Quantity  int     `json:"quantity"`
	IsLike    string  `json:"is_like"`
	OrderId   int     `json:"order_id"`
	Order     Order1  `json:"order"`
}
type Product struct {
	ID          int64    `json:"id" pg:"id:bigserial pk"`
	Name        string   `json:"name"`
	Quantity    int      `json:"quantity"`
	Price       int      `json:"price"`
	Image       string   `json:"image"`
	Description string   `json:"description"`
	Rating      float64  `json:"rating"`
	CategoryID  int64    `json:"category_id"`
	UserId      int64    `json:"user_id"`
	User        User     `json:"user"`
	Category    Category `json:"category"`
	BrandId     int64    `json:"brand_id"`
	Brand       Brand    `json:"brand"`
	Sold        int64    `json:"sold"`
}
type Brand struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}
type Address struct {
	ID     int64  `json:"id"`
	Name   string `json:"name"`
	UserId int64  `json:"user_id"`
}

type Category struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

type Voucher struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Bonus       int64  `json:"bonus"`
	Quantity    int64  `json:"quantity"`
}
type User struct {
	ID           int64  `json:"id" pg:"id:bigserial pk"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	Email        string `json:"email" pg:"unique"`
	Password     string `json:"password"`
	PhoneNumber  string `json:"phoneNumber"`
	RoleID       int64  `json:"role_id"`
	IsBanned     string `json:"isBanned"`
	IsSubscribed string `json:"isSubscribed"`
	Role         Role   `json:"role"`
	Money        int64  `json:"money"`
}
type Role struct {
	ID          int64  `json:"id" pg:"id:bigserial pk"`
	RoleName    string `json:"roleName"`
	Description string `json:"description"`
}
type Claim struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

type Promo struct {
	ID     int64  `json:"id" pg:"id:bigserial pk"`
	Name   string `json:"name"`
	Image  string `json:"image"`
	Status string `json:"status"`
}
type Wishlist struct {
	ID      int64  `json:"id" pg:"id:bigserial pk"`
	UserId  int64  `json:"user_id" pg:"-"`
	User    User   `json:"user"`
	Name    string `json:"name"`
	Privacy string `json:"privacy"`
	Image   string `json:"image"`
	Note    string `json:"note"`
}
type WishlistDetail struct {
	ID         int64    `json:"id" pg:"id:bigserial pk"`
	WishlistId int64    `json:"wishlist_id"`
	Wishlist   Wishlist `json:"wishlist"`
	Product    Product  `json:"product"`
	ProductId  int64    `json:"product_id"`
	Quantity   int      `json:"quantity"`
}

type FavoriteList struct {
	ID         int64    `json:"id" pg:"id:bigserial pk"`
	WishlistId int64    `json:"wishlist_id"`
	Wishlist   Wishlist `json:"wishlist"`
	UserId     int64    `json:"user_id" pg:"-"`
}
type HelpList struct {
	ID       int64  `json:"id" pg:"id:bigserial pk"`
	ReviewId int64  `json:"review_id"`
	Review   Review `json:"review"`
	UserId   int64  `json:"user_id" pg:"-"`
	Status   string `json:"status"`
	User     User   `json:"user"`
}

type UpdateWishlistRequest struct {
	Wishlists []Wishlist `json:"wishlists"`
}

type DuplicateRequest struct {
	Wishlist Wishlist         `json:"wishlist"`
	Items    []WishlistDetail `json:"items"`
}

type CartWithWishlist struct {
	Cart       Cart `json:"cart"`
	WishlistId int  `json:"wishlist_id"`
}

type WishlistWithCart struct {
	WishlistDetail WishlistDetail `json:"wishlist"`
	CartId         int            `json:"cart_id"`
}
type NewsLetter struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}
type Shop struct {
	ID     int64  `json:"id" pg:"id:bigserial pk"`
	Image  string `json:"image"`
	About  string `json:"about"`
	UserId int64  `json:"user_id" pg:"-"`
	User   User   `json:"user"`
}

type SearchFilter struct {
	Price   bool  `json:"price"`
	Sold    bool  `json:"sold"`
	Search1 bool  `json:"search1"`
	Search2 bool  `json:"search2"`
	Asc     bool  `json:"asc"`
	Desc    bool  `json:"desc"`
	Page    int64 `json:"page"`
}

type UpdatePhoneRequest struct {
	UserID         int64  `json:"user_id"`
	NewPhoneNumber string `json:"new_phone_number"`
}
type UpdateSubRequest struct {
	UserID    int64  `json:"user_id"`
	Subscribe string `json:"subscribe"`
}
type UpdateShopRequest struct {
	ShopId  int64  `json:"shop_id"`
	RoleId  int64  `json:"role_id"`
	UserId  int64  `json:"user_id"`
	NewData string `json:"new_name"`
}

type UpdatePasswordRequest struct {
	Email       string `json:"email"`
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}
type Order1 struct {
	ID         int64      `json:"id" pg:"id:bigserial pk"`
	Invoice    string     `json:"invoice"`
	CreatedAt  *time.Time `json:"created_at"`
	ModifiedAt time.Time  `json:"modified_at"`
	Payment    string     `json:"payment"`
	Delivery   string     `json:"delivery"`
	Total      int64      `json:"total"`
	AddressId  int64      `json:"address_id"`
	Address    Address    `json:"address"`
	UserId     int64      `json:"user_id"`
	ShopId     int64      `json:"shop_id"`
	Status     string     `json:"status"`
	BuyAgain   string     `json:"buy_again"`
}

package model

import (
	"github.com/dgrijalva/jwt-go"
)

type Product struct {
	ID          int64    `json:"id" pg:"id:bigserial pk"`
	Name        string   `json:"name"`
	Quantity    int      `json:"quantity"`
	Price       int      `json:"price"`
	Image       string   `json:"image"`
	Description string   `json:"description"`
	Rating      float64  `json:"rating"`
	CategoryID  int64    `json:"category_id"`
	StoreID     int64    `json:"store_id"`
	Store       Store    `json:"store"`
	Category    Category `json:"category"`
}
type Category struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}
type Store struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}
type Voucher struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
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
	Role         Store  `json:"role"`
}
type Role struct {
	ID       int64  `json:"id" pg:"id:bigserial pk"`
	RoleName string `json:"roleName"`
}
type Claim struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

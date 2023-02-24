package main

import (
	"log"
	"net/http"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/controller"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {

	corsOpts := cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}
	db := connect.Connect()
	defer db.Close()
	r := mux.NewRouter()
	//Home
	r.HandleFunc("/api/carousel", controller.GetCarouselData).Methods("GET")
	// Login Regis
	r.HandleFunc("/api/register", controller.Register).Methods("POST")
	r.HandleFunc("/api/login", controller.Login).Methods("POST")
	// Admin
	r.HandleFunc("/api/create_voucher", controller.AddVoucher).Methods("POST")
	r.HandleFunc("/api/create_promo", controller.AddPromo).Methods("POST")
	r.HandleFunc("/api/paginate_users", controller.PaginateUsers).Methods("GET").Queries("page", "{page}")
	r.HandleFunc("/api/paginate_shops", controller.PaginateShops).Methods("GET").
		Queries("page", "{page}", "status", "{status}")
	r.HandleFunc("/api/paginate_promos", controller.PaginatePromo).Methods("GET").Queries("page", "{page}")
	r.HandleFunc("/api/ban/{id}/{status}/{role_id}", controller.UpdateBanStatus).Methods("PUT")
	r.HandleFunc("/api/update/promo/{id}/{status}/{role_id}", controller.UpdatePromoStatus).Methods("PUT")
	// Products
	r.HandleFunc("/api/products", controller.GetProducts).Methods("GET").Queries("page", "{page}")
	r.HandleFunc("/api/search", controller.GetProduct).Methods("GET").
		Queries("name", "{name}", "page", "{page}")
	r.HandleFunc("/api/product/detail", controller.GetProductDetail).Methods("GET").Queries("id", "{id}")
	// Cart
	r.HandleFunc("/api/cart", controller.InsertCart).Methods("POST")
	r.HandleFunc("/api/cart/update", controller.UpdateWishlist).Methods("POST")
	r.HandleFunc("/api/cart/view", controller.GetProductCart).Methods("GET").
		Queries("user_id", "{user_id}", "is_like", "{is_like}")
	r.HandleFunc("/api/cart/delete", controller.DeleteCartItem).Methods("GET").
		Queries("user_id", "{user_id}", "product_id", "{product_id}", "is_like", "{is_like}")
	// Wishlist
	r.HandleFunc("/api/wishlist/create", controller.CreateWishlist).Methods("POST")
	r.HandleFunc("/api/wishlist/public/view", controller.PublicWishlist).Methods("GET").
		Queries("itemsPerPage", "{itemsPerPage}", "page", "{page}")
	r.HandleFunc("/api/wishlist/private/view", controller.PrivateWishlist).Methods("GET").
		Queries("itemsPerPage", "{itemsPerPage}", "page", "{page}", "user_id", "{user_id}")
	r.HandleFunc("/api/wishlist/update", controller.UpdateWishlistHeader).Methods("POST")
	r.HandleFunc("/api/wishlist/insert", controller.InsertWishlist).Methods("POST")
	r.HandleFunc("/api/wishlist/delete", controller.DeleteWishlist).Methods("GET").
		Queries("wish_id", "{wish_id}", "product_id", "{product_id}")
	// Review
	r.HandleFunc("/api/review/add", controller.InsertReview).Methods("POST")
	r.HandleFunc("/api/review/update", controller.UpdateReview).Methods("POST")
	r.HandleFunc("/api/review/view", controller.GetProductReview).Methods("GET").
		Queries("product_id", "{product_id}")
	r.HandleFunc("/api/review/delete", controller.DeleteReview).Methods("GET").
		Queries("user_id", "{user_id}", "product_id", "{product_id}", "id", "{id}")
	handler := cors.New(corsOpts).Handler(r)

	// Favorite List
	r.HandleFunc("/api/favorite/add", controller.AddFavourite).Methods("GET").
		Queries("user_id", "{user_id}", "wishlist_id", "{wishlist_id}")
	r.HandleFunc("/api/favorite/view", controller.ViewFavourite).Methods("GET").
		Queries("user_id", "{user_id}")
	r.HandleFunc("/api/my_favorite/view", controller.MyFavourite).Methods("GET").
		Queries("user_id", "{user_id}")
	r.HandleFunc("/api/favorite/delete", controller.DeleteFavourite).Methods("GET").
		Queries("user_id", "{user_id}", "wishlist_id", "{wishlist_id}")
	log.Fatal(http.ListenAndServe(":8000", handler))

}

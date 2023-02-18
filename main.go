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
	r.HandleFunc("/api/paginate_shops", controller.PaginateShops).Methods("GET").Queries("page", "{page}")
	r.HandleFunc("/api/paginate_promos", controller.PaginatePromo).Methods("GET").Queries("page", "{page}")
	r.HandleFunc("/api/ban/{id}/{status}/{role_id}", controller.UpdateBanStatus).Methods("PUT")
	r.HandleFunc("/api/update/promo/{id}/{status}/{role_id}", controller.UpdatePromoStatus).Methods("PUT")
	// Products
	r.HandleFunc("/api/products", controller.GetProducts).Methods("GET").Queries("page", "{page}")
	r.HandleFunc("/api/search", controller.GetProduct).Methods("GET").
		Queries("name", "{name}", "page", "{page}")
	r.HandleFunc("/api/products/{id}", controller.GetProduct).Methods("GET")
	r.HandleFunc("/api/products/{id}", controller.UpdateProduct).Methods("PATCH")
	r.HandleFunc("/api/products/{id}", controller.DeleteProduct).Methods("DELETE")
	handler := cors.New(corsOpts).Handler(r)
	log.Fatal(http.ListenAndServe(":8000", handler))

}

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
	r.HandleFunc("/api/products", controller.GetProducts).Methods("GET").Queries("page", "{page}")
	r.HandleFunc("/api/register", controller.Register).Methods("POST")
	r.HandleFunc("/api/login", controller.Login).Methods("POST")
	r.HandleFunc("/api/products", controller.GetProducts).Methods("GET")
	r.HandleFunc("/api/products/{id}", controller.GetProduct).Methods("GET")
	r.HandleFunc("/api/products/{id}", controller.UpdateProduct).Methods("PATCH")
	r.HandleFunc("/api/products/{id}", controller.DeleteProduct).Methods("DELETE")
	handler := cors.New(corsOpts).Handler(r)
	log.Fatal(http.ListenAndServe(":8000", handler))

}

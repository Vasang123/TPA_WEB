package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// Create Product
func CreateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get Connect
	db := connect.Connect()
	defer db.Close()

	// Creating Product Instance
	product := &model.Product{}

	// Decoding Request
	_ = json.NewDecoder(r.Body).Decode(&product)

	// Inserting Into Database
	_, err := db.Model(product).Insert()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Returning Product
	json.NewEncoder(w).Encode(product)
}

func GetProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get Connect
	db := connect.Connect()
	defer db.Close()

	// Get page number from query params
	page := 1
	if pageStr := r.URL.Query().Get("page"); pageStr != "" {
		if p, err := strconv.Atoi(pageStr); err == nil {
			page = p
		}
	}

	// Set page size and calculate offset
	pageSize := 20
	offset := (page - 1) * pageSize

	var products []*model.Product
	err := db.Model(&products).
		Column("product.*", "Store", "Category").
		Relation("Store").
		Relation("Category").
		Offset(offset).
		Limit(pageSize).
		Select()
	if err != nil {
		panic(err)
	}

	// Returning Products
	json.NewEncoder(w).Encode(products)
}

// Get Product
func GetProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get Connect
	db := connect.Connect()
	defer db.Close()

	// Get ID
	params := mux.Vars(r)
	productIDString := params["id"]
	productID, err := uuid.Parse(productIDString)
	if err != nil {
		// handle the error appropriately
	}

	productIDInt64 := int64(productID.Variant())

	// Creating Product Instance
	product := &model.Product{ID: productIDInt64}
	if err := db.Model(product).WherePK().Select(); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Returning Product
	json.NewEncoder(w).Encode(product)
}

// Update Product & Store*
func UpdateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get Connect
	db := connect.Connect()
	defer db.Close()

	// Get ID
	params := mux.Vars(r)
	productIDString := params["id"]
	productID, err := uuid.Parse(productIDString)
	if err != nil {
		// handle the error appropriately
	}

	productIDInt64 := int64(productID.Variant())

	// Creating Product Instance
	product := &model.Product{ID: productIDInt64}

	// Alternate Way To Include Store In Update
	// store := map[string]interface{}{
	// 	"id": product.Store.ID,
	// 	"name": product.Store.Name,
	// }
	// db.Model(product).WherePK().Set("name = ?, quantity = ?, price = ?, store = ?", product.Name, product.Quantity, product.Price, store).Update()

	_, err = db.Model(product).WherePK().Set("name = ?, quantity = ?, price = ?, store = ?", product.Name, product.Quantity, product.Price, product.Store).Update()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Returning Product
	json.NewEncoder(w).Encode(product)
}

// Delete Product
func DeleteProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get Connect
	db := connect.Connect()
	defer db.Close()

	// Get ID
	params := mux.Vars(r)
	productId := params["id"]

	// Creating Product Instance Alternative Way
	// product := &Product{ID: productId}
	// result, err := db.Model(product).WherePK().Delete()

	// Creating Product Instance
	product := &model.Product{}
	result, err := db.Model(product).Where("id = ?", productId).Delete()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Returning result
	json.NewEncoder(w).Encode(result)
}

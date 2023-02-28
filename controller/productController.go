package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func CreateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	product := &model.Product{}

	_ = json.NewDecoder(r.Body).Decode(&product)

	_, err := db.Model(product).Insert()
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(product)
}

// Done
func GetProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	page := 1
	if pageStr := r.URL.Query().Get("page"); pageStr != "" {
		if p, err := strconv.Atoi(pageStr); err == nil {
			page = p
		}
	}

	pageSize := 20
	offset := (page - 1) * pageSize

	var products []*model.Product
	err := db.Model(&products).
		Column("product.*", "User.first_name", "User.id", "Category", "Brand").
		Relation("User").
		Relation("Category").
		Relation("Brand").
		Order("id").
		Offset(offset).
		Limit(pageSize).
		Select()
	if err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(products)
}
func GetProductDetail(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db := connect.Connect()
	defer db.Close()
	idString := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idString)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	var product model.Product
	err = db.Model(&product).
		Column("product.*", "User.first_name", "User.id", "User.is_banned", "Category", "Brand").
		Relation("User").
		Relation("Category").
		Relation("Brand").
		Where("product.id  = ?", id).
		Limit(1).
		Select()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	json.NewEncoder(w).Encode(product)
}
func GetProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	itemsPerPage := 12
	name := r.URL.Query().Get("name")

	pattern := "%" + name + "%"
	var products []*model.Product
	err := db.Model(&products).
		Column("product.*", "User.first_name", "User.id", "Category", "Brand").
		Relation("User").
		Relation("Category").
		Relation("Brand").
		// Join("JOIN brands ON brands.id = product.brand_id").
		Where("product.name ILIKE ? OR brand.name ILIKE ?", pattern, pattern).
		// Where("product.name ILIKE ?", pattern).
		Order("id").
		Select()
	if len(products) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	totalPages := (len(products) + itemsPerPage - 1) / itemsPerPage
	pageNumber := 1

	if pageStr := r.URL.Query().Get("page"); pageStr != "" {
		if p, err := strconv.Atoi(pageStr); err == nil {
			pageNumber = p
		}
	}
	if pageNumber < 1 {
		pageNumber = 1
	}

	if pageNumber > totalPages {
		pageNumber = totalPages
	}
	startIndex := (pageNumber - 1) * itemsPerPage
	endIndex := startIndex + itemsPerPage
	if endIndex > len(products) {
		endIndex = len(products)
	}
	productsOnPage := products[startIndex:endIndex]
	response := struct {
		Products   []*model.Product `json:"products"`
		TotalPages int              `json:"totalPages"`
	}{
		Products:   productsOnPage,
		TotalPages: totalPages,
	}
	// Return the products as JSON
	json.NewEncoder(w).Encode(response)
}

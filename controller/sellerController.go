package controller

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func UpdateShopName(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	user := &model.UpdateShopRequest{}

	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		log.Println("Error decoding request payload:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding request payload"})
		return
	}
	if user.ShopId == user.UserId && user.RoleId != 1 {
		_, err = db.Model(&model.User{}).
			Set("first_name = ?", user.NewData).
			Where("id = ? ", user.ShopId).
			Update()
	}
	if err != nil {
		log.Println("Error updating shop name:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error updating shop name"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func UpdateShopBanner(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	user := &model.UpdateShopRequest{}

	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		log.Println("Error decoding request payload:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding request payload"})
		return
	}
	if user.ShopId == user.UserId && user.RoleId != 1 {
		_, err = db.Model(&model.Shop{}).
			Set("image = ?", user.NewData).
			Where("user_id = ? ", user.ShopId).
			Update()
	}
	if err != nil {
		log.Println("Error updating shop name:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error updating shop name"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func UpdateShopAbout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	user := &model.UpdateShopRequest{}

	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil {
		log.Println("Error decoding request payload:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding request payload"})
		return
	}
	if user.ShopId == user.UserId && user.RoleId != 1 {
		_, err = db.Model(&model.Shop{}).
			Set("about = ?", user.NewData).
			Where("user_id = ? ", user.ShopId).
			Update()
	}
	if err != nil {
		log.Println("Error updating shop name:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error updating shop name"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func GetBrandAndCategory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	var categories []*model.Category
	err := db.Model(&categories).
		Column("category.*").
		Select()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error retrieving category data"})
		return
	}
	var brands []*model.Brand
	err = db.Model(&brands).
		Column("brand.*").
		Select()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error retrieving brands data"})
		return
	}
	response := struct {
		Brands     []*model.Brand    `json:"brands"`
		Categories []*model.Category `json:"categories"`
	}{
		Brands:     brands,
		Categories: categories,
	}
	json.NewEncoder(w).Encode(response)
}
func InsertProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	product := &model.Product{}

	err := json.NewDecoder(r.Body).Decode(product)

	if err != nil {
		log.Println("Error decoding product payload:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding product payload"})
		return
	}

	err = db.Insert(product)
	if err != nil {
		log.Println("Error inserting product into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Insert Product"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func UpdateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	product := &model.Product{}

	err := json.NewDecoder(r.Body).Decode(product)
	if err != nil {
		log.Println("Error decoding product payload:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding product payload"})
		return
	}

	_, err = db.Query(
		context.Background(),
		"UPDATE products SET name=?, quantity=?, price=?, image=?, description=?, category_id=?, brand_id=? WHERE id=?",
		product.Name,
		product.Quantity,
		product.Price,
		product.Image,
		product.Description,
		product.CategoryID,
		product.BrandId,
		product.ID,
	)
	if err != nil {
		log.Println("Error updating product:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to update product"})
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

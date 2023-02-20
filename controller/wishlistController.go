package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func CreateWishlist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	wishlist := &model.Wishlist{}

	err := json.NewDecoder(r.Body).Decode(wishlist)
	if err != nil {
		log.Println("Error decoding wishlist payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding wishlist payload"})
		return
	}

	err = db.Insert(wishlist)
	if err != nil {
		log.Println("Error inserting wishlist into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Wishlist"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func UpdateWishlistHeader(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	wishlist := &model.Wishlist{}
	err := json.NewDecoder(r.Body).Decode(wishlist)
	if err != nil {
		log.Println("Error decoding wishlist payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding wishlist payload"})
		return
	}

	res, err := db.Model(wishlist).
		Column("privacy").
		Where("id = ? AND wishlist.user_id = ?", wishlist.ID, wishlist.UserId).
		Update()

	if err != nil {
		log.Println("Error updating wishlist into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Wishlist"})
		return
	}
	if res.RowsAffected() == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing to update"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func InsertWishlist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	wishlist := &model.WishlistDetail{}
	err := json.NewDecoder(r.Body).Decode(wishlist)
	if err != nil {
		log.Println("Error decoding wishlist payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding wishlist payload"})
		return
	}

	var existingWishlist model.WishlistDetail
	err = db.Model(&existingWishlist).
		Column("wishlist_detail.*", "Wishlist", "Product").
		Relation("Wishlist").
		Relation("Product").
		Where("wishlist_id = ? AND product_id = ?", wishlist.WishlistId, wishlist.ProductId).
		Limit(1).
		Select()

	if err != nil {
		// Item does not exist, insert it
		err = db.Insert(wishlist)
		if err != nil {
			log.Println("Error inserting wishlist into database:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Wishlist"})
			return
		}
	} else {
		newQuantity := wishlist.Quantity + existingWishlist.Quantity
		fmt.Print(wishlist.Quantity, "\n")
		fmt.Print(existingWishlist.Quantity, "\n")
		fmt.Print(existingWishlist.Product.Quantity, "\n")
		if newQuantity > existingWishlist.Product.Quantity {
			json.NewEncoder(w).Encode(map[string]string{"message": "Item Overload"})
			return
		}
		existingWishlist.Quantity = newQuantity
		_, err = db.Model(&existingWishlist).
			Set("quantity = ?", newQuantity).
			Where("wishlist_id = ? AND product_id = ?", wishlist.WishlistId, wishlist.ProductId).
			Update()
		if err != nil {
			log.Println("Error updating wishlist item:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Update Wishlist"})
			return
		}
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func DeleteWishlist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	wish_id := r.URL.Query().Get("wish_id")
	product_id := r.URL.Query().Get("product_id")
	wishlist := model.WishlistDetail{}

	res, err := db.Model(&wishlist).
		Where("wishlist_id = ? AND product_id = ?", wish_id, product_id).
		Delete()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error while Deleting Product"})
		return
	}
	if res.RowsAffected() == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

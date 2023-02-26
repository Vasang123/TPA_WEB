package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

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

func PublicWishlist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	itemsPerPage, err := strconv.Atoi(r.FormValue("itemsPerPage"))
	if err != nil || itemsPerPage < 1 {
		itemsPerPage = 15
	}
	user_id, err := strconv.Atoi(r.FormValue("user_id"))
	db := connect.Connect()
	defer db.Close()
	var wishlists []*model.Wishlist
	err = db.Model(&wishlists).
		Column("wishlist.*").
		Where("wishlist.privacy = 'public' AND wishlist.image != ''  AND wishlist.user_id != ?", user_id).
		Select()

	if err != nil {
		panic(err)
	}
	totalPages := (len(wishlists) + itemsPerPage - 1) / itemsPerPage
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
	// Slice the user data based on the page number
	startIndex := (pageNumber - 1) * itemsPerPage
	endIndex := startIndex + itemsPerPage

	if endIndex > len(wishlists) {
		endIndex = len(wishlists)
	}

	itemsOnPage := wishlists[startIndex:endIndex]

	// Construct the JSON response
	response := struct {
		Wishlists  []*model.Wishlist `json:"wishlists"`
		TotalPages int               `json:"totalPages"`
	}{
		Wishlists:  itemsOnPage,
		TotalPages: totalPages,
	}

	// Set the "Content-Type" header to "application/json"
	w.Header().Set("Content-Type", "application/json")

	// Encode the response as JSON and write it to the response body
	json.NewEncoder(w).Encode(response)
}

func WishlistDetail(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	wishlist_id := r.URL.Query().Get("wishlist_id")
	var wishlists []*model.WishlistDetail
	err := db.Model(&wishlists).
		Column("wishlist_detail.*", "Product", "Wishlist").
		Relation("Wishlist").
		Relation("Product").
		Where("wishlist_id = ?", wishlist_id).
		Order("id").
		Select()
	if len(wishlists) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}

	json.NewEncoder(w).Encode(wishlists)
}

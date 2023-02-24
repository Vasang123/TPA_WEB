package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func AddFavourite(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	wishlist_id, err := strconv.Atoi(r.FormValue("wishlist_id"))
	if err != nil {
		return
	}
	user_id, err := strconv.Atoi(r.FormValue("user_id"))
	if err != nil {
		return
	}
	favorite := &model.FavoriteList{}
	favorite.UserId = int64(user_id)
	favorite.WishlistId = int64(wishlist_id)
	err = db.Insert(favorite)
	if err != nil {
		log.Println("Error inserting favorite into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Wishlist"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func ViewFavourite(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	user_id, err := strconv.Atoi(r.FormValue("user_id"))
	if err != nil {
		return
	}
	var favorites []*model.FavoriteList
	err = db.Model(&favorites).
		Column("favorite_list.*").
		Where("user_id = ?", user_id).
		Select()

	response := struct {
		FavoriteList []*model.FavoriteList `json:"favorites"`
	}{
		FavoriteList: favorites,
	}

	// Set the "Content-Type" header to "application/json"
	w.Header().Set("Content-Type", "application/json")

	// Encode the response as JSON and write it to the response body
	json.NewEncoder(w).Encode(response)
}

func DeleteFavourite(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	user_id, err := strconv.Atoi(r.FormValue("user_id"))
	if err != nil {
		return
	}
	wishlist_id, err := strconv.Atoi(r.FormValue("wishlist_id"))
	if err != nil {
		return
	}
	favorite := model.FavoriteList{}

	_, err = db.Model(&favorite).
		Where("favorite_list.wishlist_id = ? AND favorite_list.user_id = ? ", wishlist_id, user_id).
		Delete()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error while Deleting Product"})
		return
	}
	// if res.RowsAffected() == 0 {
	// 	json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
	// 	return
	// }

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func MyFavourite(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	itemsPerPage, err := strconv.Atoi(r.FormValue("itemsPerPage"))
	if err != nil || itemsPerPage < 1 {
		itemsPerPage = 15
	}
	db := connect.Connect()
	defer db.Close()
	user_id, err := strconv.Atoi(r.FormValue("user_id"))
	if err != nil {
		return
	}
	fmt.Print(user_id)
	var favorites []*model.FavoriteList
	err = db.Model(&favorites).
		Column("favorite_list.*", "Wishlist").
		Relation("Wishlist").
		Where("favorite_list.user_id = ?", user_id).
		Select()

	totalPages := (len(favorites) + itemsPerPage - 1) / itemsPerPage
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

	if endIndex > len(favorites) {
		endIndex = len(favorites)
	}

	itemsOnPage := favorites[startIndex:endIndex]

	// Construct the JSON response
	response := struct {
		Favorites  []*model.FavoriteList `json:"favorites"`
		TotalPages int                   `json:"totalPages"`
	}{
		Favorites:  itemsOnPage,
		TotalPages: totalPages,
	}

	// Set the "Content-Type" header to "application/json"
	w.Header().Set("Content-Type", "application/json")

	// Encode the response as JSON and write it to the response body
	json.NewEncoder(w).Encode(response)
}

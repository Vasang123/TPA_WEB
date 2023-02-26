package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func InsertWishlistReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	review := &model.WishlistReview{}

	err := json.NewDecoder(r.Body).Decode(review)
	// fmt.Print(review)
	if err != nil {
		log.Println("Error decoding review payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding cart payload"})
		return
	}
	err = db.Insert(review)
	if err != nil {
		log.Println("Error inserting review into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Insert Review"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func GetWishlistReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db := connect.Connect()
	defer db.Close()

	wishlist_id := r.URL.Query().Get("wishlist_id")
	var wishlist_reviews []*model.WishlistReview
	err := db.Model(&wishlist_reviews).
		Column("wishlist_review.*").
		Where("wishlist_id = ? ", wishlist_id).
		Order("id").
		Select()
	// fmt.Print(err)
	if len(wishlist_reviews) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}

	json.NewEncoder(w).Encode(wishlist_reviews)
}

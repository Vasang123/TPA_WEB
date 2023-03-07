package controller

import (
	"encoding/json"
	"fmt"
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
	var totalRating float64
	var fiveRating float64
	var fourRating float64
	var threeRating float64
	var twoRating float64
	var oneRating float64
	for _, review := range wishlist_reviews {
		totalRating += review.Rating
		if review.Rating == 5 {
			fiveRating += 1
		}
		if review.Rating == 4 {
			fourRating += 1
		}
		if review.Rating == 3 {
			threeRating += 1
		}
		if review.Rating == 2 {
			twoRating += 1
		}
		if review.Rating == 1 {
			oneRating += 1
		}
	}

	averageRating := float64(totalRating) / float64(len(wishlist_reviews))
	response := struct {
		Reviews        []*model.WishlistReview `json:"reviews"`
		TotalItems     int                     `json:"totalItems"`
		AverageRatings string                  `json:"averageRatings"`
		FiveRating     string                  `json:"fiveRating"`
		FourRating     string                  `json:"fourRating"`
		ThreeRating    string                  `json:"threeRating"`
		TwoRating      string                  `json:"twoRating"`
		OneRating      string                  `json:"oneRating"`
	}{
		Reviews:        wishlist_reviews,
		TotalItems:     len(wishlist_reviews),
		AverageRatings: fmt.Sprintf("%.2f", averageRating),
		FiveRating:     fmt.Sprintf("%.2f", (fiveRating/float64(len(wishlist_reviews)))*100),
		FourRating:     fmt.Sprintf("%.2f", (fourRating/float64(len(wishlist_reviews)))*100),
		ThreeRating:    fmt.Sprintf("%.2f", (threeRating/float64(len(wishlist_reviews)))*100),
		TwoRating:      fmt.Sprintf("%.2f", (twoRating/float64(len(wishlist_reviews)))*100),
		OneRating:      fmt.Sprintf("%.2f", (oneRating/float64(len(wishlist_reviews)))*100),
	}
	json.NewEncoder(w).Encode(response)
}

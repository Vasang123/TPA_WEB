package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func InsertReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	review := &model.Review{}

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

func GetProductReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	product_id := r.URL.Query().Get("product_id")
	var reviews []*model.Review
	err := db.Model(&reviews).
		Column("review.*", "User", "Product").
		Relation("User").
		Relation("Product").
		Where("review.product_id = ? ", product_id).
		Order("id").
		Select()
	if len(reviews) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}

	json.NewEncoder(w).Encode(reviews)
}

func DeleteReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	id := r.URL.Query().Get("id")
	user_id := r.URL.Query().Get("user_id")
	product_id := r.URL.Query().Get("product_id")
	review := model.Review{}

	res, err := db.Model(&review).
		Where("id = ? AND review.user_id = ? AND review.product_id = ?", id, user_id, product_id).
		Delete()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error while Deleting Review"})
		return
	}
	if res.RowsAffected() == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func UpdateReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	review := &model.Review{}
	err := json.NewDecoder(r.Body).Decode(review)
	// fmt.Print(review)
	if err != nil {
		log.Println("Error decoding review payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding review payload"})
		return
	}
	res, err := db.Model(review).
		Column("rating", "comment", "modified_at").
		Where("id = ? AND review.user_id = ? AND review.product_id = ?", review.ID, review.UserId, review.ProductId).
		Update()

	if err != nil {
		log.Println("Error updating review into database:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Update Review"})
		return
	}
	if res.RowsAffected() == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing to update"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func GetUserReview(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	user_id := r.URL.Query().Get("user_id")
	var reviews []*model.Review
	err := db.Model(&reviews).
		Column("review.*", "User", "Product").
		Relation("User").
		Relation("Product").
		Where("review.user_id = ? ", user_id).
		Order("id").
		Select()
	if len(reviews) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}

	json.NewEncoder(w).Encode(reviews)
}

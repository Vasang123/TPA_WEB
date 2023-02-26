package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
	"github.com/go-pg/pg"
)

func UpdateWishNote(w http.ResponseWriter, r *http.Request) {
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
	_, err = db.Query(pg.Scan(&wishlist.ID, &wishlist.Note, &wishlist.UserId), "UPDATE wishlists SET note = ? WHERE id = ? AND user_id = ?", wishlist.Note, wishlist.ID, wishlist.UserId)
	if err != nil {
		log.Println("Error updating note into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Insert Cart"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

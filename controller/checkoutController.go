package controller

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func UserMoney(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	user_id, err := strconv.Atoi(r.URL.Query().Get("user_id"))
	if err != nil {

	}

	user := &model.User{}
	err = db.Model(user).
		Column("user.*").
		Order("id").
		Where("id = ?", user_id).
		Limit(1).
		Select()
	if err != nil {

	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(user.Money)
}

func InsertAddress(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	address := &model.Address{}

	err := json.NewDecoder(r.Body).Decode(address)

	if err != nil {
		log.Println("Error decoding address payload:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding address payload"})
		return
	}

	err = db.Insert(address)
	if err != nil {
		log.Println("Error inserting address into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Insert address"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func RemoveAddress(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {

	}

	address := &model.Address{}
	_, err = db.Model(address).
		Column("address.*").
		Where("id = ?", id).
		Limit(1).
		Delete()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Delete address"})
		return
	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func UserAddress(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	user_id, err := strconv.Atoi(r.URL.Query().Get("user_id"))
	if err != nil {

	}

	addresses := []*model.Address{}
	err = db.Model(&addresses).
		Column("address.*").
		Order("id").
		Where("user_id = ?", user_id).
		Select()
	if err != nil {

	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(addresses)
}

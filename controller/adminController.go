package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
	"github.com/go-pg/pg"
	"github.com/gorilla/mux"
)

func AddVoucher(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db := connect.Connect()
	defer db.Close()

	voucher := &model.Voucher{}
	fmt.Print(voucher)

	err := json.NewDecoder(r.Body).Decode(voucher)
	// fmt.Println("Payload:", r.Body)

	if err != nil {
		log.Println("Error decoding payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding payload"})
		return
	}

	err = db.Insert(voucher)
	if err != nil {
		log.Println("Error inserting voucher into database:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Voucher"})
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func AddPromo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db := connect.Connect()
	defer db.Close()

	promo := &model.Promo{}

	err := json.NewDecoder(r.Body).Decode(promo)
	// fmt.Println("Payload:", r.Body)

	if err != nil {
		log.Println("Error decoding payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding payload"})
		return
	}

	err = db.Insert(promo)
	if err != nil {
		log.Println("Error inserting promo into database:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Promo"})
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func PaginateUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	// Calculate pagination information
	itemsPerPage := 2
	users := []*model.User{}
	err := db.Model(&users).
		Column("user.*").
		Where("role_id = 1").
		Order("id").
		Select()
	if err != nil {
		panic(err)
	}
	totalPages := (len(users) + itemsPerPage - 1) / itemsPerPage
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

	if endIndex > len(users) {
		endIndex = len(users)
	}

	usersOnPage := users[startIndex:endIndex]

	// Construct the JSON response
	response := struct {
		Users      []*model.User `json:"users"`
		TotalPages int           `json:"totalPages"`
	}{
		Users:      usersOnPage,
		TotalPages: totalPages,
	}

	// Set the "Content-Type" header to "application/json"
	w.Header().Set("Content-Type", "application/json")

	// Encode the response as JSON and write it to the response body
	json.NewEncoder(w).Encode(response)
}
func PaginateShops(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	// Calculate pagination information
	itemsPerPage := 2
	users := []*model.User{}
	err := db.Model(&users).
		Column("user.*").
		Where("role_id = 2").
		Order("id").
		Select()
	if err != nil {
		panic(err)
	}
	totalPages := (len(users) + itemsPerPage - 1) / itemsPerPage
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

	if endIndex > len(users) {
		endIndex = len(users)
	}

	usersOnPage := users[startIndex:endIndex]

	// Construct the JSON response
	response := struct {
		Users      []*model.User `json:"users"`
		TotalPages int           `json:"totalPages"`
	}{
		Users:      usersOnPage,
		TotalPages: totalPages,
	}

	// Set the "Content-Type" header to "application/json"
	w.Header().Set("Content-Type", "application/json")

	// Encode the response as JSON and write it to the response body
	json.NewEncoder(w).Encode(response)
}
func UpdateBanStatus(w http.ResponseWriter, r *http.Request) {

	db := connect.Connect()
	defer db.Close()
	vars := mux.Vars(r)
	roleId, err := strconv.Atoi(vars["role_id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}
	if roleId != 3 {
		http.Error(w, "Unauthorized", http.StatusBadRequest)
		return
	}
	userID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}
	isBanned, err := strconv.ParseBool(vars["status"])
	if err != nil {
		http.Error(w, "Error Status", http.StatusBadRequest)
		return
	}
	statusInt := ""
	if isBanned {
		statusInt = "yes"
	} else {
		statusInt = "no"
	}
	_, err = db.Query(pg.Scan(&userID), "UPDATE users SET is_banned=? WHERE id=?", statusInt, userID)
	if err != nil {
		http.Error(w, "Invalid Credential", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

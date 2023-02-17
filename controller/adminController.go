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

func PaginateUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	// Calculate pagination information
	itemsPerPage := 2
	users := []*model.User{}
	err := db.Model(&users).
		Column("user.*").
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

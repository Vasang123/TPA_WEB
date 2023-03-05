package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
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
	itemsPerPage := 10
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

	ban := r.URL.Query().Get("status")
	users := []*model.User{}
	itemsPerPage := 10

	if ban == "yes" || ban == "no" {
		err := db.Model(&users).
			Column("user.*").
			Where("role_id = 2 AND is_banned = ?", ban).
			Order("id").
			Select()
		if err != nil {
			panic(err)
		}
	} else {
		err := db.Model(&users).
			Column("user.*").
			Where("role_id = 2").
			Order("id").
			Select()
		if err != nil {
			panic(err)
		}
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

func PaginatePromo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	// Calculate pagination information
	itemsPerPage := 2
	promos := []*model.Promo{}
	err := db.Model(&promos).
		Column("promo.*").
		Order("id").
		Select()
	if err != nil {
		panic(err)
	}
	totalPages := (len(promos) + itemsPerPage - 1) / itemsPerPage
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

	if endIndex > len(promos) {
		endIndex = len(promos)
	}

	promosOnPage := promos[startIndex:endIndex]

	// Construct the JSON response
	response := struct {
		Promos     []*model.Promo `json:"promos"`
		TotalPages int            `json:"totalPages"`
	}{
		Promos:     promosOnPage,
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

func UpdatePromoStatus(w http.ResponseWriter, r *http.Request) {

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
	promoId, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid promo ID", http.StatusBadRequest)
		return
	}
	status, err := strconv.ParseBool(vars["status"])
	if err != nil {
		http.Error(w, "Error Status", http.StatusBadRequest)
		return
	}
	statusInt := ""
	if status {
		statusInt = "active"
	} else {
		statusInt = "inactive"
	}
	_, err = db.Query(pg.Scan(&promoId), "UPDATE promos SET status=? WHERE id=?", statusInt, promoId)
	if err != nil {
		http.Error(w, "Invalid Credential", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func SendEmail(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	decoder := json.NewDecoder(r.Body)
	var newsletter model.NewsLetter
	err := decoder.Decode(&newsletter)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error Decoding Payload"})
	}

	users := []*model.User{}
	err = db.Model(&users).
		Column("user.*").
		Where("is_subscribed = 'yes'").
		Order("id").
		Select()
	if err != nil {
		panic(err)
	}
	allEmails := []string{}
	for _, u := range users {
		email := u.Email
		allEmails = append(allEmails, email)
	}

	//email dapet di body
	auth := smtp.PlainAuth(
		"",
		"valentinosetiawan32@gmail.com",
		"ezyoxrdjeocyaubm",
		"smtp.gmail.com",
	)

	msg := "Subject: " + newsletter.Title + "\n" + newsletter.Content
	err = smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		"ezyoxrdjeocyaubm",
		allEmails,
		[]byte(msg),
	)
	fmt.Println(err)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error Sending Newsletter"})
		return
	}
	// Set the "Content-Type" header to "application/json"
	w.Header().Set("Content-Type", "application/json")

	// Encode the response as JSON and write it to the response body
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func DataSummary(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	var reviews []*model.Review
	err := db.Model(&reviews).
		Column("review.*", "User", "Product").
		Relation("User").
		Relation("Product").
		Order("id").
		Select()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid query parameters"})
		return
	}

	if len(reviews) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "No reviews found"})
		return
	}
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error retrieving reviews"})
		return
	}
	var products []*model.Product
	err = db.Model(&products).
		Column("product.*", "User.first_name", "User.id", "User.is_banned", "Category", "Brand").
		Relation("User").
		Relation("Category").
		Relation("Brand").
		Order("id").
		Select()
	if err != nil {
		return
	}
	var totalSolds int
	var totalRating float64
	var fiveRating int64
	var fourRating int64
	var threeRating int64
	var twoRating int64
	var oneRating int64
	for _, review := range reviews {
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
	for _, pr := range products {
		totalSolds += int(pr.Sold)
	}

	averageRating := float64(totalRating) / float64(len(reviews))

	response := struct {
		TotalSold      int    `json:"totalSolds"`
		TotalProduct   int    `json:"totalProducts"`
		TotalReviews   int    `json:"totalReviews"`
		AverageRatings string `json:"averageRatings"`
		FiveRating     int    `json:"fiveRating"`
		FourRating     int64  `json:"fourRating"`
		ThreeRating    int64  `json:"threeRating"`
		TwoRating      int64  `json:"twoRating"`
		OneRating      int64  `json:"oneRating"`
	}{
		TotalSold:      totalSolds,
		TotalReviews:   len(reviews),
		TotalProduct:   len(products),
		AverageRatings: fmt.Sprintf("%.2f", averageRating),
		FiveRating:     int(float64(fiveRating) / float64(len(reviews)) * 100),
		FourRating:     int64(float64(fourRating) / float64(len(reviews)) * 100),
		ThreeRating:    int64(float64(threeRating) / float64(len(reviews)) * 100),
		TwoRating:      int64(float64(twoRating) / float64(len(reviews)) * 100),
		OneRating:      int64(float64(oneRating) / float64(len(reviews)) * 100),
	}

	json.NewEncoder(w).Encode(response)
}

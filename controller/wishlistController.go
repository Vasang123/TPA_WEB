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
)

func CreateWishlist(w http.ResponseWriter, r *http.Request) {
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

	err = db.Insert(wishlist)
	if err != nil {
		log.Println("Error inserting wishlist into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Wishlist"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func UpdateWishlistHeader(w http.ResponseWriter, r *http.Request) {
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

	res, err := db.Model(wishlist).
		Column("privacy").
		Where("id = ? AND wishlist.user_id = ?", wishlist.ID, wishlist.UserId).
		Update()

	if err != nil {
		log.Println("Error updating wishlist into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Wishlist"})
		return
	}
	if res.RowsAffected() == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing to update"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func InsertWishlist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	wishlist := &model.WishlistDetail{}
	err := json.NewDecoder(r.Body).Decode(wishlist)
	if err != nil {
		log.Println("Error decoding wishlist payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding wishlist payload"})
		return
	}

	var existingWishlist model.WishlistDetail
	err = db.Model(&existingWishlist).
		Column("wishlist_detail.*", "Wishlist", "Product").
		Relation("Wishlist").
		Relation("Product").
		Where("wishlist_id = ? AND product_id = ?", wishlist.WishlistId, wishlist.ProductId).
		Limit(1).
		Select()

	if err != nil {
		// Item does not exist, insert it
		err = db.Insert(wishlist)
		if err != nil {
			log.Println("Error inserting wishlist into database:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Wishlist"})
			return
		}
	} else {
		newQuantity := wishlist.Quantity + existingWishlist.Quantity
		fmt.Print(wishlist.Quantity, "\n")
		fmt.Print(existingWishlist.Quantity, "\n")
		fmt.Print(existingWishlist.Product.Quantity, "\n")
		if newQuantity > existingWishlist.Product.Quantity {
			json.NewEncoder(w).Encode(map[string]string{"message": "Item Overload"})
			return
		}
		existingWishlist.Quantity = newQuantity
		_, err = db.Model(&existingWishlist).
			Set("quantity = ?", newQuantity).
			Where("wishlist_id = ? AND product_id = ?", wishlist.WishlistId, wishlist.ProductId).
			Update()
		if err != nil {
			log.Println("Error updating wishlist item:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Update Wishlist"})
			return
		}
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func UpdateWishQuantity(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	wishlist := &model.WishlistDetail{}
	err := json.NewDecoder(r.Body).Decode(wishlist)
	if err != nil {
		log.Println("Error decoding wishlist payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding wishlist payload"})
		return
	}
	_, err = db.Query(pg.Scan(&wishlist.WishlistId, &wishlist.ProductId), "UPDATE wishlist_details SET quantity = ? WHERE wishlist_details.wishlist_id = ? AND wishlist_details.product_id = ?", (wishlist.Quantity), wishlist.WishlistId, wishlist.ProductId)
	if err != nil {
		log.Println("Error inserting cart into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Insert Cart"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
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

func PrivateWishlist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	user_id, err := strconv.Atoi(r.FormValue("user_id"))
	if err != nil {
		return
	}
	itemsPerPage, err := strconv.Atoi(r.FormValue("itemsPerPage"))
	if err != nil || itemsPerPage < 1 {
		itemsPerPage = 15
	}

	db := connect.Connect()
	defer db.Close()

	var wishlists []*model.Wishlist
	err = db.Model(&wishlists).
		Column("wishlist.*").
		Where("user_id = ?", user_id).
		Order("id").
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
func DeleteWishItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	wishlist_id := r.URL.Query().Get("wishlist_id")
	product_id := r.URL.Query().Get("product_id")
	list := model.WishlistDetail{}

	res, err := db.Model(&list).
		Where("wishlist_detail.wishlist_id = ? AND wishlist_detail.product_id = ?", wishlist_id, product_id).
		Delete()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error while Deleting Product"})
		return
	}
	if res.RowsAffected() == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	wishlist := &model.WishlistDetail{}
	err = db.Model(wishlist).
		Column("wishlist_detail.*", "Product").
		Relation("Product").
		Where("wishlist_id = ?", wishlist_id).
		Order("wishlist_detail.id").
		Limit(1).
		Select()

	// fmt.Print(wishlist)
	var wishlistMain *model.Wishlist
	if err != nil {
		_, err = db.Model(&model.Wishlist{}).
			Set("image = NULL").
			Where("id = ?", wishlist_id).
			Update()
		return
	}
	// fmt.Print(wishlist.Product.Image + "\n ")
	// fmt.Print(wishlist.WishlistId)
	_, err = db.Model(wishlistMain).
		Set("image = ?", wishlist.Product.Image).
		Where("id = ?", wishlist.WishlistId).
		Update()

	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error while Updating Wishlist Image"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func ManageWishlistView(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	user_id, err := strconv.Atoi(r.FormValue("user_id"))
	if err != nil {
		return
	}

	db := connect.Connect()
	defer db.Close()

	var wishlists []*model.Wishlist
	err = db.Model(&wishlists).
		Column("wishlist.*").
		Where("user_id = ?", user_id).
		Order("id").
		Select()

	if err != nil {
		panic(err)
	}

	response := struct {
		Wishlists []*model.Wishlist `json:"wishlists"`
	}{
		Wishlists: wishlists,
	}

	// Set the "Content-Type" header to "application/json"
	w.Header().Set("Content-Type", "application/json")

	// Encode the response as JSON and write it to the response body
	json.NewEncoder(w).Encode(response)
}

func ManageWishlistUpdate(w http.ResponseWriter, r *http.Request) {
	const updateWishlistQuery = `
	UPDATE wishlists
	SET name = ?, privacy = ?
	WHERE id = ?
	`
	fmt.Print("masuk")
	var req model.UpdateWishlistRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		fmt.Print(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	db := connect.Connect()
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)

		return
	}
	defer func() {
		if err != nil {
			tx.Rollback()
			return
		}
		err = tx.Commit()
	}()

	for _, wishlist := range req.Wishlists {
		// fmt.Printf("wishlist ID: %d\n", wishlist.ID)
		_, err := tx.Exec(updateWishlistQuery, wishlist.Name, wishlist.Privacy, wishlist.ID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Println(err)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Wishlists updated successfully"}`))
}

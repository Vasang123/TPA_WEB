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

func ShopAbout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db := connect.Connect()
	defer db.Close()
	shop_id, err := strconv.Atoi(r.URL.Query().Get("shop_id"))
	shop := &model.Shop{}
	err = db.Model(shop).
		Column("shop.*", "User").
		Relation("User").
		Order("id").
		Where("user_id = ?", shop_id).
		Limit(1).
		Select()
	if err != nil {
		return
	}
	products := []*model.Product{}
	err = db.Model(&products).
		Column("product.*", "User.first_name", "User.id", "User.is_banned", "Category", "Brand").
		Relation("User").
		Relation("Category").
		Relation("Brand").
		Order("id").
		Where("user_id = ?", shop_id).
		Select()
	if err != nil {

	}
	var reviews []*model.Review
	err = db.Model(&reviews).
		Column("review.*", "User", "Product").
		Relation("User").
		Relation("Product").
		Order("id").
		Where("product.user_id = ?", shop_id).
		Select()
	var totalSolds int
	for _, pr := range products {
		totalSolds += int(pr.Sold)
	}
	var totalRating float64
	for _, review := range reviews {
		totalRating += review.Rating
	}

	averageRating := float64(totalRating) / float64(len(reviews))
	response := struct {
		TotalSold      int         `json:"totalSold"`
		Shop           *model.Shop `json:"shop"`
		AverageRatings string      `json:"averageRatings"`
	}{
		TotalSold:      totalSolds,
		Shop:           shop,
		AverageRatings: fmt.Sprintf("%.2f", averageRating),
	}
	json.NewEncoder(w).Encode(response)
}

func ShopHome(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	user_id, err := strconv.Atoi(r.URL.Query().Get("user_id"))
	if err != nil {
		// handle the error, e.g. return an error response
	}

	products := []*model.Product{}
	err = db.Model(&products).
		Column("product.*", "User.first_name", "User.id", "User.is_banned", "Category", "Brand").
		Relation("User").
		Relation("Category").
		Relation("Brand").
		Order("id").
		Where("user_id = ?", user_id).
		Select()
	if err != nil {
		// handle the error, e.g. return an error response
	}
	if len(products) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "No products found"})
		return
	}

	shop := &model.Shop{}
	err = db.Model(shop).
		Column("shop.*", "User").
		Relation("User").
		Order("id").
		Where("user_id = ?", user_id).
		Limit(1).
		Select()
	if err != nil {

	}
	if shop == nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "No shop found"})
		return
	}

	response := struct {
		Products []*model.Product `json:"products"`
		Shop     *model.Shop      `json:"shop"`
	}{
		Products: products,
		Shop:     shop,
	}

	// Set the "Content-Type" header to "application/json"
	w.Header().Set("Content-Type", "application/json")

	// Encode the response as JSON and write it to the response body
	json.NewEncoder(w).Encode(response)

}

func ShopProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	itemsPerPage := 12
	name := r.URL.Query().Get("name")
	user_id, err := strconv.Atoi(r.URL.Query().Get("user_id"))
	category_id, err := strconv.Atoi(r.URL.Query().Get("category_id"))
	pattern := "%" + name + "%"
	var products []*model.Product
	if name == "none" && category_id == 0 {
		err = db.Model(&products).
			Column("product.*", "User.first_name", "User.id", "User.is_banned", "Category", "Brand").
			Relation("User").
			Relation("Category").
			Relation("Brand").
			Order("id").
			Where("product.user_id = ?", user_id).
			Select()

	} else if name != "none" && category_id == 0 {
		err = db.Model(&products).
			Column("product.*", "User.first_name", "User.id", "User.is_banned", "Category", "Brand").
			Relation("User").
			Relation("Category").
			Relation("Brand").
			Where("(product.name ILIKE ? OR brand.name ILIKE ?) AND product.user_id = ?", pattern, pattern, user_id).
			Order("id").
			Select()

	} else if name == "none" && category_id != 0 {
		err = db.Model(&products).
			Column("product.*", "User.first_name", "User.id", "User.is_banned", "Category", "Brand").
			Relation("User").
			Relation("Category").
			Relation("Brand").
			Where("product.category_id = ? AND product.user_id = ?", category_id, user_id).
			Order("id").
			Select()
	} else {
		err = db.Model(&products).
			Column("product.*", "User.first_name", "User.id", "User.is_banned", "Category", "Brand").
			Relation("User").
			Relation("Category").
			Relation("Brand").
			Where("(product.name ILIKE ? OR brand.name ILIKE ?) AND product.category_id = ? AND product.user_id = ?", pattern, pattern, category_id, user_id).
			Order("id").
			Select()
	}

	if len(products) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	totalPages := (len(products) + itemsPerPage - 1) / itemsPerPage
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
	startIndex := (pageNumber - 1) * itemsPerPage
	endIndex := startIndex + itemsPerPage
	if endIndex > len(products) {
		endIndex = len(products)
	}
	productsOnPage := products[startIndex:endIndex]
	response := struct {
		Products   []*model.Product `json:"products"`
		TotalPages int              `json:"totalPages"`
		TotalItems int              `json:"totalItems"`
	}{
		Products:   productsOnPage,
		TotalPages: totalPages,
		TotalItems: len(products),
	}
	// Return the products as JSON
	json.NewEncoder(w).Encode(response)
}
func ShopReviews(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	name := r.URL.Query().Get("name")
	filter := r.URL.Query().Get("filter")
	shop_id, err := strconv.Atoi(r.URL.Query().Get("shop_id"))
	pattern := "%" + name + "%"
	var reviews []*model.Review
	if filter == "none" && name == "none" {
		err = db.Model(&reviews).
			Column("review.*", "User", "Product").
			Relation("User").
			Relation("Product").
			Order("id").
			Where("product.user_id = ?", shop_id).
			Select()
	} else if filter == "none" && name != "none" {
		err = db.Model(&reviews).
			Column("review.*", "User", "Product").
			Relation("User").
			Relation("Product").
			Order("id").
			Where("review.comment ILIKE ? AND product.user_id = ?", pattern, shop_id).
			Select()
	} else if filter == "asc" && name != "none" {
		err = db.Model(&reviews).
			Column("review.*", "User", "Product").
			Relation("User").
			Relation("Product").
			OrderExpr("review.created_at ASC").
			Where("product.user_id = ? AND review.comment ILIKE ?", shop_id, pattern).
			Select()
	} else if filter == "asc" && name == "none" {
		err = db.Model(&reviews).
			Column("review.*", "User", "Product").
			Relation("User").
			Relation("Product").
			OrderExpr("review.created_at ASC").
			Where("product.user_id = ?", shop_id).
			Select()
	} else if filter == "desc" && name != "none" {
		err = db.Model(&reviews).
			Column("review.*", "User", "Product").
			Relation("User").
			Relation("Product").
			OrderExpr("review.created_at DESC").
			Where("product.user_id = ? AND review.comment ILIKE ?", shop_id, pattern).
			Select()
	} else if filter == "desc" && name == "none" {
		err = db.Model(&reviews).
			Column("review.*", "User", "Product").
			Relation("User").
			Relation("Product").
			OrderExpr("review.created_at DESC").
			Where("product.user_id = ?", shop_id).
			Select()
	} else {
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
	var totalRating float64
	var fiveRating float64
	var fourRating float64
	var threeRating float64
	var twoRating float64
	var oneRating float64
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

	averageRating := float64(totalRating) / float64(len(reviews))

	response := struct {
		Reviews        []*model.Review `json:"reviews"`
		TotalItems     int             `json:"totalItems"`
		AverageRatings string          `json:"averageRatings"`
		FiveRating     string          `json:"fiveRating"`
		FourRating     string          `json:"fourRating"`
		ThreeRating    string          `json:"threeRating"`
		TwoRating      string          `json:"twoRating"`
		OneRating      string          `json:"oneRating"`
	}{
		Reviews:        reviews,
		TotalItems:     len(reviews),
		AverageRatings: fmt.Sprintf("%.2f", averageRating),
		FiveRating:     fmt.Sprintf("%.2f", (fiveRating/float64(len(reviews)))*100),
		FourRating:     fmt.Sprintf("%.2f", (fourRating/float64(len(reviews)))*100),
		ThreeRating:    fmt.Sprintf("%.2f", (threeRating/float64(len(reviews)))*100),
		TwoRating:      fmt.Sprintf("%.2f", (twoRating/float64(len(reviews)))*100),
		OneRating:      fmt.Sprintf("%.2f", (oneRating/float64(len(reviews)))*100),
	}

	json.NewEncoder(w).Encode(response)
}
func HelplistRead(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	user_id := r.URL.Query().Get("user_id")
	var helps []*model.HelpList
	err := db.Model(&helps).
		Column("help_list.*", "User", "Review").
		Relation("User").
		Relation("Review").
		Where(" help_list.user_id = ?", user_id).
		Select()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Error retrieving data"})
		return
	}
	json.NewEncoder(w).Encode(helps)
}
func HelplistInsert(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	helpList := &model.HelpList{}
	err := json.NewDecoder(r.Body).Decode(helpList)

	if err != nil {
		log.Println("Error decoding help payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding help payload"})
		return
	}
	var helpCheck model.HelpList
	err = db.Model(&helpCheck).
		Column("help_list.*", "User", "Review").
		Relation("User").
		Relation("Review").
		Where("help_list.review_id = ? AND help_list.user_id = ?", helpList.ReviewId, helpList.UserId).
		Limit(1).
		Select()
	// fmt.Print(err, '\n')
	if err != nil {
		err = db.Insert(helpList)
		if err != nil {
			log.Println("Error inserting review into database:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Insert Review"})
			return
		}
	} else {
		_, err = db.Query(pg.Scan(&helpList.UserId, &helpList.ReviewId, &helpList.Status), "UPDATE help_lists SET status = ? WHERE user_id = ? AND review_id = ?", (helpList.Status), helpList.UserId, helpList.ReviewId)
		if err != nil {
			log.Println("Error updating review status in  database:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Update Review"})
			return
		}
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

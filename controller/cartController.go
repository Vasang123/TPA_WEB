package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
	"github.com/go-pg/pg"
)

func InsertCart(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	cart := &model.Cart{}

	err := json.NewDecoder(r.Body).Decode(cart)
	cart.IsLike = "no"

	if err != nil {
		log.Println("Error decoding cart payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding cart payload"})
		return
	}
	var cart_check model.Cart
	err = db.Model(&cart_check).
		Column("cart.*", "User", "Product").
		Relation("User").
		Relation("Product").
		Where("cart.product_id  = ? AND cart.user_id = ?", cart.ProductId, cart.UserId).
		Limit(1).
		Select()
	// If item is the first 1
	if err != nil {
		err = db.Insert(cart)
		if err != nil {
			json.NewEncoder(w).Encode(map[string]string{"message": "Error when inserting into db"})
			return
		}
	} else {
		if (cart.Quantity + cart_check.Quantity) > cart_check.Product.Quantity {
			json.NewEncoder(w).Encode(map[string]string{"message": "Item Overload"})
			return
		} else {
			_, err = db.Query(pg.Scan(&cart.UserId, &cart.ProductId), "UPDATE carts SET quantity = ? WHERE carts.user_id = ? AND carts.product_id = ?", (cart.Quantity + cart_check.Quantity), cart.UserId, cart.ProductId)
		}
	}
	if err != nil {
		log.Println("Error inserting cart into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Insert Cart"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func UpdateQuantity(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	cart := &model.Cart{}

	err := json.NewDecoder(r.Body).Decode(cart)
	if err != nil {
		log.Println("Error decoding cart payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding cart payload"})
		return
	}
	_, err = db.Query(pg.Scan(&cart.UserId, &cart.ProductId), "UPDATE carts SET quantity = ? WHERE carts.user_id = ? AND carts.product_id = ?", (cart.Quantity), cart.UserId, cart.ProductId)
	if err != nil {
		log.Println("Error inserting cart into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Insert Cart"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func GetProductCart(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	user_id := r.URL.Query().Get("user_id")
	is_like := r.URL.Query().Get("is_like")
	var carts []*model.Cart
	err := db.Model(&carts).
		Column("cart.*", "User", "Product").
		Relation("User").
		Relation("Product").
		Where("cart.user_id = ? AND is_like = ?", user_id, is_like).
		Order("id").
		Select()
	if len(carts) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Nothing"})
		return
	}

	json.NewEncoder(w).Encode(carts)
}

func DeleteCartItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	user_id := r.URL.Query().Get("user_id")
	product_id := r.URL.Query().Get("product_id")
	is_like := r.URL.Query().Get("is_like")
	cart := model.Cart{}

	res, err := db.Model(&cart).
		Where("cart.user_id = ? AND cart.product_id = ? AND is_like = ?", user_id, product_id, is_like).
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

func WishToCart(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	var req model.CartWithWishlist
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	cart := &req.Cart
	wishlistId := req.WishlistId
	cart.IsLike = "no"
	fmt.Print(cart.UserId)
	if err != nil {
		log.Println("Error decoding cart payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding cart payload"})
		return
	}

	// Check if the item is already in the cart
	var cartCheck model.Cart
	err = db.Model(&cartCheck).
		Column("cart.*", "User", "Product").
		Relation("User").
		Relation("Product").
		Where("cart.product_id  = ? AND cart.user_id = ?", cart.ProductId, cart.UserId).
		Limit(1).
		Select()
	// If the item is not in the cart, insert it
	if err != nil {
		err = db.Insert(cart)
		if err != nil {
			json.NewEncoder(w).Encode(map[string]string{"message": "Error when inserting into db"})
			return
		}
	} else {
		// If the item is already in the cart, update the quantity
		if (cart.Quantity + cartCheck.Quantity) > cartCheck.Product.Quantity {
			json.NewEncoder(w).Encode(map[string]string{"message": "Item Overload"})
			return
		} else {
			_, err = db.Query(pg.Scan(&cart.UserId, &cart.ProductId), "UPDATE carts SET quantity = ? WHERE carts.user_id = ? AND carts.product_id = ?", (cart.Quantity + cartCheck.Quantity), cart.UserId, cart.ProductId)
		}
	}

	_, err = db.Query(&model.WishlistDetail{}, `
		DELETE FROM wishlist_details
		USING wishlists
		WHERE wishlists.user_id = ? AND wishlist_details.product_id = ? AND wishlist_details.wishlist_id = ?
		RETURNING wishlist_details.*
	`, cart.UserId, cart.ProductId, wishlistId)

	if err != nil {
		log.Println("Error deleting item from wishlist:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error deleting item from wishlist"})
		return
	}

	wishlist := &model.WishlistDetail{}
	err = db.Model(wishlist).
		Column("wishlist_detail.*", "Product").
		Relation("Product").
		Where("wishlist_id = ?", wishlistId).
		Order("wishlist_detail.id").
		Limit(1).
		Select()
	var wishlistMain *model.Wishlist
	if err != nil {
		_, err = db.Model(&model.Wishlist{}).
			Set("image = NULL").
			Where("id = ?", wishlistId).
			Update()
		json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
		return
	}
	_, err = db.Model(wishlistMain).
		Set("image = ?", wishlist.Product.Image).
		Where("id = ?", wishlist.WishlistId).
		Update()
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func CartToWish(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	var req model.WishlistWithCart
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	cartId := &req.CartId
	wishlist1 := &req.WishlistDetail

	fmt.Println("Request body:", r.Body)
	if err != nil {
		log.Println("Error decoding wishlist payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding wishlist payload"})
		return
	}
	cart := model.Cart{}
	_, err = db.Model(&cart).
		Column("cart.*").
		Where("id = ? ", cartId).
		Delete()
	var existingWishlist model.WishlistDetail
	err = db.Model(&existingWishlist).
		Column("wishlist_detail.*", "Wishlist", "Product").
		Relation("Wishlist").
		Relation("Product").
		Where("wishlist_id = ? AND product_id = ?", wishlist1.WishlistId, wishlist1.ProductId).
		Limit(1).
		Select()
	if err != nil {
		err = db.Insert(wishlist1)
		if err != nil {
			log.Println("Error inserting wishlist into database:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Wishlist"})
		}
		var wishlistMain *model.Wishlist
		_, err = db.Model(wishlistMain).
			Set("image = ?", wishlist1.Product.Image).
			Where("id = ?", wishlist1.WishlistId).
			Update()
		if err != nil {
			log.Println("Error inserting wishlist into database:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Create Wishlist"})
			return
		}
	} else {
		newQuantity := wishlist1.Quantity + existingWishlist.Quantity
		// fmt.Print(wishlist.Quantity, "\n")
		// fmt.Print(existingWishlist.Quantity, "\n")
		// fmt.Print(existingWishlist.Product.Quantity, "\n")
		if newQuantity > existingWishlist.Product.Quantity {
			json.NewEncoder(w).Encode(map[string]string{"message": "Item Overload"})
			return
		}
		existingWishlist.Quantity = newQuantity
		_, err = db.Model(&existingWishlist).
			Set("quantity = ?", newQuantity).
			Where("wishlist_id = ? AND product_id = ?", wishlist1.WishlistId, wishlist1.ProductId).
			Update()
		if err != nil {
			log.Println("Error updating wishlist item:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Update Wishlist"})
			return
		}
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

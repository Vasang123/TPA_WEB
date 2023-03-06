package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
	"github.com/go-pg/pg"
	"github.com/google/uuid"
)

func CreateOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	order := &model.Order1{}

	err := json.NewDecoder(r.Body).Decode(order)
	// fmt.Print(review)
	if err != nil {
		log.Println("Error decoding order payload:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding order payload"})
		return
	}
	uuid := uuid.New().String()
	invoice := fmt.Sprintf("INV-%d-%s", time.Now().Unix(), uuid)

	order.Invoice = invoice
	order.Status = "pending"

	if order.Payment == "genesis" {
		user := &model.User{}
		err = db.Model(user).
			Column("user.*").
			Order("id").
			Where("id = ?", order.UserId).
			Limit(1).
			Select()
		if err != nil {
			log.Println("Error finding user:", err)
			json.NewEncoder(w).Encode(map[string]string{"message": "Error finding user"})
			return
		}

		balance := user.Money - order.Total
		if balance < 0 {
			log.Println("Your Money isn't enough:", err)

			json.NewEncoder(w).Encode(map[string]string{"message": "Your Money isn't enough"})
			return
		} else {
			_, err = db.Model(user).
				Column("user.*").
				Order("id").
				Set("money = ?", balance).
				Where("id = ?", order.UserId).
				Limit(1).
				Update()
			if err != nil {
				log.Println("Error updating user balance:", err)
				json.NewEncoder(w).Encode(map[string]string{"message": "Error updating user balance"})
				return
			}
		}

	}
	var carts []*model.Cart
	err = db.Model(&carts).
		Column("cart.*", "User", "Product").
		Relation("User").
		Relation("Product").
		Where("cart.user_id = ? AND is_like = ?", order.UserId, "no").
		Order("id").
		Select()
	order.ShopId = carts[0].Product.UserId
	err = db.Insert(order)

	selectedOrder := &model.Order1{}
	err = db.Model(selectedOrder).
		Column("order1.*").
		Order("id").
		Where("invoice = ?", invoice).
		Limit(1).
		Select()

	for _, cart := range carts {
		_, err = db.Model(cart).
			Set("order_id = ?, is_like = ?", selectedOrder.ID, "ordered").
			Where("id = ?", cart.ID).
			Update()

		if err != nil {
			log.Println("Error updating cart:", err)
			// Handle error as needed
		}
	}

	if err != nil {
		log.Println("Error inserting order into database:", err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Order"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

func GetUserOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	userID, err := strconv.Atoi(r.URL.Query().Get("user_id"))
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}
	filter := r.URL.Query().Get("filter")
	name := r.URL.Query().Get("name")
	pattern := "%" + name + "%"
	var orders []*model.Order1
	switch filter {
	case "none":
		switch name {
		case "none":
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.user_id = ?", userID).
				Select()

		default:
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("invoice ILIKE ? ", pattern).
				Where("order1.user_id = ?", userID).
				Order("id").
				Select()
		}
	case "pending":
		switch name {
		case "none":
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.user_id = ? AND status = 'pending'", userID).
				Select()
		default:
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.user_id = ? AND status = 'pending'", userID).
				Where("invoice ILIKE ? ", pattern).
				Select()
		}
	case "success":
		switch name {
		case "none":
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.user_id = ? AND status = 'success'", userID).
				Select()
		default:
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.user_id = ? AND status = 'success'", userID).
				Where("invoice ILIKE ?", pattern).
				Select()
		}
	case "cancel":
		switch name {
		case "none":
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.user_id = ? AND status = 'cancel'", userID).
				Select()
		default:
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.user_id = ? AND status = 'cancel'", userID).
				Where("invoice ILIKE ? ", pattern).
				Select()
		}
	default:
		http.Error(w, "Invalid query parameters", http.StatusBadRequest)
		return
	}

	if len(orders) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "No orders found"})
		return
	}

	if err != nil {
		log.Println("Error retrieving data from database:", err)
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(orders)
}

func OrderToCart(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	order_id := r.URL.Query().Get("order_id")
	carts := []*model.Cart{}
	err := db.Model(&carts).
		Column("cart.*").
		Where("cart.order_id = ?", order_id).
		Order("id").
		Select()
	if err != nil {
		panic(err)
	}
	var insertErr error
	for _, cart := range carts {
		cartNew := cart
		cartNew.ID = 0
		cartNew.IsLike = "no"
		cartNew.OrderId = 0

		existingCart := &model.Cart{}
		err = db.Model(existingCart).
			Column("cart.*").
			Where("cart.product_id = ?", cartNew.ProductId).
			Where("cart.user_id = ?", cartNew.UserId).
			Where("cart.is_like = 'no'").
			Select()
		if err != nil && err != pg.ErrNoRows {
			insertErr = err
			log.Println("Error checking for existing cart item:", err)
			break
		}

		if existingCart.ID != 0 {
			newQuantity := existingCart.Quantity + cartNew.Quantity
			if newQuantity > existingCart.Product.Quantity {
				log.Println("Item Overload:", err)
			} else {
				existingCart.Quantity += cartNew.Quantity
				err = db.Update(existingCart)
				if err != nil {
					insertErr = err
					log.Println("Error updating existing cart item:", err)
					break
				}
			}
			continue
		}

		// Insert the new cart item
		err = db.Insert(cartNew)
		if err != nil {
			insertErr = err
			log.Println("Error inserting cart item into database:", err)
			break
		}
	}

	// Check if there were any errors during the inserts
	if insertErr != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to insert carts"})
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}
func GetSellerOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	shopId, err := strconv.Atoi(r.URL.Query().Get("shop_id"))
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}
	filter := r.URL.Query().Get("filter")
	name := r.URL.Query().Get("name")
	pattern := "%" + name + "%"
	var orders []*model.Order1
	switch filter {
	case "none":
		switch name {
		case "none":
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.shop_id = ?", shopId).
				Select()

		default:
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("invoice ILIKE ? ", pattern).
				Where("order1.shop_id = ?", shopId).
				Order("id").
				Select()
		}
	case "pending":
		switch name {
		case "none":
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.shop_id = ? AND status = 'pending'", shopId).
				Select()
		default:
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.shop_id = ? AND status = 'pending'", shopId).
				Where("invoice ILIKE ? ", pattern).
				Select()
		}
	case "success":
		switch name {
		case "none":
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.shop_id = ? AND status = 'success'", shopId).
				Select()
		default:
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.shop_id = ? AND status = 'success'", shopId).
				Where("invoice ILIKE ?", pattern).
				Select()
		}
	case "cancel":
		switch name {
		case "none":
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.shop_id = ? AND status = 'cancel'", shopId).
				Select()
		default:
			err = db.Model(&orders).
				Column("order1.*", "Address").
				Relation("Address").
				Where("order1.shop_id = ? AND status = 'cancel'", shopId).
				Where("invoice ILIKE ? ", pattern).
				Select()
		}
	default:
		http.Error(w, "Invalid query parameters", http.StatusBadRequest)
		return
	}

	if len(orders) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "No orders found"})
		return
	}

	if err != nil {
		log.Println("Error retrieving data from database:", err)
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(orders)
}
func UpdateOrderStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	orderId, err := strconv.Atoi(r.URL.Query().Get("order_id"))
	data := r.URL.Query().Get("data")
	var order model.Order1
	err = db.Model(&order).
		Column("order1.*").
		Where("id = ? AND status = ?", orderId, "pending").
		Order("id").
		Select()

	if err != nil {
		log.Println("Error retrieving data from database:", err)
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}
	var carts []*model.Cart
	err = db.Model(&carts).
		Column("cart.*", "User", "Product").
		Relation("User").
		Relation("Product").
		Where("cart.order_id = ? AND is_like = ?", orderId, "ordered").
		Order("id").
		Select()
	var products []*model.Product
	err = db.Model(&products).
		Column("product.*").
		Order("id").
		Select()

	if err != nil {
		log.Println("Error updating order payload:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error updating order payload"})
	}
	if data == "cancel" {
		_, err = db.Model(&order).
			Column("order1.*").
			Set("status = ?", data).
			Where("id = ?", orderId).
			Update()
		json.NewEncoder(w).Encode(map[string]string{"message": "Order Canceled"})
		return
	} else if data == "success" {
		_, err = db.Model(&order).
			Column("order1.*").
			Set("status = ?", data).
			Where("id = ?", orderId).
			Update()
		for _, cart := range carts {
			product := cart.Product
			if product.Quantity-cart.Quantity < 0 {
				json.NewEncoder(w).Encode(map[string]string{"message": "Item not enough"})
			} else {
				_, err = db.Model(&product). // Pass a pointer to product here
								Column("product.*").
								Set("quantity = ?, sold = ?", product.Quantity-cart.Quantity, cart.Quantity+int(product.Sold)).
								Where("id = ?", cart.ProductId).
								Update()
				if err != nil {
					log.Println("Error updating product stock:", err)
					// Handle error as needed
				}
			}
		}

	}
	if err != nil {
		log.Println("Error retrieving data from database:", err)
		http.Error(w, "Something went wrong", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Success"})
}

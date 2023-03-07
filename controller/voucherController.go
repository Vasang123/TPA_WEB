package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func RedeemVoucher(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	userId, err := strconv.Atoi(r.URL.Query().Get("user_id"))
	voucherCode := r.URL.Query().Get("voucher")
	var voucher model.Voucher
	var user model.User
	err = db.Model(&voucher).
		Column("voucher.*").
		Where("name = ?", voucherCode).
		Order("id").
		Select()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid Voucher Code"})
		return
	}
	err = db.Model(&user).
		Column("user.*").
		Where("id = ?", userId).
		Select()
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid User"})
		return
	}

	newQuantity := voucher.Quantity - 1
	if newQuantity < 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "All of the voucher has quota has been redeemed"})
		return
	}
	_, err = db.Model(&voucher).
		Column("voucher.*").
		Set("quantity = ?", newQuantity).
		Where("name = ?", voucherCode).
		Order("id").
		Update()
	_, err = db.Model(&user).
		Column("user.*").
		Set("money = ?", user.Money+voucher.Bonus).
		Where("id = ?", userId).
		Update()
	json.NewEncoder(w).Encode(map[string]string{"message": fmt.Sprintf("Success! Bonus of %d Genesis has been added to your account.", voucher.Bonus)})

}

package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

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

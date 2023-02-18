package controller

import (
	"encoding/json"
	"net/http"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func GetCarouselData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	var promos []*model.Promo
	err := db.Model(&promos).
		Column("promo.*").
		Where("status = 'active'").
		Select()
	if err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(promos)
}

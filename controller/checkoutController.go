package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
)

func UserMoney(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()
	user_id, err := strconv.Atoi(r.URL.Query().Get("user_id"))
	if err != nil {

	}

	user := &model.User{}
	err = db.Model(user).
		Column("user.*").
		Order("id").
		Where("id = ?", user_id).
		Limit(1).
		Select()
	if err != nil {

	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(user.Money)
}

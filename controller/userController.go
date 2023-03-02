package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"time"

	"github.com/Vasang123/new_egg/connect"
	"github.com/Vasang123/new_egg/model"
	"github.com/dgrijalva/jwt-go"
	"github.com/go-pg/pg"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}

func ComparePasswords(pwd string, plainPwd []byte) bool {
	byteHash := []byte(pwd)
	err := bcrypt.CompareHashAndPassword(byteHash, plainPwd)
	if err != nil {
		log.Println(err)
		return false
	}

	return true
}

func GenerateToken(username string) (string, error) {
	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &model.Claim{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db := connect.Connect()
	defer db.Close()

	user := &model.User{}

	err := json.NewDecoder(r.Body).Decode(user)
	// fmt.Println("Payload:", r.Body)

	if err != nil {
		log.Println("Error decoding user payload:", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error decoding user payload"})
		return
	}

	checkEmail := &model.User{}
	err = db.Model(checkEmail).Where("email = ?", user.Email).Select()
	if err == nil {
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Email already exists"})
		return
	}

	user.Password = string(HashPassword([]byte(user.Password)))

	err = db.Insert(user)
	if err != nil {
		log.Println("Error inserting user into database:", err)
		// w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Register User"})
		return
	}
	if user.RoleID == 2 {
		auth := smtp.PlainAuth(
			"",
			"valentinosetiawan32@gmail.com",
			"ezyoxrdjeocyaubm",
			"smtp.gmail.com",
		)

		msg := "Subject: Your Shop Account has been verified" + "\n" + "You've been verified the shop account congrats"
		err := smtp.SendMail(
			"smtp.gmail.com:587",
			auth,
			"valentinosetiawan32@gmail.com",
			[]string{user.Email},
			[]byte(msg),
		)
		if err != nil {
			json.NewEncoder(w).Encode(map[string]string{"message": "Failed to Send Email"})
			return
		}
		userShop := &model.Shop{}
		userShop.UserId = user.ID
		err = db.Insert(userShop)
		if err != nil {
			json.NewEncoder(w).Encode(map[string]string{"message": "Error Creating Shop"})
			return
		}
	}
	log.Println("User payload after insertion:", user)

	// Generate Token
	tokenString, err := GenerateToken(user.FirstName)
	if err != nil {
		log.Println("Error generating JWT token:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error generating JWT token"})
		return
	}

	// Send Token
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}

func getPasswordHashFromDB(email string) (string, error) {
	var passwordHash string
	db := connect.Connect()
	defer db.Close()
	_, err := db.Query(pg.Scan(&passwordHash), "SELECT password FROM users WHERE email = ? ", email)
	if err != nil {
		return "Invalid Credential", err
	}
	return passwordHash, nil
}

func Login(w http.ResponseWriter, r *http.Request) {
	var data struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	fmt.Print(data)
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}

	email := data.Email
	password := data.Password

	// fmt.Println("Email:", email)
	// fmt.Println("Password:", password)

	// Get the password hash from the database for the email provided
	passwordHash, err := getPasswordHashFromDB(email)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// // Compare the password hash with the plain text password
	isPasswordCorrect := ComparePasswords(passwordHash, []byte(password))
	if !isPasswordCorrect {
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid Credential"})
		return
	}

	// Get the user data from the database
	user, err := getUserDataFromDB(email)
	if err != nil {
		log.Println(err)
		json.NewEncoder(w).Encode(map[string]string{"message": "Invalid Credential"})
		return
	}

	userData := &model.User{
		ID:           user.ID,
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		Email:        user.Email,
		Password:     user.Password,
		PhoneNumber:  user.PhoneNumber,
		RoleID:       user.RoleID,
		IsBanned:     user.IsBanned,
		IsSubscribed: user.IsSubscribed,
	}
	if userData.IsBanned == "yes" {
		json.NewEncoder(w).Encode(map[string]string{"message": "Your Account Is Banned"})
		return
	}

	tokenString, err := GenerateToken(user.FirstName)
	if err != nil {
		log.Println("Error generating JWT token:", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"message": "Error generating JWT token"})
		return
	}
	response := struct {
		User  *model.User `json:"user"`
		Token string      `json:"token"`
	}{
		User:  userData,
		Token: tokenString,
	}
	// Send Token
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(&response)
}

func getUserDataFromDB(email string) (*model.User, error) {
	db := connect.Connect()
	defer db.Close()
	user := &model.User{}

	_, err := db.Query(pg.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.PhoneNumber, &user.RoleID, &user.IsBanned, &user.IsSubscribed),
		"SELECT id, first_name, last_name, email, password, phone_number, role_id, is_banned,is_subscribed FROM users WHERE email=? ", email)
	if err != nil {
		return nil, err
	}
	return user, nil

}

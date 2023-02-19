package connect

import (
	"log"
	"os"

	model "github.com/Vasang123/new_egg/model"
	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// Connect to Database
func Connect() *pg.DB {
	opts := &pg.Options{
		User:     os.Getenv("USER"),
		Password: os.Getenv("PASSWORD"),
		Addr:     os.Getenv("ADDR"),
		Database: os.Getenv("DATABASE"),
	}
	var db *pg.DB = pg.Connect(opts)
	if db == nil {
		log.Printf("Failed to connect  to database\n")
		os.Exit(100)
	} else {
		log.Printf("Connect Success\n")
	}

	if err := createSchema(db); err != nil {
		log.Fatal(err)
	}

	return db
}

func createSchema(db *pg.DB) error {
	models := []interface{}{
		(*model.Product)(nil),
		(*model.User)(nil),
		(*model.Claim)(nil),
		(*model.Category)(nil),
		(*model.Role)(nil),
		(*model.Voucher)(nil),
		(*model.Review)(nil),
		(*model.Promo)(nil),
		(*model.Brand)(nil),
		(*model.Wishlist)(nil),
		(*model.Cart)(nil),
	}

	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
			IfNotExists: true,
		})
		if err != nil {
			return err
		}
	}

	return nil
}

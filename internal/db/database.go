package db

import (
	"database/sql"

	"fmt"
	"os"

	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() {
	_ = godotenv.Load()

	connStr := os.Getenv("DB_STRING")

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	err = DB.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to Postgreql")
}

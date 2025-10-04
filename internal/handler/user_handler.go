package handler

import (
	"expense_tracker/internal/db"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

var users = []User{
	{ID: 1, Name: "Alice", Email: "abc@example.com"},
	{ID: 2, Name: "Bob", Email: "abc1@example.com"},
}

func GetUsers(c *gin.Context) {
	rows, err := db.DB.Query("SELECT id, name, email FROM users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.ID, &user.Name, &user.Email); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
	var newUser User
	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("newUser received:", newUser)

	newUser.ID = rand.Intn(1000000)
	query := "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id"
	err := db.DB.QueryRow(query, newUser.Name, newUser.Email).Scan(&newUser.ID)
	if err != nil {
		fmt.Println("error: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newUser)
}

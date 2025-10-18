package handler

import (
	"expense_tracker/internal/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

var userIDCounter = 1
var Users = map[string]utils.User{}

func SignUp(c *gin.Context) {
	var input utils.User
	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 10)
	input.ID = userIDCounter
	input.Password = string(hashed)
	Users[input.Email] = input
	userIDCounter++

	c.JSON(http.StatusOK, gin.H{"message": "user created with name: " + input.Name})
}

func Login(c *gin.Context) {
	var input utils.User
	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, ok := Users[input.Email]
	if !ok || bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	token, _ := utils.GenerateJWT(user.ID)
	c.JSON(http.StatusOK, gin.H{"token": token, "user_id": strconv.Itoa(user.ID)})

}

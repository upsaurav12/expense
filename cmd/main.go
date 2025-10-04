package main

import (
	"expense_tracker/internal/config"
	"expense_tracker/internal/db"
	"expense_tracker/internal/router"

	"github.com/gin-contrib/cors"

	"log"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load config
	cfg := config.New()

	db.Connect()

	// Setup Gin
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:8081"}, // your React dev URLs
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Register routes
	router.RegisterRoutes(r)

	// Start server
	log.Printf("Server starting on port %s...", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}

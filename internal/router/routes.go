package router

import (
	"expense_tracker/internal/handler"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1")
	{
		v1.GET("/users", handler.GetUsers)
		v1.POST("/users", handler.CreateUser)
	}

	v2 := r.Group("api/v1")
	{
		v2.GET("/expenses", handler.GetExpenses)
		v2.POST("/expenses", handler.CreateExpense)
	}
}

package router

import (
	"expense_tracker/internal/handler"
	"expense_tracker/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {

	r.POST("/signup", handler.SignUp)
	r.POST("/login", handler.Login)

	protected := r.Group("/api/v1")
	protected.Use(middleware.AuthMiddleware())
	protected.GET("groups", handler.GetGroups)
	protected.POST("groups", handler.CreateGroup)
	// v1 := r.Group("/api/v1")
	// {
	// 	v1.GET("/users", handler.GetUsers)
	// 	v1.POST("/users", handler.CreateUser)
	// }

	// v2 := r.Group("api/v1")
	// {
	// 	v2.GET("/expenses", handler.GetExpenses)
	// 	v2.POST("/expenses", handler.CreateExpense)
	// }

	// v3 := r.Group("api/v1")
	// {
	// 	v3.GET("/groups", handler.GetGroups)
	// 	v3.POST("/groups", handler.CreateGroup)
	// }

}

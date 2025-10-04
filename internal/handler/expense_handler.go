package handler

import (
	"expense_tracker/internal/db"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Expense struct {
	ID          int       `json:"id"`
	UserID      int       `json:"user_id"`
	Description string    `json:"description"`
	Amount      float64   `json:"amount"`
	Category    string    `json:"category"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func GetExpenses(c *gin.Context) {
	rows, err := db.DB.Query("SELECT id, user_id, amount, category, description, created_at, updated_at FROM expense")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var expenses []Expense
	for rows.Next() {
		var expense Expense
		if err := rows.Scan(
			&expense.ID,
			&expense.UserID,
			&expense.Amount,
			&expense.Category,
			&expense.Description,
			&expense.CreatedAt,
			&expense.UpdatedAt,
		); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		expenses = append(expenses, expense)
	}

	c.JSON(http.StatusOK, gin.H{"body": expenses})
}

func CreateExpense(c *gin.Context) {
	var newExpense Expense
	if err := c.BindJSON(&newExpense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
        INSERT INTO expense (user_id, amount, category, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id, user_id, amount, category, description, created_at, updated_at
    `

	err := db.DB.QueryRow(
		query,
		newExpense.UserID,
		newExpense.Amount,
		newExpense.Category,
		newExpense.Description,
	).Scan(
		&newExpense.ID,
		&newExpense.UserID,
		&newExpense.Amount,
		&newExpense.Category,
		&newExpense.Description,
		&newExpense.CreatedAt,
		&newExpense.UpdatedAt,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newExpense)
}

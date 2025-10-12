package handler

import (
	"encoding/json"
	"expense_tracker/internal/db"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Group struct {
	ID             string   `json:"id"`
	UserID         string   `json:"user_id"`
	Name           string   `json:"name"`
	Description    string   `json:"description"`
	Members        []string `json:"members"`
	InitialExpense uint     `json:"initial_expense"`
	Expenses       []int    `json:"expenses"`
}

func GetGroups(c *gin.Context) {
	query := `SELECT id,name, description, members, initial_expense,expenses FROM groups`

	rows, err := db.DB.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer rows.Close()

	var groups []Group

	var membersData, expenseData []byte
	for rows.Next() {
		var group Group
		err := rows.Scan(&group.ID,
			&group.Name,
			&group.Description,
			&membersData,
			&group.InitialExpense,
			&expenseData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}

		if len(expenseData) > 0 {
			if err := json.Unmarshal(expenseData, &group.Expenses); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}

		if len(membersData) > 0 {
			if err := json.Unmarshal(membersData, &group.Members); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}

		groups = append(groups, group)
	}

	c.JSON(http.StatusOK, gin.H{"data": groups})
}

func CreateGroup(c *gin.Context) {
	userId := c.GetInt("user_id")
	var group Group
	if err := c.BindJSON(&group); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	membersJSON, err := json.Marshal(group.Members)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to unmarshal members"})
		return
	}

	expenseJSON, err := json.Marshal(group.Expenses)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to unmarshal members"})
		return
	}

	query := `
		INSERT INTO groups (user_id,name,description, members, initial_expense, expenses)
		VALUES ($1, $2,$3::jsonb, $4, $5::jsonb)
		RETURNING id,user_id, name, description, members, initial_expense, expenses
	`

	rows := db.DB.QueryRow(query,
		userId,
		group.Name,
		group.Description,
		string(membersJSON),
		group.InitialExpense,
		string(expenseJSON))

	c.JSON(http.StatusCreated, gin.H{"data": group})

	var membersData, expenseData []byte

	err = rows.Scan(
		&group.ID,
		&group.UserID,
		&group.Name,
		&group.Description,
		&membersData,
		&group.InitialExpense,
		&expenseData,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_ = json.Unmarshal(membersData, &group.Members)
	_ = json.Unmarshal(expenseData, &group.Expenses)

	c.JSON(http.StatusCreated, gin.H{"data": group})
}

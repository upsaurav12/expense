package handler

import "time"

type UserExpense struct {
	ID          int       `json:"id" db:"id"`
	UserID      int       `json:"user_id" db:"user_id"`
	Description string    `json:"description" db:"desciption"`
	Category    string    `json:"category" db:"category"`
	Amount      string    `json:"amount"`
	Currency    string    `json:"currency"`
	Date        time.Time `json:"date" db:"date"`
	Location    string    `json:"location" db:"location"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}



package dto

import "waysbeans/models"

type TransactionRequest struct {
	Qty       int    `json:"qty"`
	Total     int    `json:"total"`
	UserID    int    `json:"user_id"`
	ProductID int    `json:"product_id"`
	Status    string `json:"status"`
}

type TransactionResponse struct {
	ID         string                 `json:"id"`
	MidtransID string                 `json:"midtrans_id"`
	OrderDate  string                 `json:"order_date"`
	Qty        int                    `json:"qty"`
	Total      int                    `json:"total"`
	Status     string                 `json:"status"`
	User       models.UserResponse    `json:"user"`
	Product    models.ProductResponse `json:"product"`
}

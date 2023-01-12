package dto

import "waysbeans/models"

type AddOrderRequest struct {
	ProductID int `json:"product_id"`
}

type UpdateOrderRequest struct {
	Event string `json:"event"`
}

type OrderResponse struct {
	ID       int                    `json:"id"`
	OrderQty int                    `json:"order_qty"`
	Product  models.ProductResponse `json:"product"`
}

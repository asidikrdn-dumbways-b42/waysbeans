package dto

type CreateProductRequest struct {
	Name        string `form:"name" validate:"required"`
	Stock       int    `form:"stock" validate:"required"`
	Price       int    `form:"price" validate:"required"`
	Description string `form:"description" validate:"required"`
	Image       string `form:"image" validate:"required"`
}

type UpdateProductRequest struct {
	Name        string `form:"name"`
	Stock       int    `form:"stock"`
	Price       int    `form:"price"`
	Description string `form:"description"`
	Image       string `form:"image"`
	Status      string `form:"status"`
}

type ProductResponse struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Stock       int    `json:"stock"`
	Price       int    `json:"price"`
	Description string `json:"description"`
	Image       string `json:"image"`
	Status      string `json:"status"`
}

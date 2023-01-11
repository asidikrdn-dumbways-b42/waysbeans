package models

type Transaction struct {
	ID        string          `json:"id" gorm:"type: varchar(255)"`
	Qty       int             `json:"qty" gorm:"type: int"`
	Total     int             `json:"total" gorm:"type: int"`
	Status    string          `json:"status" gorm:"type: varchar(255)"`
	UserID    int             `json:"user_id" gorm:"type: int"`
	User      UserResponse    `json:"users"`
	ProductID int             `json:"product_id" gorm:"type: int"`
	Product   ProductResponse `json:"products"`
}

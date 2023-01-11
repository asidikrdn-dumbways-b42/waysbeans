package models

type Transaction struct {
	ID        int             `json:"id" gorm:"type: int"`
	Status    string          `json:"status" gorm:"type: varchar(255)"`
	UserID    int             `json:"user_id" gorm:"type: int"`
	User      UserResponse    `json:"users"`
	ProductID int             `json:"product_id" gorm:"type: int"`
	Product   ProductResponse `json:"products"`
}

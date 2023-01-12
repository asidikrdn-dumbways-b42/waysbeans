package database

import (
	"fmt"
	"waysbeans/models"
	"waysbeans/pkg/mysql"
)

func RunMigration() {
	// menjalankan migration
	err := mysql.DB.AutoMigrate(&models.User{}, &models.Product{}, &models.Transaction{}, &models.Order{})
	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}

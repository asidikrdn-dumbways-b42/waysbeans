package database

import (
	"fmt"
	"waysbeans/models"
	"waysbeans/pkg/mysql"
)

func RunMigration() {
	// menjalankan migration
	err := mysql.DB.AutoMigrate(&models.Product{}, &models.User{}, &models.Transaction{})
	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}

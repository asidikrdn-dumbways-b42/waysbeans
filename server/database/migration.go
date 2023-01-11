package database

import (
	"fmt"
	"waysbeans/models"
	"waysbeans/pkg/postgre"
)

func RunMigration() {
	// menjalankan migration
	err := postgre.DB.AutoMigrate(&models.Product{}, &models.User{}, &models.Transaction{})
	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}

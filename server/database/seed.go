package database

import (
	"errors"
	"fmt"
	"log"
	"os"
	"waysbeans/models"
	"waysbeans/pkg/bcrypt"
	"waysbeans/pkg/mysql"

	"gorm.io/gorm"
)

func RunSeeder() {
	// ==================================
	// CREATE SUPER ADMIN ON MIGRATION
	// ==================================

	// cek is user table exist
	if mysql.DB.Migrator().HasTable(&models.User{}) {
		// check is user table has minimum 1 user as admin
		err := mysql.DB.First(&models.User{}, "role = ?", "admin").Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// create 1 admin
			newUser := models.User{
				Name:  "Administrator",
				Role:  "admin",
				Email: os.Getenv("ADMIN_EMAIL"),
			}

			hashPassword, err := bcrypt.HashingPassword(os.Getenv("ADMIN_PASSWORD"))
			if err != nil {
				log.Fatal("Hash password failed")
			}

			newUser.Password = hashPassword

			// insert admin to database
			errAddUser := mysql.DB.Select("Name", "Role", "Email", "Password").Create(&newUser).Error
			if errAddUser != nil {
				fmt.Println(errAddUser.Error())
				log.Fatal("Seeding failed")
			}
		}
	}

	fmt.Println("Seeding completed successfully")
}

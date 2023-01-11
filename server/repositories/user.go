package repositories

import "waysbeans/models"

type UserRepository interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	DeleteUser(user models.User) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
}

// mengambil semua data user
func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error
	return users, err
}

// mengambil 1 user berdasarkan ID
func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error
	return user, err
}

// menambahkan user baru
func (r *repository) CreateUser(newUser models.User) (models.User, error) {
	err := r.db.Create(&newUser).Error
	return newUser, err
}

// menghapus 1 user
func (r *repository) DeleteUser(user models.User) (models.User, error) {
	err := r.db.Delete(&user).Error
	return user, err
}

// mengupdate 1 user
func (r *repository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Save(&user).Error
	return user, err
}

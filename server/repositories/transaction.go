package repositories

import "waysbeans/models"

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
}

// mengambil semua data transaction
func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Find(&transactions).Error
	return transactions, err
}

// mengambil 1 transaction berdasarkan ID
func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.First(&transaction, ID).Error
	return transaction, err
}

// menambahkan transaction baru
func (r *repository) CreateTransaction(newTransaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&newTransaction).Error
	return newTransaction, err
}

// mengupdate 1 transaction
func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error
	return transaction, err
}

// menghapus 1 transaction
func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error
	return transaction, err
}

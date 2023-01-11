package repositories

import "waysbeans/models"

type ProductRepository interface {
	FindProducts() ([]models.Product, error)
	GetProduct(ID int) (models.Product, error)
	UpdateProduct(product models.Product) (models.Product, error)
	DeleteProduct(product models.Product) (models.Product, error)
}

// mengambil semua data product
func (r *repository) FindProducts() ([]models.Product, error) {
	var products []models.Product
	err := r.db.Find(&products).Error
	return products, err
}

// mengambil 1 product berdasarkan ID
func (r *repository) GetProduct(ID int) (models.Product, error) {
	var product models.Product
	err := r.db.First(&product, ID).Error
	return product, err
}

// menambahkan product baru
func (r *repository) CreateProduct(newProduct models.Product) (models.Product, error) {
	err := r.db.Create(&newProduct).Error
	return newProduct, err
}

// mengupdate 1 product
func (r *repository) UpdateProduct(product models.Product) (models.Product, error) {
	err := r.db.Save(&product).Error
	return product, err
}

// menghapus 1 product
func (r *repository) DeleteProduct(product models.Product) (models.Product, error) {
	err := r.db.Delete(&product).Error
	return product, err
}

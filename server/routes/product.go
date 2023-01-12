package routes

import (
	"waysbeans/handlers"
	"waysbeans/pkg/middleware"
	"waysbeans/pkg/mysql"
	"waysbeans/repositories"

	"github.com/gorilla/mux"
)

func Product(r *mux.Router) {
	productRepository := repositories.MakeRepository(mysql.DB)
	h := handlers.HandlerProduct(productRepository)

	// mengambil semua data product
	r.HandleFunc("/products", h.FindProducts).Methods("GET")

	// mengambil satu data product
	r.HandleFunc("/product/{id}", h.GetProduct).Methods("GET")

	// menambahkan product
	r.HandleFunc("/product", middleware.AdminAuth(middleware.UploadFile(h.CreateProduct))).Methods("POST")

	// mengupdate product
	r.HandleFunc("/product/{id}", middleware.AdminAuth(middleware.UploadFile(h.UpdateProduct))).Methods("PATCH")

	// menghapus product
	r.HandleFunc("/product/{id}", middleware.AdminAuth(h.DeleteProduct)).Methods("DELETE")
}

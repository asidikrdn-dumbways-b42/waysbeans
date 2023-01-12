package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"waysbeans/dto"
	"waysbeans/models"
	"waysbeans/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(productRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{productRepository}
}

// mengambil data semua product
func (h *handlerProduct) FindProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	products, err := h.ProductRepository.FindProducts()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := dto.ErrorResult{
			Status:  http.StatusNotFound,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: http.StatusOK,
		Data:   convertMultipleProductResponse(products),
	}
	json.NewEncoder(w).Encode(response)
}

// mengambil data 1 product
func (h *handlerProduct) GetProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := dto.ErrorResult{
			Status:  http.StatusNotFound,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: http.StatusOK,
		Data:   convertProductResponse(product),
	}
	json.NewEncoder(w).Encode(response)
}

// menambahkan product baru
func (h *handlerProduct) CreateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err := r.ParseMultipartForm(1024)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status:  http.StatusBadRequest,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	var request = dto.CreateProductRequest{
		Name:        r.FormValue("name"),
		Description: r.FormValue("description"),
		Image:       r.Context().Value("image").(string),
	}
	request.Stock, _ = strconv.Atoi(r.FormValue("stock"))
	request.Price, _ = strconv.Atoi(r.FormValue("price"))

	// memvalidasi inputan dari request body berdasarkan struct dto.CountryRequest
	validation := validator.New()
	errValidation := validation.Struct(request)
	if errValidation != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: errValidation.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var newProduct = models.Product{
		Name:        request.Name,
		Price:       request.Price,
		Stock:       request.Stock,
		Image:       request.Image,
		Description: request.Description,
		Status:      "active",
	}

	productAdded, err := h.ProductRepository.CreateProduct(newProduct)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	product, err := h.ProductRepository.GetProduct(productAdded.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusCreated)
	response := dto.SuccessResult{
		Status: http.StatusCreated,
		Data:   convertProductResponse(product),
	}
	json.NewEncoder(w).Encode(response)
}

// mengupdate product
func (h *handlerProduct) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	err := r.ParseMultipartForm(1024)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status:  http.StatusBadRequest,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	var request = dto.UpdateProductRequest{
		Name:        r.FormValue("name"),
		Description: r.FormValue("description"),
		Image:       r.Context().Value("image").(string),
	}
	request.Stock, _ = strconv.Atoi(r.FormValue("stock"))
	request.Price, _ = strconv.Atoi(r.FormValue("price"))

	updateProduct, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := dto.ErrorResult{
			Status:  http.StatusNotFound,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Name != "" {
		updateProduct.Name = request.Name
	}
	if request.Price != 0 {
		updateProduct.Price = request.Price
	}
	if request.Stock != 0 {
		updateProduct.Stock = request.Stock
	}
	if request.Image != "" {
		updateProduct.Image = request.Image
	}
	if request.Description != "" {
		updateProduct.Description = request.Description
	}

	productUpdated, err := h.ProductRepository.UpdateProduct(updateProduct)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	product, err := h.ProductRepository.GetProduct(productUpdated.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: http.StatusOK,
		Data:   convertProductResponse(product),
	}
	json.NewEncoder(w).Encode(response)
}

// menghapus product (product hanya tidak bisa di get, tetapi masih tersedia di database, sehingga tidak mengganggu relasi ke tabel transaksi)
func (h *handlerProduct) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	updateProduct, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := dto.ErrorResult{
			Status:  http.StatusNotFound,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	updateProduct.Status = "inactive"

	productUpdated, err := h.ProductRepository.UpdateProduct(updateProduct)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: http.StatusOK,
		Data:   fmt.Sprintf("Product dengan id %d berhasil di non-aktifkan", productUpdated.ID),
	}
	json.NewEncoder(w).Encode(response)
}

func convertMultipleProductResponse(products []models.Product) []dto.ProductResponse {
	var productsResponse []dto.ProductResponse

	for _, p := range products {
		productsResponse = append(productsResponse, dto.ProductResponse(p))
	}

	return productsResponse
}

func convertProductResponse(product models.Product) dto.ProductResponse {
	return dto.ProductResponse(product)
}

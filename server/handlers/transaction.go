package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	_ "time/tzdata"
	"waysbeans/dto"
	"waysbeans/models"
	"waysbeans/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(transactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{transactionRepository}
}

// mengambil seluruh data transaksi
func (h *handlerTransaction) FindTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		res := dto.ErrorResult{
			Status:  "error",
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := dto.SuccessResult{
		Status: "success",
		Data:   convertMultipleTransactionResponse(transactions),
	}
	json.NewEncoder(w).Encode(res)
}

// mengambil seluruh data transaksi milik user tertentu
func (h *handlerTransaction) FindTransactionsByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	idUser := int(userInfo["id"].(float64))

	transactions, err := h.TransactionRepository.FindTransactionsByUser(idUser)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		res := dto.ErrorResult{
			Status:  "error",
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := dto.SuccessResult{
		Status: "success",
		Data:   convertMultipleTransactionResponse(transactions),
	}
	json.NewEncoder(w).Encode(res)
}

// mengambil 1 data transaksi
func (h *handlerTransaction) GetDetailTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := mux.Vars(r)["id"]

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		res := dto.ErrorResult{
			Status:  "error",
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := dto.SuccessResult{
		Status: "success",
		Data:   convertTransactionResponse(transaction),
	}
	json.NewEncoder(w).Encode(res)
}

// membuat transaksi baru
func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var request dto.CreateTransactionRequest
	json.NewDecoder(r.Body).Decode(&request)

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	request.UserID = int(userInfo["id"].(float64))

	// memvalidasi inputan dari request body
	validation := validator.New()
	errValidation := validation.Struct(request)
	if errValidation != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: "error", Message: errValidation.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	newTransaction := models.Transaction{
		ID:        fmt.Sprintf("TRX-%d-%d", request.UserID, timeIn("Asia/Jakarta").UnixNano()),
		OrderDate: timeIn("Asia/Jakarta"),
		Total:     request.Total,
		Status:    "new",
		UserID:    request.UserID,
	}

	for _, order := range request.Products {
		newTransaction.Order = append(newTransaction.Order, models.OrderResponseForTransaction{
			ID:        order.ID,
			ProductID: order.ProductID,
			OrderQty:  order.OrderQty,
		})
	}

	transactionAdded, err := h.TransactionRepository.CreateTransaction(newTransaction)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status:  "error",
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	transaction, err := h.TransactionRepository.GetTransaction(transactionAdded.ID)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		res := dto.ErrorResult{
			Status:  "error",
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	w.WriteHeader(http.StatusCreated)
	res := dto.SuccessResult{
		Status: "success", Data: transaction,
	}
	json.NewEncoder(w).Encode(res)
}

func convertMultipleTransactionResponse(transactions []models.Transaction) []dto.TransactionResponse {
	var transactionsResponse []dto.TransactionResponse

	for _, trx := range transactions {
		var trxResponse = dto.TransactionResponse{
			ID:         trx.ID,
			MidtransID: trx.MidtransID,
			OrderDate:  trx.OrderDate.Format("Monday, 2 January 2006"),
			Total:      trx.Total,
			Status:     trx.Status,
			User:       trx.User,
		}

		for _, order := range trx.Order {
			trxResponse.Products = append(trxResponse.Products, dto.ProductResponseForTransaction{
				ID:          order.Product.ID,
				Name:        order.Product.Name,
				Price:       order.Product.Price,
				Description: order.Product.Description,
				Image:       order.Product.Image,
				OrderQty:    order.OrderQty,
			})
		}

		transactionsResponse = append(transactionsResponse, trxResponse)
	}

	return transactionsResponse
}

func convertTransactionResponse(transaction models.Transaction) dto.TransactionResponse {
	var transactionResponse = dto.TransactionResponse{
		ID:         transaction.ID,
		MidtransID: transaction.MidtransID,
		OrderDate:  transaction.OrderDate.Format("Monday, 2 January 2006"),
		Total:      transaction.Total,
		Status:     transaction.Status,
		User:       transaction.User,
	}

	for _, order := range transaction.Order {
		transactionResponse.Products = append(transactionResponse.Products, dto.ProductResponseForTransaction{
			ID:          order.Product.ID,
			Name:        order.Product.Name,
			Price:       order.Product.Price,
			Description: order.Product.Description,
			Image:       order.Product.Image,
			OrderQty:    order.OrderQty,
		})
	}

	return transactionResponse
}

// fungsi untuk mendapatkan waktu sesuai zona indonesia
func timeIn(name string) time.Time {
	loc, err := time.LoadLocation(name)
	if err != nil {
		panic(err)
	}
	return time.Now().In(loc)
}

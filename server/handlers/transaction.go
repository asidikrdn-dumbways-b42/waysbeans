package handlers

import (
	"encoding/json"
	"net/http"
	"time"
	_ "time/tzdata"
	"waysbeans/dto"
	"waysbeans/models"
	"waysbeans/repositories"

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
// func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	var request dto.CreateTransactionRequest
// 	json.NewDecoder(r.Body).Decode(&request)

// 	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
// 	request.UserID = int(userInfo["id"].(float64))

// 	// memvalidasi inputan dari request body
// 	validation := validator.New()
// 	errValidation := validation.Struct(request)
// 	if errValidation != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		response := dto.ErrorResult{Status: http.StatusBadRequest, Message: errValidation.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	newTransaction := models.Transaction{
// 		ID:        fmt.Sprintf("TRX-%d-%d-%d", request.ProductID, request.UserID, timeIn("Asia/Jakarta").UnixNano()),
// 		OrderDate: timeIn("Asia/Jakarta"),
// 		Qty:       request.Qty,
// 		Total:     request.Total,
// 		Status:    "new",
// 		UserID:    request.UserID,
// 		ProductID: request.ProductID,
// 	}

// 	transactionAdded, err := h.TransactionRepository.CreateTransaction(newTransaction)
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)

// 	}
// }

func convertMultipleTransactionResponse(transactions []models.Transaction) []dto.TransactionResponse {
	var transactionsResponse []dto.TransactionResponse

	for _, trx := range transactions {
		var trxResponse = dto.TransactionResponse{
			ID:         trx.ID,
			MidtransID: trx.MidtransID,
			OrderDate:  trx.OrderDate.Format("Monday, 2 January 2006"),
			Qty:        trx.Qty,
			Total:      trx.Total,
			Status:     trx.Status,
			User:       trx.User,
			// Product:    trx.Product,
		}
		transactionsResponse = append(transactionsResponse, trxResponse)
	}

	return transactionsResponse
}

func convertTransactionResponse(transactions models.Transaction) dto.TransactionResponse {
	var transactionsResponse = dto.TransactionResponse{
		ID:         transactions.ID,
		MidtransID: transactions.MidtransID,
		OrderDate:  transactions.OrderDate.Format("Monday, 2 January 2006"),
		Qty:        transactions.Qty,
		Total:      transactions.Total,
		Status:     transactions.Status,
		User:       transactions.User,
		// Product:    transactions.Product,
	}

	return transactionsResponse
}

// fungsi untuk mendapatkan waktu sesuai zona indonesia
func timeIn(name string) time.Time {
	loc, err := time.LoadLocation(name)
	if err != nil {
		panic(err)
	}
	return time.Now().In(loc)
}

package routes

import (
	"waysbeans/handlers"
	"waysbeans/pkg/middleware"
	"waysbeans/pkg/mysql"
	"waysbeans/repositories"

	"github.com/gorilla/mux"
)

func Transaction(r *mux.Router) {
	transactionRepository := repositories.MakeRepository(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	r.HandleFunc("/transactions-admin", middleware.AdminAuth(h.FindTransactions)).Methods("GET")
	r.HandleFunc("/transactions", middleware.UserAuth(h.FindTransactionsByUser)).Methods("GET")
	r.HandleFunc("/transaction/{id}", middleware.UserAuth(h.GetDetailTransaction)).Methods("GET")
	r.HandleFunc("/transaction", middleware.UserAuth(h.CreateTransaction)).Methods("POST")
	r.HandleFunc("/transaction/{id}", middleware.UserAuth(h.UpdateTransactionStatus)).Methods("PATCH")

	// membuat endpoint untuk midtrans
	r.HandleFunc("/notification", h.Notification).Methods("POST")

}

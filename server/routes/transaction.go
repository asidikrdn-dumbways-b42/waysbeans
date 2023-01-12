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

	r.HandleFunc("/transactions", middleware.AdminAuth(h.FindTransactions)).Methods("GET")
	r.HandleFunc("/order", middleware.UserAuth(h.FindTransactionsByUser)).Methods("GET")
	r.HandleFunc("/transaction/{id}", middleware.UserAuth(h.GetDetailTransaction)).Methods("GET")
}

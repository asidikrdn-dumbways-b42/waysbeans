package routes

import (
	"waysbeans/handlers"
	"waysbeans/pkg/middleware"
	"waysbeans/pkg/mysql"
	"waysbeans/repositories"

	"github.com/gorilla/mux"
)

func Order(r *mux.Router) {
	orderRepository := repositories.MakeRepository(mysql.DB)
	h := handlers.HandlerOrder(orderRepository)

	// find orders
	r.HandleFunc("/orders", middleware.UserAuth(h.FindOrders)).Methods("GET")

	// add order
	r.HandleFunc("/order", middleware.UserAuth(h.AddOrder)).Methods("POST")

	// get 1 order
	r.HandleFunc("/order/{id}", middleware.UserAuth(h.GetOrder)).Methods("GET")

	// update order
	r.HandleFunc("/order/{id}", middleware.UserAuth(h.UpdateOrder)).Methods("PATCH")

	// delete order
	r.HandleFunc("/order/{id}", middleware.UserAuth(h.DeleteOrder)).Methods("DELETE")
}

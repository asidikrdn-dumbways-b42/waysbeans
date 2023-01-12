package routes

import (
	"waysbeans/handlers"
	"waysbeans/pkg/middleware"
	"waysbeans/pkg/mysql"
	"waysbeans/repositories"

	"github.com/gorilla/mux"
)

func User(r *mux.Router) {
	userRepository := repositories.MakeRepository(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	// mengambil semua users
	r.HandleFunc("/users", middleware.AdminAuth(h.FindUsers)).Methods("GET")

	// mengambil 1 detail user
	r.HandleFunc("/user", middleware.UserAuth(h.GetUser)).Methods("GET")

	// mengupdate data user
	r.HandleFunc("/user", middleware.UserAuth(middleware.UploadFile(h.UpdateUser))).Methods("PATCH")
}

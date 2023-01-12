package routes

import "github.com/gorilla/mux"

// membuat Router untuk menampung/mengumpulkan semua router
func RouterInit(r *mux.Router) {
	Auth(r)
	User(r)
}

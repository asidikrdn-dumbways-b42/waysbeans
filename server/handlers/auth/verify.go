package authHandlers

import (
	"encoding/json"
	"net/http"
	"os"
	"waysbeans/dto"
	"waysbeans/models"
	jwtToken "waysbeans/pkg/jwt"

	"github.com/gorilla/mux"
)

func (h *handlerAuth) VerifyRegistration(w http.ResponseWriter, r *http.Request) {
	// mengambil token dari url parameter
	token := mux.Vars(r)["token"]

	claims, err := jwtToken.DecodeToken(token)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{
			Status:  "error",
			Message: "Token is not valid",
		}
		json.NewEncoder(w).Encode(response)
	}

	// membuat object user baru dengan cetakan models.User
	newUser := models.User{
		Name:     claims["name"].(string),
		Email:    claims["email"].(string),
		Password: claims["password"].(string),
		Role:     claims["role"].(string),
	}

	// mengirim data user baru ke database
	_, err = h.AuthRepository.Register(newUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: "error", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	http.Redirect(w, r, os.Getenv("REDIRECT_URL_ON_VERIFICATION"), http.StatusFound)
}

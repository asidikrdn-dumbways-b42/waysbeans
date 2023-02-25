package authHandlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
	"waysbeans/dto"
	"waysbeans/pkg/bcrypt"
	jwtToken "waysbeans/pkg/jwt"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
)

// mendaftarkan user baru
func (h *handlerAuth) Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// mengambil data user dari request body
	var request dto.RegisterRequest
	json.NewDecoder(r.Body).Decode(&request)

	// memvalidasi inputan dari request body
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: "error", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// hashing password
	hashedPassword, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: "error", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// menyiapkan claims
	myClaims := jwt.MapClaims{}
	myClaims["name"] = request.Name
	myClaims["email"] = request.Email
	myClaims["password"] = hashedPassword
	myClaims["role"] = "user"
	myClaims["exp"] = time.Now().Add(time.Hour * 2).Unix() // 2 jam expired

	// menggenerate token jwt
	token, errGenerateToken := jwtToken.GenerateToken(&myClaims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return
	}

	fmt.Println(request)

	// cek apakah email sudah terdaftar
	if h.AuthRepository.IsUserRegistered(request.Email) {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{
			Status:  "error",
			Message: "User already registered",
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	// mengirim email verifikasi
	SendVerification(token, request, r)

	// // menyiapkan response
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: "success",
		Data:   "Verify your email to complete your registration",
	}
	// mengirim response
	json.NewEncoder(w).Encode(response)
}

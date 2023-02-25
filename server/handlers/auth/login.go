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

	"github.com/golang-jwt/jwt/v4"
)

// autentikasi login
func (h *handlerAuth) Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// mengambil data login dari request body
	var request dto.LoginRequest
	json.NewDecoder(r.Body).Decode(&request)

	if request.Email == "" || request.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: "error", Message: "Please enter a valid email and password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// validasi email
	userLogin, err := h.AuthRepository.Login(request.Email)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := dto.ErrorResult{Status: "error", Message: "email not registered"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// validasi password
	isPasswordValid := bcrypt.CheckPassword(request.Password, userLogin.Password)
	if !isPasswordValid {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: "error", Message: "wrong password"}
		json.NewEncoder(w).Encode(response)
		return
	}

	// menyiapkan claims
	myClaims := jwt.MapClaims{}
	myClaims["id"] = userLogin.ID
	myClaims["name"] = userLogin.Name
	myClaims["email"] = userLogin.Email
	myClaims["role"] = userLogin.Role
	myClaims["exp"] = time.Now().Add(time.Hour * 8).Unix() // 8 jam expired

	// menggenerate token jwt
	token, errGenerateToken := jwtToken.GenerateToken(&myClaims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return
	}

	// membuat data yang akan disisipkan di response
	var loginResponse dto.AuthResponse
	loginResponse.ID = userLogin.ID
	loginResponse.Name = userLogin.Name
	loginResponse.Email = userLogin.Email
	loginResponse.Role = userLogin.Role
	loginResponse.Token = token

	// menyiapkan response
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: "success",
		Data:   loginResponse,
	}
	// mengirim response
	json.NewEncoder(w).Encode(response)
}

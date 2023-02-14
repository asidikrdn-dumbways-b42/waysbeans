package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"text/template"
	"time"
	"waysbeans/dto"
	"waysbeans/models"
	"waysbeans/pkg/bcrypt"
	jwtToken "waysbeans/pkg/jwt"
	"waysbeans/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"gopkg.in/gomail.v2"
)

// membuat struct handler sebagai tipe data untuk menampung interface AuthRepository dari package repositories
type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

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

// membuat fungsi untuk mengkonversi data yang akan dikirim sebagai response dari register request
func convertRegisterResponse(user models.User) dto.RegisterResponse {
	var result dto.RegisterResponse

	result.Name = user.Name
	result.Email = user.Email
	result.Role = user.Role

	return result
}

// mendaftarkan admin baru
func (h *handlerAuth) RegisterAdmin(w http.ResponseWriter, r *http.Request) {
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

	// menghashing password
	hashedPassword, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Status: "error", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// membuat object user baru dengan cetakan models.User
	newUser := models.User{
		Name:     request.Name,
		Email:    request.Email,
		Password: hashedPassword,
		Role:     "admin",
	}

	// mengirim data user baru ke database
	userAdded, err := h.AuthRepository.Register(newUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Status: "error", Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// menyiapkan response
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: "success",
		Data:   convertRegisterResponse(userAdded),
	}
	// mengirim response
	json.NewEncoder(w).Encode(response)
}

// memeriksa autentikasi
func (h *handlerAuth) CheckAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// mengambil claims dari jwt
	claims := r.Context().Value("userInfo").(jwt.MapClaims)

	// membuat data yang akan disisipkan di response
	var authResponse dto.AuthResponse
	authResponse.ID = int(claims["id"].(float64))
	authResponse.Name = claims["name"].(string)
	authResponse.Email = claims["email"].(string)
	authResponse.Role = claims["role"].(string)
	authResponse.Token = strings.Replace(r.Header.Get("Authorization"), "Bearer ", "", -1)

	// menyiapkan response
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: "success",
		Data:   authResponse,
	}
	// mengirim response
	json.NewEncoder(w).Encode(response)
}

func SendVerification(token string, user dto.RegisterRequest, r *http.Request) {

	var CONFIG_SMTP_HOST = os.Getenv("CONFIG_SMTP_HOST")
	var CONFIG_SMTP_PORT, _ = strconv.Atoi(os.Getenv("CONFIG_SMTP_PORT"))
	var CONFIG_SENDER_NAME = os.Getenv("CONFIG_SENDER_NAME")
	var CONFIG_AUTH_EMAIL = os.Getenv("CONFIG_AUTH_EMAIL")
	var CONFIG_AUTH_PASSWORD = os.Getenv("CONFIG_AUTH_PASSWORD")

	data := map[string]string{
		"Name": user.Name,
		"URL":  fmt.Sprintf("http://%s/api/v1/verification/%s", "https://waysbeans.asidikrdn.my.id", token),
	}

	// mengambil file template
	t, err := template.ParseFiles("view/verification_email.html")
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	bodyMail := new(bytes.Buffer)

	// mengeksekusi template, dan memparse "data" ke template
	t.Execute(bodyMail, data)

	// create new message
	verificationEmail := gomail.NewMessage()
	verificationEmail.SetHeader("From", CONFIG_SENDER_NAME)
	verificationEmail.SetHeader("To", user.Email)
	verificationEmail.SetHeader("Subject", "Email Verification")
	verificationEmail.SetBody("text/html", bodyMail.String())

	verificationDialer := gomail.NewDialer(
		CONFIG_SMTP_HOST,
		CONFIG_SMTP_PORT,
		CONFIG_AUTH_EMAIL,
		CONFIG_AUTH_PASSWORD,
	)

	err = verificationDialer.DialAndSend(verificationEmail)
	if err != nil {
		log.Fatal(err.Error())
	}

	log.Println("Pesan terkirim!")
}

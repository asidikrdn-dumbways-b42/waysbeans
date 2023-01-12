package handlers

import (
	"encoding/json"
	"net/http"
	"waysbeans/dto"
	"waysbeans/models"
	"waysbeans/repositories"

	"github.com/golang-jwt/jwt/v4"
)

type handlerUser struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(userRepository repositories.UserRepository) *handlerUser {
	return &handlerUser{UserRepository: userRepository}
}

// mengambil data semua user
func (h *handlerUser) FindUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	users, err := h.UserRepository.FindUsers()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := dto.ErrorResult{
			Status:  http.StatusNotFound,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: http.StatusOK,
		Data:   convertMultipleUserResponse(users),
	}
	json.NewEncoder(w).Encode(response)
}

// mengambil data 1 user
func (h *handlerUser) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	idUser := int(userInfo["id"].(float64))

	user, err := h.UserRepository.GetUser(idUser)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := dto.ErrorResult{
			Status:  http.StatusNotFound,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: http.StatusOK,
		Data:   convertUserResponse(user),
	}
	json.NewEncoder(w).Encode(response)
}

// update data user
func (h *handlerUser) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	err := r.ParseMultipartForm(1024)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status:  http.StatusBadRequest,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	var updateUser = dto.UpdateUserRequest{
		Name:     r.FormValue("name"),
		Phone:    r.FormValue("phone"),
		Address:  r.FormValue("address"),
		Image:    r.Context().Value("image").(string),
		PostCode: r.FormValue("post_code"),
	}

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	idUser := int(userInfo["id"].(float64))

	user, err := h.UserRepository.GetUser(idUser)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		response := dto.ErrorResult{
			Status:  http.StatusNotFound,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	if updateUser.Name != "" {
		user.Name = updateUser.Name
	}
	if updateUser.Address != "" {
		user.Address = updateUser.Address
	}
	if updateUser.Phone != "" {
		user.Phone = updateUser.Phone
	}
	if updateUser.PostCode != "" {
		user.PostCode = updateUser.PostCode
	}
	if updateUser.Image != "" {
		user.Image = updateUser.Image
	}

	updatedUser, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{
			Status:  http.StatusBadRequest,
			Message: err.Error(),
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{
		Status: http.StatusOK,
		Data:   convertUserResponse(updatedUser),
	}
	json.NewEncoder(w).Encode(response)
}

func convertMultipleUserResponse(users []models.User) []dto.UserResponse {
	var usersResponse []dto.UserResponse

	for _, user := range users {
		var userResponse = dto.UserResponse{
			ID:       user.ID,
			Name:     user.Name,
			Email:    user.Email,
			Role:     user.Role,
			Phone:    user.Phone,
			Image:    user.Image,
			Address:  user.Address,
			PostCode: user.PostCode,
		}

		usersResponse = append(usersResponse, userResponse)
	}

	return usersResponse
}

func convertUserResponse(user models.User) dto.UserResponse {
	var userResponse = dto.UserResponse{
		ID:       user.ID,
		Name:     user.Name,
		Email:    user.Email,
		Role:     user.Role,
		Phone:    user.Phone,
		Image:    user.Image,
		Address:  user.Address,
		PostCode: user.PostCode,
	}

	return userResponse
}

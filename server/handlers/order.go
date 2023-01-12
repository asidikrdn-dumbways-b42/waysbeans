package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"waysbeans/dto"
	"waysbeans/models"
	"waysbeans/repositories"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerOrder struct {
	OrderRepository repositories.OrderRepository
}

func HandlerOrder(orderRepository repositories.OrderRepository) *handlerOrder {
	return &handlerOrder{orderRepository}
}

func (h *handlerOrder) FindOrders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	idUser := int(userInfo["id"].(float64))

	order, err := h.OrderRepository.FindOrders(idUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status: "error", Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := dto.SuccessResult{
		Status: "success", Data: convertMultipleOrderResponse(order),
	}
	json.NewEncoder(w).Encode(res)
}

func (h *handlerOrder) GetOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	order, err := h.OrderRepository.GetOrder(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status: "error", Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := dto.SuccessResult{
		Status: "success", Data: convertOrderResponse(order),
	}
	json.NewEncoder(w).Encode(res)
}

func (h *handlerOrder) AddOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var request dto.AddOrderRequest
	json.NewDecoder(r.Body).Decode(&request)

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	idUser := int(userInfo["id"].(float64))

	// periksa order dengan product id yang sama
	order, err := h.OrderRepository.GetOrderByProduct(request.ProductID, idUser)
	if err != nil {
		// bila belum ada, maka buat baru
		newOrder := models.Order{
			UserID:    idUser,
			ProductID: request.ProductID,
			OrderQty:  1,
		}

		orderAdded, err := h.OrderRepository.CreateOrder(newOrder)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			res := dto.ErrorResult{
				Status: "error", Message: err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		order, err := h.OrderRepository.GetOrder(orderAdded.ID)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			res := dto.ErrorResult{
				Status: "error", Message: err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		w.WriteHeader(http.StatusOK)
		res := dto.SuccessResult{
			Status: "success",
			Data:   convertOrderResponse(order),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	// bila sudah ada, maka cukup tambahkan qty
	order.OrderQty = order.OrderQty + 1

	orderUpdated, err := h.OrderRepository.UpdateOrder(order)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status: "error", Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	order, err = h.OrderRepository.GetOrder(orderUpdated.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status: "error", Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := dto.SuccessResult{
		Status: "success",
		Data:   convertOrderResponse(order),
	}
	json.NewEncoder(w).Encode(res)
}

func (h *handlerOrder) UpdateOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// mengabil event dari request body
	var request dto.UpdateOrderRequest
	json.NewDecoder(r.Body).Decode(&request)

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	order, err := h.OrderRepository.GetOrder(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status: "error", Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	if request.Event == "add" {
		order.OrderQty = order.OrderQty + 1
	} else if request.Event == "less" {
		order.OrderQty = order.OrderQty - 1
	}

	orderUpdated, err := h.OrderRepository.UpdateOrder(order)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status: "error", Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	order, err = h.OrderRepository.GetOrder(orderUpdated.ID)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status: "error", Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := dto.SuccessResult{
		Status: "success",
		Data:   convertOrderResponse(order),
	}
	json.NewEncoder(w).Encode(res)
}

func (h *handlerOrder) DeleteOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	order, err := h.OrderRepository.GetOrder(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status: "error", Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	orderDeleted, err := h.OrderRepository.DeleteOrder(order)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		res := dto.ErrorResult{
			Status: "error", Message: err.Error(),
		}
		json.NewEncoder(w).Encode(res)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := dto.SuccessResult{
		Status: "success",
		Data:   convertOrderResponse(orderDeleted),
	}
	json.NewEncoder(w).Encode(res)
}

func convertMultipleOrderResponse(orders []models.Order) []dto.OrderResponse {
	var OrderResponse []dto.OrderResponse

	for _, order := range orders {
		OrderResponse = append(OrderResponse, dto.OrderResponse{
			ID:       order.ID,
			OrderQty: order.OrderQty,
			Product:  order.Product,
		})
	}

	return OrderResponse
}

func convertOrderResponse(order models.Order) dto.OrderResponse {
	return dto.OrderResponse{
		ID:       order.ID,
		OrderQty: order.OrderQty,
		Product:  order.Product,
	}
}

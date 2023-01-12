package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"waysbeans/dto"
	jwtToken "waysbeans/pkg/jwt"
)

func UserAuth(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		// mengambil token
		token := r.Header.Get("Authorization")
		if token == "" {
			w.WriteHeader(http.StatusUnauthorized)
			response := dto.ErrorResult{
				Status:  "error",
				Message: "Unauthorized",
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		// validasi token dan mengambil claims
		claims, err := jwtToken.DecodeToken(token)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			response := dto.ErrorResult{
				Status:  "error",
				Message: "Unauthorized",
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		// mengirim claims melalui context
		ctx := context.WithValue(r.Context(), "userInfo", claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func AdminAuth(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		// mengambil token
		token := r.Header.Get("Authorization")
		if token == "" {
			w.WriteHeader(http.StatusUnauthorized)
			response := dto.ErrorResult{
				Status:  "error",
				Message: "Unauthorized",
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		// validasi token dan mengambil claims
		claims, err := jwtToken.DecodeToken(token)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			response := dto.ErrorResult{
				Status:  "error",
				Message: "Unauthorized",
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		if userRole := claims["role"].(string); userRole != "admin" {
			w.WriteHeader(http.StatusUnauthorized)
			response := dto.ErrorResult{
				Status:  "error",
				Message: "Unauthorized, You're not administrator",
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		// mengirim claims melalui context
		ctx := context.WithValue(r.Context(), "userInfo", claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

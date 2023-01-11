package dto

type UpdateUserRequest struct {
	FullName string `form:"full_name"`
	Phone    int    `form:"phone"`
	Alamat   string `form:"alamat"`
	PostCode int    `form:"post_code"`
	Image    string `form:"image"`
}

type UserResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Alamat   string `json:"alamat"`
	PostCode int    `json:"post_code"`
	Image    int    `json:"image"`
	Role     string `json:"role"`
}

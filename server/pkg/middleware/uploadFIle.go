package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"waysbeans/dto"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
)

func UploadFile(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Handling dan parsing data dari form data yang ada data file nya. Argumen 1024 pada method tersebut adalah maxMemory
		if err := r.ParseMultipartForm(1024); err != nil {
			panic(err.Error())
		}

		// mengambil file dari form
		uploadedFile, handler, err := r.FormFile("image")
		// jika tidak ada file, kirim string kosong pada context
		if err != nil {
			imageCtx := context.WithValue(r.Context(), "image", "")
			next.ServeHTTP(w, r.WithContext(imageCtx))
			return
		}
		defer uploadedFile.Close()

		// Apabila format file bukan .jpg, .jpeg atau .png, maka tampilkan error
		if filepath.Ext(handler.Filename) != ".jpg" && filepath.Ext(handler.Filename) != ".jpeg" && filepath.Ext(handler.Filename) != ".png" {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{
				Status:  "error",
				Message: "The provided file format is not allowed. Please upload a JPG, JPEG or PNG image",
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		// create empty context
		var ctx = context.Background()

		// setup cloudinary credentials
		var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		var API_KEY = os.Getenv("API_KEY")
		var API_SECRET = os.Getenv("API_SECRET")

		// create new instance of cloudinary object using cloudinary credentials
		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

		// Upload file to Cloudinary
		resp, err := cld.Upload.Upload(ctx, uploadedFile, uploader.UploadParams{Folder: "WaysBeans"})
		if err != nil {
			fmt.Println(err.Error())
		}
		// cek respon dari cloudinary
		// fmt.Println("respon from cloudinary", resp)

		// membuat sebuah context baru dengan menyisipkan value di dalamnya, valuenya adalah filepath (loaksi file) dari file yang diupload
		imageCtx := context.WithValue(r.Context(), "image", resp.SecureURL)

		// mengirim nilai context ke object http.HandlerFunc yang menjadi parameter saat fungsi middleware ini dipanggil
		next.ServeHTTP(w, r.WithContext(imageCtx))
	})
}

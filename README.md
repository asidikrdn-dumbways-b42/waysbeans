# WaysBeans

WaysBeans merupakan aplikasi penjualan biji kopi online. Aplikasi ini dapat digunakan oleh sebuah toko kopi untuk memudahkan pelanggannya dalam membeli biji kopi secara online dengan informasi terkini.

## Instalasi

Terdapat dua metode untuk dapat menjalankan aplikasi ini pada server lokal :

### Menggunakan Docker

Berikut syarat dan cara menjalankan aplikasi WaysBeans menggunakan docker compose (dalam contoh ini menggunakan sistem operasi linux)

Requirement :

- Docker + Docker Compose
- Git
- MySQL Server

Untuk menjalankan aplikasi WaysBeans menggunakan docker, silahkan ikuti langkah-langkah berikut :

- Buatlah sebuah database mysql dengan nama db_waysbeans
- Clone aplikasi WaysBeans dari github repository
- Masuk ke folder `waysbeans`
- Masuk ke folder `server` lalu jalankan perintah berikut untuk mem-build BackEnd service dari aplikasi WaysBeans :
  `sudo docker build -t be-waysbeans .`
- Keluar dari folder `server` lalu masuk ke folder `client`, kemudian jalankan perintah berikut untuk mem-build FrontEnd service dari aplikasi WaysBeans :
  `sudo docker build -t fe-waysbeans .`
- Keluar dari folder `client`, kemudian buatlah sebuah file `waysbeans.yml`, isi file tersebut dengan kode berikut :

  ```yml
  version: "2.15.1" # sesuaikan dengan versi docker compose yang terinstall

  services:
    waysbeans-client:
    image: fe-waysbeans # sesuaikan dengan nama docker image yang sudah dibuat
    container_name: waysbeans-client
    restart: unless-stopped # environtment var for react, use .env file, and dont include it on .dockerignore on build process
    ports:
      - 3001:3001
    networks:
      - internal-networks

    waysbeans-api:
    image: be-waysbeans # sesuaikan dengan nama docker image yang sudah dibuat
    container_name: waysbeans-api
    restart: unless-stopped
    environment:
      DB_HOST: <ip host database> # apabila menggunakan databse dijalankan menggunakan docker, cukup masukkan container name
      DB_PORT: <port database>
      DB_USER: <databse user>
      DB_PASSWORD: <databse password>
      DB_NAME: <nama_database>
      PORT: 5001 # port yang diinginkan untuk menjalankan server
      SECRET_KEY: <secret key untuk jwt>
      CONFIG_SMTP_HOST: mtp.gmail.com #mail server untuk mengirim email verifikasi, contoh disamping jika menggunakan gmail
      CONFIG_SMTP_PORT: 587 # port dari mail server, contoh disamping jika menggunakan gmail
      CONFIG_SENDER_NAME: "WaysBeans <waysbeans@gmail.com>" # nama pengirim
      CONFIG_AUTH_EMAIL: xxx@gmail.com # email yang akan digunakan untuk mengirim email
      CONFIG_AUTH_PASSWORD: xxxx # password dari email yang digunakan (jika menggunakan gmail, sebaiknya buat password khusus untuk aplikasi)
      REDIRECT_URL_ON_VERIFICATION: http://localhost:3001 # silahkan masukkan url frontend untuk redirect aplikasi
      ORIGIN_ALLOWED: "*" # untuk mengizinkan semua resource
      CLOUD_NAME: xxx # masukkan cloudname dari cloudinary
      API_KEY: 123xxxxx # masukkan API key dari cloudinary
      API_SECRET: xxx # masukkan API secret dari cloudinary
      SERVER_KEY: SB-xxx # masukkan server key dari midtrans
      ADMIN_EMAIL: admin@xxx.com # masukkan email yang akan digunakan sebagai akun admin
      ADMIN_PASSWORD: xxx # masukkan password yang akan digunakan sebagai akun admin

    volumes:
      - /home/<username sistem operasi>/Documents/docker-volume/waysbeans/uploads:/uploads
    ports:
      - 5001:5001
    networks:
      - internal-networks

  networks:
  internal-networks:
  driver: bridge
  ```

  - Pastikan sudah membuat database di MySQL Server
  - Jalankan aplikasi dengan perintah berikut :
    `sudo docker compose -f waysbeans.yml up -d`

### Tanpa Docker

Berikut syarat dan cara menjalankan aplikasi WaysBeans tanpa menggunakan docker compose (dapat dilakukan pada semua sistem operasi)

Requirement :

- Go
- Node
- NPM
- Git
- MySQL Server

Untuk menjalankan aplikasi WaysBeans, silahkan ikuti langkah-langkah berikut :

- Buatlah sebuah database mysql dengan nama db_waysbeans
- Clone aplikasi WaysBeans dari github repository
- Masuk ke folder `waysbeans`
- Masuk ke folder `server` lalu buat sebuah file dengan nama `.env` dan isikan kode berikut :

  ```env
  # database
  DB_HOST=<database host>
  DB_USER=<database user>
  DB_PASSWORD=<database password>
  DB_NAME=<database name>
  DB_PORT=<database port>

  # secret key for jwt
  SECRET_KEY=<your secret key>

  # origin set up
  ORIGIN_ALLOWED=<domain that allow to hit/use your endpoint>

  # port for run the service
  PORT=<port that you want to run your api server>

  # setup clodunary
  CLOUD_NAME=<cloudinary_name>
  API_KEY=<cloudinary_api_key>
  API_SECRET=<cloudinary_api_secret>

  # server key midtrans
  SERVER_KEY=<your midtrans server key>

  # setup email for gomail
  CONFIG_SMTP_HOST=<host of mail server, you can get it from email provider like gmail and another>
  CONFIG_SMTP_PORT=<port of mail server, you can get it from email provider like gmail and another>
  CONFIG_SENDER_NAME=<your name + your email>
  CONFIG_AUTH_EMAIL=<email that used to send mail>
  CONFIG_AUTH_PASSWORD=<email password>

  # redirect url on verification link
  REDIRECT_URL_ON_VERIFICATION=<your front-end/client url>

  # admin account
  ADMIN_EMAIL=<email for login as admin>
  ADMIN_PASSWORD=<password for login as admin>
  ```

- Install semua dependency yang dibutuhkan dengan perintah berikut :
  `go mod download`
- Jalankan service BackEnd dengan perintah berikut :
  `go run main.go`
- Keluar dari folder `server` lalu masuk ke folder `client`, buat sebuah file dengan nama `.env` dan isikan kode berikut :
  ```env
  REACT_APP_API_BASE_URL=<your backend url>
  REACT_APP_MIDTRANS_CLIENT_KEY=<your midtrans client key>
  ```
- Install semua dependency yang dibutuhkan dengan perintah berikut :
  `npm install`
- Jalankan service FrontEnd dengan perintah berikut :
  `npm start`

<!--
## Panduan Pengguna

Panduan tentang cara menggunakan aplikasi, termasuk fitur utama dan alur kerja.

## Kontribusi

Cara kontributor dapat berpartisipasi dalam pengembangan aplikasi, termasuk laporan bug, permintaan fitur, atau kode kontribusi.

## Struktur Proyek

Penjelasan tentang struktur direktori dan komponen utama dalam proyek.

## Lisensi

Informasi tentang jenis lisensi yang digunakan dalam proyek.

## Status Build

[![Build Status](https://example.com/build/status)](https://example.com/build/status)

## Kontributor

- Nama Kontributor 1
- Nama Kontributor 2
-->

## Daftar Pembaruan (Changelog)

### Versi 1.1 (16 Mei 2023)

- Dokumentasi: Memperbaiki dokumentasi terkait petunjuk instalasi dan detail dari project WaysBeans.

### Versi 1.0 (16 januari 2023)

- Rilis Awal: Aplikasi ini dibuat sebagai tugas akhir syarat kelulusan dari Bootcamp Dumbways Indonesia.

<!--
## FAQ (Frequently Asked Questions)

Pertanyaan yang sering diajukan dan jawaban singkat untuk membantu pengguna.

## Kontak

Informasi kontak untuk mendapatkan dukungan atau memberikan umpan balik.


-->

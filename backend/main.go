package main

import (
	"fmt"
	"log"
	"my-go-server/api/db"
	"my-go-server/api/handlers"
	"net/http"
	"os"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {

	// only for local development
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI environment variable is not set")
	}

	db.Connect(mongoURI)

	http.Handle("/health", corsMiddleware(http.HandlerFunc(handlers.HealthCheckHandler)))
	http.Handle("/users", corsMiddleware(http.HandlerFunc(handlers.GetUsersHandler)))
	http.Handle("/delete-user", corsMiddleware(http.HandlerFunc(handlers.DeleteUserHandler)))

	fmt.Println("Server starting on http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

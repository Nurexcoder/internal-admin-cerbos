package main

import (
	"fmt"
	"log"
	"my-go-server/api/db"
	"my-go-server/api/handlers"
	"net/http"
)

func main() {
	db.Connect("mongodb://localhost:27017")

	http.HandleFunc("/users", handlers.GetUsersHandler)

	fmt.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

package handlers

import (
	"fmt"
	"my-go-server/api/db"
	"net/http"
)

func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	users, err := db.GetUsers()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, "Users: %+v\n", users)
}

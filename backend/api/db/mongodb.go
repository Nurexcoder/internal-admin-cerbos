package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"my-go-server/api/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Client holds the MongoDB client used to interact with the database.
var Client *mongo.Client

// Connect establishes a connection to the MongoDB database specified by the uri.
func Connect(uri string) {
	clientOptions := options.Client().ApplyURI(uri)
	var err error
	Client, err = mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = Client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")
}

// GetUsers retrieves all users from the MongoDB database.
func GetUsers() ([]models.User, error) {
	var users []models.User
	collection := Client.Database("testdb").Collection("users")
	cursor, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		return nil, err
	}

	for cursor.Next(context.TODO()) {
		var user models.User
		err := cursor.Decode(&user)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

// DeleteUser removes a user with the specified username from the database.
func DeleteUser(username string) error {
	collection := Client.Database("testdb").Collection("users")
	filter := bson.M{"username": username}

	_, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
		return err
	}

	fmt.Printf("User with username %s deleted successfully\n", username)
	return nil
}

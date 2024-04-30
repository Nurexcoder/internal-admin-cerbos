package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	"my-go-server/api/models"
)

func main() {

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI environment variable is not set")
	}

	clientOptions := options.Client().ApplyURI(mongoURI)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection := client.Database("testdb").Collection("users")

	count, err := collection.CountDocuments(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	if count > 0 {
		fmt.Println("Users collection already has data. Exiting...")
		return
	}

	users := []interface{}{
		models.User{Name: "John Doe", Email: "johndoe@example.com", Username: "johndoe"},
		models.User{Name: "Jane Smith", Email: "janesmith@example.com", Username: "janesmith"},
		models.User{Name: "Alice Johnson", Email: "alicej@example.com", Username: "alicej"},
		models.User{Name: "Bob Brown", Email: "bobb@example.com", Username: "bobb"},
		models.User{Name: "Carol Davis", Email: "carold@example.com", Username: "carold"},
		models.User{Name: "David Evans", Email: "davide@example.com", Username: "davide"},
		models.User{Name: "Ella Fitzgerald", Email: "ellaf@example.com", Username: "ellaf"},
		models.User{Name: "Frank Green", Email: "frankg@example.com", Username: "frankg"},
		models.User{Name: "Grace Hall", Email: "graceh@example.com", Username: "graceh"},
		models.User{Name: "Henry Irving", Email: "henryi@example.com", Username: "henryi"},
		models.User{Name: "Isabel Johnson", Email: "isabelj@example.com", Username: "isabelj"},
		models.User{Name: "Jack King", Email: "jackk@example.com", Username: "jackk"},
		models.User{Name: "Laura Lee", Email: "laural@example.com", Username: "laural"},
		models.User{Name: "Michael Newman", Email: "michaeln@example.com", Username: "michaeln"},
		models.User{Name: "Nancy Olson", Email: "nancyo@example.com", Username: "nancyo"},
		models.User{Name: "Oliver Perez", Email: "oliverp@example.com", Username: "oliverp"},
		models.User{Name: "Pamela Quinn", Email: "pamelq@example.com", Username: "pamelq"},
		models.User{Name: "Quentin Ramsey", Email: "quentinr@example.com", Username: "quentinr"},
		models.User{Name: "Rachel Stone", Email: "rachels@example.com", Username: "rachels"},
		models.User{Name: "Steven Thomas", Email: "stevent@example.com", Username: "stevent"},
		models.User{Name: "Tina Upton", Email: "tinan@example.com", Username: "tinan"},
		models.User{Name: "Ursula Vaughn", Email: "ursulav@example.com", Username: "ursulav"},
		models.User{Name: "Victor Wells", Email: "victorw@example.com", Username: "victorw"},
		models.User{Name: "Wendy Xiu", Email: "wendyx@example.com", Username: "wendyx"},
		models.User{Name: "Xavier Young", Email: "xaviery@example.com", Username: "xaviery"},
		models.User{Name: "Yvonne Zane", Email: "yvonnez@example.com", Username: "yvonnez"},
		models.User{Name: "Zachary Adams", Email: "zacharya@example.com", Username: "zacharya"},
	}

	insertResult, err := collection.InsertMany(context.TODO(), users)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted users:", insertResult.InsertedIDs)

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()
}

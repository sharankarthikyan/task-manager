// CRUD  Create Read Update Delete

// This is regular procedure.
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

// This is short form for above three lines.
const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect...");
    }
    // console.log("Connected successfully...");

    const db = client.db(databaseName);

    // For insert one collection
    db.collection("users").insertOne(
      {
        name: "Rock",
        age: 40,
      },
      (error, result) => {
        if (error) {
          return console.log("Unable to insert user...");
        }
        console.log(result.ops);
      }
    );

    // For insert Many collection
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Sharan",
    //       age: 20,
    //     },
    //     {
    //       name: "Roshini",
    //       age: 21,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert...");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // Task
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Clean the house",
    //       completed: false,
    //     },
    //     {
    //       description: "Watch TV",
    //       completed: false,
    //     },
    //     {
    //       description: "Learn Something",
    //       completed: true,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert...");
    //     }
    //     console.log(result.ops);
    //   }
    // );
  }
);

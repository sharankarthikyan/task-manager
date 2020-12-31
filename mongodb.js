// This file is not part of the Tast-manager project. But, it is used for learning.

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

    // Find one particular user
    // This is the way to find values by ObjectID
    // db.collection("users").findOne(
    //   { _id: new ObjectID("5fd44edd56ef75267090e108") }, // Be carefull in this line
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to find...");
    //     }
    //     console.log(user);
    //   }
    // );

    // This is one way using table attributes.
    // db.collection("users").findOne({ name: "Sharan" }, (error, user) => {
    //   if (error) {
    //     return console.log("Unable to find...");
    //   }
    //   console.log(user);
    // });

    // Using Find method.
    // db.collection("users")
    //   .find({ age: 20 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // This is count method.
    // db.collection("users")
    //   .find({ age: 20 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    // Update
    // Update one
    // const updatePromise = db.collection("users").updateOne(
    //   {
    //     _id: new ObjectID("5fd44d2592910526b0d3b06e"),
    //   },
    //   {
    //     // Refer Doc, we have lot of operation to perform like Incrementation. $inc.
    //     $set: {
    //       name: "Sne",
    //     },
    //   }
    // );

    // updatePromise
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Update Many
    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Delete
    // Delete One
    // db.collection("users")
    //   .deleteOne({
    //     name: "Roshini",
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Delete Many
    // db.collection("users")
    //   .deleteMany({
    //     age: 20,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
);

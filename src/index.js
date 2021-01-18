const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // This line is used to get Json data from user request.

// Initially we make our router here and then we transfered to routers folder.
// const router = new express.Router();
// router.get("/test", (req, res) => {
//   res.send("This is from my other router");
// });
// app.use(router);

// Now we using router from router folder
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log("Server is up on port http://localhost:" + PORT);
});

const jwt = require("jsonwebtoken");

const myFunction = async (req, res) => {
  const token = jwt.sign({ _id: "abc123" }, "secret_key", {
    expiresIn: "5 seconds", // expiresIn is optional
  });
  // First parameter is data. Second parameter is Secret Key.
  console.log(token);

  const data = jwt.verify(token, "secret_key");
  console.log(data);
};

myFunction();

// Small checking on bcrypt password hashing.
// const bcrypt = require("bcryptjs");

// const myFunction = async () => {
//   const password = "Red12345!";
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(password);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   console.log(isMatch);
// };

// myFunction();

// *********************************************
// Initial we created our req and res here. But after we moved to Routers folder.
// *********************************************

// POST is used to create or send data to DB or Server
// GET is used to read data from DB or Server
// PATCH is used to update the data from the DB or Server
// DELETE is used to delete the data from DB or Server
// .
// .
// .

// This is normal procedure
// app.post("/users", (req, res) => {
//   const user = new User(req.body);

//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//       //   res.send(err);
//     });
// });

// This is Async Await Procedure

// app.post("/users", async (req, res) => {
//   const user = new User(req.body);
//   try {
//     await user.save();
//     // console.log(user);
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// We commented normal procedure and make it as Async Await procedure.

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (e) {
//     res.status(500).send(e);
//   }
//   // User.find({})
//   //   .then((users) => {
//   //     res.send(users);
//   //   })
//   //   .catch((err) => {
//   //     res.status(500).send();
//   //   });
// });

// We commented normal procedure and make it as Async Await procedure.

// app.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   // Two ways to find a single user in mongoose 1. findById(), 2. findOne()
//   // These things are seen by postman

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }

//   // User.findById(_id)
//   //   .then((user) => {
//   //     if (!user) {
//   //       return res.status(404).send();
//   //     }
//   //     res.status(200).send(user);
//   //   })
//   //   .catch((err) => {
//   //     res.status(500).send(err);
//   //   });
// });

// Patch is used to update the existing resource.

// app.patch("/users/:id", async (req, res) => {
//   // The below lines checking for if there is new object element is created or not. EX: other than name, email, password, age. If new object element is created like height: 72 and try to update it will show error.

//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password", "age"];
//   const isValidOperation = updates.every((update) => {
//     return allowedUpdates.includes(update);
//   });

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }

//   // This below line is normal updation
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, // If this is true we can able to change the data
//       runValidators: true,
//     });
//     if (!user) {
//       res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// Delete a user

// app.delete("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findByIdAndDelete(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// Task Section begins
// .
// .
// .
// Create

// app.post("/tasks", async (req, res) => {
//   const task = Task(req.body);

//   try {
//     await task.save();
//     res.status(200).send(task);
//   } catch (e) {
//     res.status(400).send(e);
//   }
//   // task
//   //   .save()
//   //   .then(() => {
//   //     res.status(201).send(task);
//   //   })
//   //   .catch((err) => {
//   //     res.status(400).send(err);
//   //   });
// });

// Find all tasks

// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.send(tasks);
//   } catch (e) {
//     res.status(500).send(e);
//   }
//   // Task.find({})
//   //   .then((tasks) => {
//   //     res.status(200).send(tasks);
//   //   })
//   //   .catch((err) => {
//   //     res.status(500).send(err);
//   //   });
// });

// Find single task by ID

// app.get("/tasks/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const task = await Task.findById(_id);
//     if (!task) {
//       return res.status(404).send();
//     }
//     res.status(200).send(task);
//   } catch (e) {
//     res.status(500).send(e);
//   }

//   // Task.findById(_id)
//   //   .then((task) => {
//   //     if (!task) {
//   //       return res.status(404).send();
//   //     }
//   //     res.status(200).send(task);
//   //   })
//   //   .catch((err) => {
//   //     res.status(500).send(err);
//   //   });
// });

// Patch to Update

// app.patch("/tasks/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["description", "completed"];
//   const isValidOperation = updates.every((update) => {
//     return allowedUpdates.includes(update);
//   });

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }

//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, // If this is true we can able to change the data
//       isValidOperation: true,
//     });
//     if (!task) {
//       return res.status(404).send();
//     }
//     res.send(task);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// app.delete("/tasks/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const task = await Task.findByIdAndDelete(_id);
//     if (!task) {
//       return res.status(404).send();
//     }
//     res.send(task);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

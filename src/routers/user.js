const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = User(req.body);
  try {
    // console.log(user);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// We commented normal procedure and make it as Async Await procedure.
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((err) => {
  //     res.status(500).send();
  //   });
});

// We commented normal procedure and make it as Async Await procedure.
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  // Two ways to find a single user in mongoose 1. findById(), 2. findOne()
  // These things are seen by postman

  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }

  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.status(200).send(user);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
});

// Patch is used to update the existing resource.
router.patch("/users/:id", async (req, res) => {
  // The below lines checking for if there is new object element is created or not. EX: other than name, email, password, age. If new object element is created like height: 72 and try to update it will show error.
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  // This below line is normal updation
  try {
    // This is normal mongoose update
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true, // If this is true we can able to change the data
    //   runValidators: true,
    // });

    // This is some changes for mongoose middleware. That's the reason i commented above lines and created new line below
    const user = await User.findById(req.params.id);

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;

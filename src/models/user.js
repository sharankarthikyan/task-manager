const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Here the below we created mongoose middleware
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // For more like required and additional checking and setting go to mongoose.js Docs page.
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid...");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password'");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive...");
      }
    },
  },
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("Unable to login...");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login...");
  }
};

// This is Mongoose Middleware. This is called before going to save any user data in MongoDB.
// We can use middleware anytime like before calling POST, GET, etc.,
// Here, we used middleware before going to save.
userSchema.pre("save", async function (next) {
  const user = this;

  // Here, we change the normal password to hashed password before going to save in DB.
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

// this below code is normal model creating procedure.
// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true, // For more like required and additional checking and setting go to mongoose.js Docs page.
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is Invalid...");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minLength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Password cannot contain 'password'");
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be positive...");
//       }
//     },
//   },
// });

// const me = new User({
//   name: "SK",
//   age: 20,
// });

// me.save()
//   .then((me) => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = User;

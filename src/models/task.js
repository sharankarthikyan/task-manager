const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

// const one = new task({
//   description: "Home work",
//   complete: false,
// });

// one
//   .save()
//   .then((one) => {
//     console.log(one);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = Task;

// This file is for Task.

require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task Id = 5fd4cc0a1f47024554b2e0d5

// Task.findByIdAndDelete("5fed6c837fe6f62480bae545")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5fed6d937fe6f62480bae546")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

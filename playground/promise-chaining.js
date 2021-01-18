// This file is for User.

require("../src/db/mongoose");
const User = require("../src/models/user");

// User Id = 5fed3f1285681d1d08eeda86
// Before see this below code, understand playground folder in NodeJs Udemy and learn promise.js

// User.findByIdAndUpdate("5fed3f1285681d1d08eeda86", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// The below one is Async Await

// Before this pls refer the playground folder in NodeJS Udemy folder and in that playground folder we have a async-await.js; In this file we have a clear understanding.
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age }); // we can also use shortcut of second parameter { age } itself. // Ex: const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age: age });
  return count;
};

updateAgeAndCount("5fed3f1285681d1d08eeda86", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });

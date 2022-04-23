const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://shani:cb63yoLc20nJ7jwC@fms1.md1eq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Mongodb......");
  })
  .catch((e) => {
    console.log("failed connected", e);
  });

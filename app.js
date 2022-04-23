// module import
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

// APP define
const app = express();

// port
const port = 80 || process.env.PORT;

// routes
const ngoRoutes = require("./router/ngo");
const restRoutes = require("./router/restauant");
const loginRoutes = require("./router/login");
const FoodRoutes = require("./router/foodrequiest");

// DB Conn
require("./db");

// Many used
app.use(fileUpload());
app.use(express.json());
app.use(cors());

// dynamic routes using
app.use("/ngo", ngoRoutes);
app.use("/restaurant", restRoutes);
app.use("/ngo/employee", restRoutes);
app.use("/food/request", FoodRoutes);
app.use("/login", loginRoutes);

// static routes
app.use("/images", express.static(path.join(__dirname, "./images")));

// express app is running
app.listen(port, () => {
  console.log(`your app is ranning in ${port} port`);
});

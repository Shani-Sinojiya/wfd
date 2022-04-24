// module import
const cors = require("cors");
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");

// APP define
const app = express();

// port
const port = process.env.PORT || 80;

// routes
const ngoRoutes = require("./router/ngo");
const restRoutes = require("./router/restauant");
const loginRoutes = require("./router/login");
const FoodRoutes = require("./router/foodrequiest");
const adminRoutes = require("./router/admin");

// DB Conn
require("./db");

// Many used
app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// dynamic routes using
app.use("/ngo", ngoRoutes);
app.use("/restaurant", restRoutes);
app.use("/ngo/employee", restRoutes);
app.use("/food/request", FoodRoutes);
app.use("/login", loginRoutes);
app.use("/admin/login", adminRoutes);

// static routes
app.use("/images", express.static(path.join(__dirname, "./images")));

// express app is running
app.listen(port, () => {
  console.log(`your app is ranning in ${port} port`);
});

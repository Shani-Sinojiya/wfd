const mongoose = require("mongoose");
const validator = require("validator");
const passwordHasherMiddleware = require("../middlewares/passwordHasherMiddleware");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "email already present"],
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
});

RestaurantSchema.pre("save", passwordHasherMiddleware);

const Restaurant = new mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;

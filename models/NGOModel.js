const mongoose = require("mongoose");
const validator = require("validator");
const passwordHasherMiddleware = require("../middlewares/passwordHasherMiddleware");

const NGOSchema = new mongoose.Schema({
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

NGOSchema.pre("save", passwordHasherMiddleware);

const NGO = new mongoose.model("NGO", NGOSchema);

module.exports = NGO;

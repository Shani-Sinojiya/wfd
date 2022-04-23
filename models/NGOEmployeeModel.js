const mongoose = require("mongoose");
const validator = require("validator");
const passwordHasherMiddleware = require("../middlewares/passwordHasherMiddleware");

const NGOEmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
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
  NGO_ID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "ngos",
  },
});

NGOEmployeeSchema.pre("save", passwordHasherMiddleware);

const NGOEmployee = new mongoose.model("NGO-Employee", NGOEmployeeSchema);

module.exports = NGOEmployee;

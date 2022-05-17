const mongoose = require("mongoose");
const validator = require("validator");
const passwordHasherMiddleware = require("../middlewares/passwordHasherMiddleware");

const adminSchema = new mongoose.Schema({
  name: {
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
});

adminSchema.pre("save", passwordHasherMiddleware);

const admin = new mongoose.model("admin", adminSchema);

module.exports = admin;

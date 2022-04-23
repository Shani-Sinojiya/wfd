const mongoose = require("mongoose");

const FoodRequestSchema = new mongoose.Schema(
  {
    NGO_ID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "NGO",
    },
    REST_ID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    EMPLOYEE_ID: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: "NGO-Employee",
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NGO = new mongoose.model("Food-Request", FoodRequestSchema);

module.exports = NGO;

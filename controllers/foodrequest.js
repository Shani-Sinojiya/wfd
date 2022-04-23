const FoodRequest = require("../models/FoodRequestModel");

async function restFood_get(req, res) {
  try {
    const data = await FoodRequest.aggregate([
      {
        $lookup: {
          from: "ngos",
          localField: "NGO_ID",
          foreignField: "_id",
          as: "NGO",
        },
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "REST_ID",
          foreignField: "_id",
          as: "restaurant",
        },
      },
    ]).sort({ status: 0, createdAt: -1 });
    res.status(200).json({
      status: 1,
      msg: "succsesfull",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}

async function restFood_post(req, res) {
  const { NGO_ID, REST_ID, name, quantity, status } = req.body;
  try {
    const newFoodRequest = new FoodRequest({
      NGO_ID,
      REST_ID,
      name,
      quantity,
      status,
    });
    await newFoodRequest.save();
    res.status(200).json({
      status: 1,
      msg: "new Food request",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}

async function restFood_patch(req, res) {
  const { EMPLOYEE_ID, FOOD_ID } = req.body;
  try {
    await FoodRequest.findByIdAndUpdate(FOOD_ID, EMPLOYEE_ID, { new: true });
    res.status(200).json({
      status: 1,
      msg: "Employee task added successfull",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}
module.exports = {
  restFood_get,
  restFood_post,
  restFood_patch,
};

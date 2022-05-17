const path = require("path");
const Restaurant = require("../models/RestaurantModel");

async function rest_get(req, res) {
  try {
    const data = await Restaurant.find();
    res.status(200).json({
      status: 1,
      msg: "finded the Restaurant",
      restaurant: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}

async function rest_post(req, res) {
  const { image } = req.files;
  const {
    name,
    email,
    phone_number,
    address,
    pincode,
    latitude,
    longitude,
    password,
  } = req.body;
  try {
    if (
      name &&
      email &&
      phone_number &&
      address &&
      pincode &&
      latitude &&
      longitude &&
      password &&
      image
    ) {
      const PathUrl = path.join(__dirname, "../images/") + image.name;
      const saveUrl = image.name;
      await image.mv(PathUrl, (error) => {
        if (error) {
          throw Error;
        }
      });
      const newF = new Restaurant({
        name,
        email,
        phone_number,
        address,
        pincode,
        latitude,
        longitude,
        password,
        image: saveUrl,
      });
      await newF.save();
      res.status(201).json({
        status: 1,
        msg: "Restaurant add successfully",
      });
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "Restaurant can't added",
    });
  }
}

async function rest_patch(req, res) {
  try {
    await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      status: 1,
      msg: "Restaurant update successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}

async function rest_delete(req, res) {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: 1,
      msg: "ngo update successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}

async function rest_put(req, res) {
  try {
    const data = await Restaurant.findById(req.params.id);
    const password = await bcrypt.hash(req.body.newPassword, 10);
    const isMatch = await passwordHashMatching(
      req.body.oldPassword,
      data.password
    );
    if (isMatch) {
      await Restaurant.findByIdAndUpdate(req.params.id, { password });
      res.status(201).json({
        status: 1,
        msg: "Restaurant password updated successfully",
      });
    } else {
      res.status(200).json({
        status: 1,
        msg: "invalid old password",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "Restaurant password updated unsuccessfully",
    });
  }
}

module.exports = {
  rest_get,
  rest_post,
  rest_patch,
  rest_put,
  rest_delete,
};

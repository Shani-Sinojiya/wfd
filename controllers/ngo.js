const path = require("path");
const NGO = require("../models/NGOModel");

async function ngo_get(req, res) {
  try {
    const data = await NGO.find();
    res.status(200).json({
      status: 1,
      msg: "finded the NGO",
      NGO: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}

async function ngo_post(req, res) {
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
      const newNGO = new NGO({
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
      await newNGO.save();
      res.status(201).json({
        status: 1,
        msg: "ngo add successfully",
      });
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "ngo can't added",
    });
  }
}

async function ngo_patch(req, res) {
  try {
    await NGO.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

async function ngo_delete(req, res) {
  try {
    await NGO.findByIdAndDelete(req.params.id, req.body, { new: true });
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

module.exports = {
  ngo_get,
  ngo_post,
  ngo_patch,
  ngo_delete
};

const NGO = require("../models/NGOModel");
const Restaurant = require("../models/RestaurantModel");
const NGOEmployee = require("../models/NGOEmployeeModel");
const passwordHashMatching = require("../helpers/passwordHashMaching-helper");

async function login_post(req, res) {
  switch (req.params.code) {
    case 1:
      await NGOlogin(req, res);
      break;
    case 2:
      await Restlogin(req, res);
      break;
    case 3:
      await emplogin(req, res);
      break;
    default:
      res.status(400).json({
        status: 0,
        msg: "invalid code",
      });
      break;
  }
}

const NGOlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const NGOEmail = await NGO.findOne({ email: email });
    if (NGOEmail) {
      const isMatch = await passwordHashMatching(password, NGOEmail.password);
      if (isMatch) {
        res.status(200).json({
          status: 1,
          msg: "Login successfully",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "invalid Crediantional",
    });
  }
};

const Restlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const RESTEmail = await Restaurant.findOne({ email: email });
    if (RESTEmail) {
      const isMatch = await passwordHashMatching(password, RESTEmail.password);
      if (isMatch) {
        res.status(200).json({
          status: 1,
          msg: "Login successfully",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "invalid Crediantional",
    });
  }
};

const emplogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const EMPEmail = await NGOEmployee.findOne({ email: email });
    if (EMPEmail) {
      const isMatch = await passwordHashMatching(password, EMPEmail.password);
      if (isMatch) {
        res.status(200).json({
          status: 1,
          msg: "Login successfully",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "invalid Crediantional",
    });
  }
};

module.exports = login_post;

const path = require("path");
const NGOEmployee = require("../models/NGOEmployeeModel");

async function emp_get(req, res) {
  try {
    const data = await NGOEmployee.find();
    res.status(200).json({
      status: 1,
      msg: "finded the NGO's Employee",
      NGO: data,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}

async function emp_post(req, res) {
  const { image } = req.files;
  const { name, email, phone_number, password, NGO_ID } = req.body;
  try {
    if (name && email && phone_number && password && image && NGO_ID) {
      const PathUrl = path.join(__dirname, "../images/") + image.name;
      const saveUrl = image.name; 
      await image.mv(PathUrl, (error) => {
        if (error) {
          throw Error;
        }
      });
      const newNGOemp = new NGOEmployee({
        name,
        email,
        phone_number,
        password,
        NGO_ID,
        image: saveUrl,
      });
      await newNGOemp.save();
      res.status(201).json({
        status: 1,
        msg: "Employee add successfully",
      });
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(400).json({
      status: 0,
      msg: "all fields are required",
    });
  }
}

async function emp_patch(req, res) {
  try {
    await NGOEmployee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(201).json({
      status: 1,
      msg: "employee update successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}
async function emp_delete(req, res) {
  try {
    await NGOEmployee.findByIdAndDelete(req.params.id, req.body, { new: true });
    res.status(201).json({
      status: 1,
      msg: "employee update successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      msg: "internal server error",
    });
  }
}

module.exports = {
  emp_get,
  emp_post,
  emp_patch,
  emp_delete
};

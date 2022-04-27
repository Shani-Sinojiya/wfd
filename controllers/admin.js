const admin = require("../models/adminModel");
const passwordHashMatching = require("../helpers/passwordHashMaching-helper");

async function adminlogin_post(req, res) {
    const { email, password } = req.body;
    try {
        const adminEmail = await admin.findOne({ email: email });
        if (adminEmail) {
            const isMatch = await passwordHashMatching(password, adminEmail.password);
            if (isMatch) {
                res.status(200).json({
                    status: 1,
                    msg: "Login successfully",
                });
            }
        }
        throw Error;
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: "invalid Crediantional",
        });
    }
}

const adminlogin_post_create = async (req, res) => {
    const { email, password, name, phone_number } = req.body;
    try {
        const data = new admin({ email, password, name, phone_number })
        await data.save();
        res.status(200).json({
            status: 1,
            msg: "admin create successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: "invalid data input",
        });
    }
}

module.exports = { adminlogin_post, adminlogin_post_create };

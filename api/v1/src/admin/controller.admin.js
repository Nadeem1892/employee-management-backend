const adminService = require("./service.admin");
const adminController = {};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin login
adminController.login = async (req, res) => {
  const { email, password } = req?.body;
  try {
    const checkAdmin = await adminService.getUserByEmail(email);
    console.log(checkAdmin)
    if (checkAdmin?.email === email) {
      let { password: hash } = checkAdmin;
      let isMatch = bcrypt.compareSync(password, hash);
      if (isMatch) {
        let token = jwt.sign(
          { _id: checkAdmin?._id, name:checkAdmin?.name },
          process.env.TOKEN_SECRET
        );
        return res.send({
          status: true,
          message: "login successfully",
          name:checkAdmin?.name,
          token,
          code: "OK",
          issue: null,
          
        });
      } else {
        return res.send({
          status: false,
          message: "Invalid password",
          code: "ERROR",
          issue: "Login failed",
        });
      }
    } else {
      return res.send({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({ message: "Somthing want wrong", Error: error });
  }
};


module.exports = adminController;

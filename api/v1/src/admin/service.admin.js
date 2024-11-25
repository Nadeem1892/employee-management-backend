const Admin = require("./model.admin");
const serviceAdmin = {};

//get user by email
serviceAdmin.getUserByEmail = async (email) => {
  return await Admin.findOne({ email });
};

module.exports = serviceAdmin;

const router = require("express").Router();
const adminController = require("../admin/controller.admin");
const validate = require("../../middleware/validationMiddleware");
const { adminLoginSchema } = require("../admin/validation.admin");

//Admin Login Route
router.post("/login", validate(adminLoginSchema), adminController.login);

module.exports = router;

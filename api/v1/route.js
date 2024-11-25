const adminRouter = require("./src/admin/route.admin")
const employeeRouter = require("./src/employee/route.employee")

const router = require("express").Router()


router.use("/admin",adminRouter)
router.use("/employee",employeeRouter)

module.exports = router
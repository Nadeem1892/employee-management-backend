const employeeController = require("./controller.employee")
const router = require("express").Router()
const validate = require("../../middleware/validationMiddleware");
const {employeeValidationSchema} = require("../employee/validation.employee")
const upload = require('../../utils/multer');


router.post("/create-employee",validate(employeeValidationSchema), upload.single("image"), employeeController.create)
router.get("/employee-list", employeeController.getAll)
router.get("/get-employee/:id", employeeController.getEmployeeById)
router.patch('/update-employee/:id',validate(employeeValidationSchema), upload.single("image"), employeeController.update)
router.delete('/delete-employee/:id', employeeController.delete)
router.get('/search', employeeController.searchEmployee)


module.exports = router
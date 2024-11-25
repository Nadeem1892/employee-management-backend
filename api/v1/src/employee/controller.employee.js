const employeeService = require("./service.employee");
const employeeController = {};

//Create Employee
employeeController.create = async (req, res) => {
  console.log(req.file);
  try {
    const employeeData = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
      image: req.file ? req.file.path : "", // Save the image path if file is uploaded
    };

    // Check if user with the same email already exists

    const existingEmployee = await employeeService.getEmployeeByEmail(
      req.body.email
    );

    if (existingEmployee) {
      return res.status(400).send({
        status: false,
        message: "Email is already taken. Please choose a different one.",
      });
    }

    // Create new employee using the service
    const newEmployee = await employeeService.createEmployee(employeeData);

    // Send the successful response
    return res.status(201).send({
      status: true,
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: false,
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

//Get All Employee
employeeController.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const employee = await employeeService.get(skip, limit);
    const totalData = await employeeService.countAll();

    if (employee.length) {
      return res.send({
        status: true,
        message: "Employee retrieved successfully.",
        data: employee, // Movies with the updated structure
        totalData,
        totalPages: Math.ceil(totalData / limit),
        currentPage: page,
      });
    }else{
      return res.send({
        status: false,
        message: "Movies not found.",
        data: null,
      });

    }
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while fetching Employee. Please try again later.",
      error: error.message,
    });
  }
};


// //get Employee by id
employeeController.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const getEmployeeById = await employeeService.getEmployeeById(id);
    return res.send({
      status: true,
      message: "Employee retrieved successfully.",
      data: getEmployeeById,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while fetching the Employee. Please try again later.",
      error: error.message, // Optional, for debugging purposes
    });
  }
};

//Update Employee
employeeController.update = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeData = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
      image: req.file ? req.file.path : "", // Save the image path if file is uploaded
    };
// console.log(employeeData)
   
    const updateEmployee = await employeeService.update(id,  employeeData );
   

    if (!updateEmployee) {
      return res.send({
        status: false,
        message: "Employee not found. Check the ID or if it was deleted.",
      });
    }

    return res.send({
      status: true,
      message: "Employee updated successfully!",
      data: updateEmployee,
    });
  } catch (error) {
    console.log(error)
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while updating the Employee. Please try again.",
      data: null,
    });
  }
};


// Delete Employee by ID
employeeController.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the employee exists
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return res.send({
        status: false,
        message: "Employee not found. Please check the ID.",
      });
    }

    // Proceed to delete the employee
    await employeeService.delete(id);

    return res.send({
      status: true,
      message: "Employee deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: false,
      message: "Oops! Something went wrong while deleting the employee.",
      error: error.message,
    });
  }
};



//Search movie
employeeController.searchEmployee = async (req, res) => {
  try {
    const { searchQuery = '' } = req.query;

    // Build dynamic query based on fields that might match the search query
    const query = {};

    // Apply regex search on each of the relevant fields (name, email, etc.)
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },  // Case-insensitive search for name
        { email: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for email
        { mobile: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for mobile
        { designation: { $regex: searchQuery, $options: 'i' } },
        { gender: { $regex: searchQuery, $options: 'i' } },
        { course: { $regex: searchQuery, $options: 'i' } },
      ];
    }

   

    const employees = await employeeService.search(query, { name: 1 });

    res.json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};




module.exports = employeeController;

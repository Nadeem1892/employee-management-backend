const Employee = require("./model.employee");

const employeeService = {}
//get user by email
employeeService.getEmployeeByEmail = async (email) => {
    return await Employee.findOne({email})
}

//get Employee by id
employeeService.getEmployeeById = async (employeeId) => {
    return await Employee.findById(employeeId)
}


// Create Employee
employeeService.createEmployee = async (employeeData) => {
    console.log(employeeData, "emplo")
return await  Employee.create(employeeData)
}


// Get all  Employee Service
employeeService.get = async (skip, limit) => {
    return await Employee.find({}).skip(skip).limit(limit);
}

employeeService.countAll = async () => {
    // return await Movie.countDocuments({ isDeleted: false });
    return await Employee.countDocuments({});
  };

//update Employee
employeeService.update = async (id, employeeData) => {
    return await Employee.findOneAndUpdate({ _id: id},{ $set: employeeData },{ new: true })
}

//Delete
employeeService.delete = async (id) => {
    return await Employee.deleteOne({ _id: id })
}

employeeService.search = async (searchQuery, sortOptions = {}) => {
    return await Employee.find(searchQuery).sort(sortOptions);;
  };

module.exports = employeeService
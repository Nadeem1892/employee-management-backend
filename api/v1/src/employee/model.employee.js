const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // 10-digit mobile numbers validation
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Other'], // Gender options
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Object,  // Store image metadata as an object
      required: false,
      default: {},   // Ensure the default is an empty object if no image is provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
